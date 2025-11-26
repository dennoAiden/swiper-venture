from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_mail import Mail, Message
from models import db, ContactSubmission
from flask_migrate import Migrate
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
api = Api(app)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# --------------------------------
# DATABASE
# --------------------------------
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

# --------------------------------
# SMTP MAIL CONFIG
# --------------------------------
app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT"))
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS") == "True"
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")

mail = Mail(app)

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")


# --------------------------------
# CONTACT FORM ENDPOINT
# --------------------------------
class ContactForm(Resource):
    def options(self):
        return {"status": "ok"}, 200

    def post(self):
        try:
            data = request.get_json(force=True)

            required = ['name', 'email', 'phone', 'subject', 'message']
            if not all(k in data and data[k] for k in required):
                return {"success": False, "message": "All fields required"}, 400

            # Save submission
            entry = ContactSubmission(
                name=data["name"],
                email=data["email"],
                phone=data["phone"],
                subject=data["subject"],
                message=data["message"]
            )
            db.session.add(entry)
            db.session.commit()

            # --------------------------------
            # SEND SMTP EMAIL
            # --------------------------------
            email_body = f"""
New Contact Form Submission

Name: {data['name']}
Email: {data['email']}
Phone: {data['phone']}
Subject: {data['subject']}

Message:
{data['message']}
"""

            msg = Message(
                subject=f"New Contact Form Message: {data['subject']}",
                sender=app.config["MAIL_USERNAME"],
                recipients=[ADMIN_EMAIL],
                body=email_body
            )

            msg.reply_to = data["email"]

            mail.send(msg)

            return {"success": True, "message": "Message sent!"}, 200

        except Exception as e:
            print("Error:", e)
            return {"success": False, "message": str(e)}, 500


api.add_resource(ContactForm, "/api/contact")

# Run
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)
