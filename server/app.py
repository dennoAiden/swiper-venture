from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from models import db, ContactSubmission
import os
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To
from flask_migrate import Migrate

# Load environment variables
load_dotenv()

app = Flask(__name__)
api = Api(app)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# --------------------------
# DATABASE CONFIGURATION
# --------------------------
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL not set. Are you running locally or on Render?")

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

# --------------------------
# SENDGRID EMAIL CONFIG
# --------------------------
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")      # where you receive messages
SYSTEM_SENDER = os.getenv("SYSTEM_SENDER")  # verified SendGrid sender

if not SENDGRID_API_KEY or not ADMIN_EMAIL or not SYSTEM_SENDER:
    raise ValueError("Please set SENDGRID_API_KEY, ADMIN_EMAIL, and SYSTEM_SENDER in environment variables.")

# --------------------------
# CONTACT FORM RESOURCE
# --------------------------
class ContactForm(Resource):
    def post(self):
        try:
            data = request.get_json(force=True)
            print("Received data:", data)

            required_fields = ['name', 'email', 'phone', 'subject', 'message']
            if not all(field in data and data[field] for field in required_fields):
                return {'success': False, 'message': 'All fields are required'}, 400

            # Save to database
            submission = ContactSubmission(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                subject=data['subject'],
                message=data['message']
            )
            db.session.add(submission)
            db.session.commit()

            # --------------------------
            # SENDGRID EMAIL
            # --------------------------
            email_body = f"""
New Contact Form Submission
Name: {data['name']}

Email: {data['email']}

Phone: {data['phone']}

Subject: {data['subject']}

Message:
{data['message']}
"""

            try:
                message = Mail(
                    from_email=Email(SYSTEM_SENDER, f"{data['name']} via Swiper Venture"),  # From
                    to_emails=To(ADMIN_EMAIL),                                              # To
                    subject=f"New Contact Form Submission: {data['subject']}",
                    plain_text_content=email_body
                )

                # Reply-To is visitor's email
                message.reply_to = Email(data['email'], data['name'])

                sg = SendGridAPIClient(SENDGRID_API_KEY)
                sg.send(message)

            except Exception as e:
                print("SendGrid failed:", e)
                # Email failed but database saved
                return {
                    'success': True,
                    'message': 'Saved but email failed',
                    'error': str(e),
                    'id': submission.id
                }, 200

            return {
                'success': True,
                'message': 'Message received successfully and confirmation email sent.',
                'id': submission.id
            }, 200

        except Exception as e:
            print("Error in /api/contact:", e)
            return {'success': False, 'message': str(e)}, 500


api.add_resource(ContactForm, '/api/contact')

# --------------------------
# RUN SERVER
# --------------------------
if __name__ == '__main__':
    PORT = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=PORT, debug=True)
