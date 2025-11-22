from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from models import db, ContactSubmission
import os
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email
from flask_migrate import Migrate


# Load environment variables
load_dotenv()

app = Flask(__name__)
api = Api(app)
CORS(app)

migrate = Migrate(app, db)

# Database configuration for production (PostgreSQL)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")  # PostgreSQL URL from Render
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Email configuration
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")  # Your email to receive messages
SYSTEM_SENDER = os.getenv("SYSTEM_SENDER")  # Verified SendGrid sender

# Ensure required environment variables exist
if not SENDGRID_API_KEY or not ADMIN_EMAIL or not SYSTEM_SENDER:
    raise ValueError("Please set SENDGRID_API_KEY, ADMIN_EMAIL, and SYSTEM_SENDER in your environment variables.")

class ContactForm(Resource):
    def post(self):
        data = request.get_json()
        required_fields = ['name', 'email', 'phone', 'subject', 'message']

        # Validation
        if not all(field in data and data[field] for field in required_fields):
            return {'success': False, 'message': 'All fields are required'}, 400

        # Save message in database
        submission = ContactSubmission(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            subject=data['subject'],
            message=data['message']
        )
        db.session.add(submission)
        db.session.commit()

        # Send email via SendGrid
        try:
            message = Mail(
                from_email=Email(SYSTEM_SENDER, f"{data['name']} via Swiper Venture"),
                to_emails=ADMIN_EMAIL,
                subject=f"New Contact Form Submission: {data['subject']}",
                html_content=f"""
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> {data['name']}</p>
                    <p><strong>Email:</strong> {data['email']}</p>
                    <p><strong>Phone:</strong> {data['phone']}</p>
                    <p><strong>Subject:</strong> {data['subject']}</p>
                    <p><strong>Message:</strong><br>{data['message']}</p>
                """
            )

            # User email becomes the reply-to address
            message.reply_to = Email(data['email'], data['name'])

            sg = SendGridAPIClient(SENDGRID_API_KEY)
            response = sg.send(message)
            print("Email sent, SendGrid status code:", response.status_code)

        except Exception as e:
            print("SendGrid error:", str(e))

        return {
            'success': True,
            'message': 'Message received successfully',
            'id': submission.id
        }, 200


api.add_resource(ContactForm, '/api/contact')


if __name__ == '__main__':
    PORT = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=PORT, debug=False)
