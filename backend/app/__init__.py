import os
from flask import Flask, request, render_template
from dotenv import load_dotenv
from flask_cors import CORS
from app.extensions.mail import mail
from flask_mail import Message

load_dotenv()

app = Flask(__name__,
            static_folder="../../dist/assets",
            template_folder="../../dist")

app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER')
app.config['MAIL_PORT'] = os.environ.get('MAIL_PORT')

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
mail.init_app(app)

@app.route('/api/submit_contact_form', methods=['POST'])
def api():
    data = request.get_json()
    print(data)
    
    msg = Message(
        subject="You have a new message from your portfolio!",
        sender=os.environ["MAIL_USERNAME"],
        recipients=[os.environ["MY_EMAIL"]],
    )
    msg.html = render_template(
        "mail/informe_me_email.html",
        name=data['name'],
        lastname=data['lastname'],
        email=data['email'],
        subject=data['subject'],
        interest=data['interest'],
        company=data['company'],
        projectDescription=data['projectDescription'],
        message=data['message']
    )
    mail.send(msg)
    
    return 'Success'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def render_vue(path):
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)