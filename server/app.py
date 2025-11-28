from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# ---------------------------------------
# DATABASE CONFIG
# ---------------------------------------
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# ---------------------------------------
# MAIL CONFIG
# ---------------------------------------
app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT"))
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS") == "True"
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_USERNAME")

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")

mail = Mail(app)


# ---------------------------------------
# CONTACT SUBMISSION MODEL
# ---------------------------------------
class ContactSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(50))
    subject = db.Column(db.String(200))
    message = db.Column(db.Text)


# ---------------------------------------
# ROUTES
# ---------------------------------------

@app.route("/")
def home():
    return jsonify({"status": "Backend is running"}), 200


@app.route("/contact", methods=["POST"])
def contact():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided"}), 400

        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        subject = data.get("subject")
        message = data.get("message")

        # Save submission in DB
        new_entry = ContactSubmission(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=message
        )
        db.session.add(new_entry)
        db.session.commit()

        # Email to ADMIN_EMAIL
        msg = Message(
            subject=f"New Contact Form Submission: {subject}",
            recipients=[ADMIN_EMAIL]
        )

        # Add Reply-To header
        msg.reply_to = email

        msg.body = f"""
New Contact Form Submission

Name: {name}
Email: {email}
Phone: {phone}
Subject: {subject}

Message:
{message}
        """

        mail.send(msg)

        return jsonify({"message": "Message sent successfully"}), 200

    except Exception as e:
        print("EMAIL ERROR:", e)
        return jsonify({"error": "Failed to send message", "details": str(e)}), 500


# ---------------------------------------
# MAIN
# ---------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
