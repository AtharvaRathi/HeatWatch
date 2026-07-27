from celery import shared_task
from app.config import settings

from mailjet_rest import Client

@shared_task(name="app.services.email_service.send_alert_email")
def send_alert_email(email_to: str, subject: str, content: str):
    if not settings.MAILJET_API_KEY or not settings.MAILJET_API_SECRET:
        print(f"Mock sending email via Mailjet to {email_to}: {subject}")
        return True
        
    mailjet = Client(auth=(settings.MAILJET_API_KEY, settings.MAILJET_API_SECRET), version='v3.1')
    data = {
      'Messages': [
        {
          "From": {
            "Email": settings.ALERT_FROM_EMAIL or "alerts@heatwatch.com",
            "Name": "HeatWatch Alerts"
          },
          "To": [
            {
              "Email": email_to,
              "Name": "HeatWatch User"
            }
          ],
          "Subject": subject,
          "TextPart": content,
          "HTMLPart": f"<h3>{subject}</h3><p>{content}</p>"
        }
      ]
    }
    
    try:
        result = mailjet.send.create(data=data)
        print(f"Mailjet response: {result.status_code}")
        return result.status_code == 200
    except Exception as e:
        print(f"Error sending email via Mailjet: {e}")
        return False
