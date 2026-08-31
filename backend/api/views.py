from rest_framework import viewsets, status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactSubmission
from .serializers import ContactSerializer
import sys

class ContactRateThrottle(AnonRateThrottle):
    scope = 'contact'
    rate = '5/hour'

class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSerializer
    throttle_classes = [ContactRateThrottle]

    def perform_create(self, serializer):
        """
        Called when creating a new ContactSubmission.
        Sends emails after saving.
        """
        print("\n" + "="*60, flush=True)
        print("🔥 VIEWSET perform_create CALLED!", flush=True)
        print("="*60, flush=True)
        sys.stdout.flush()

        # Save the submission
        submission = serializer.save()

        # Send emails
        print(f"📧 Calling send_contact_emails for submission {submission.id}...", flush=True)
        sys.stdout.flush()
        email_sent, email_message = send_contact_emails(submission)
        print(f"📧 Email result: {email_sent} - {email_message}", flush=True)
        sys.stdout.flush()

def send_contact_emails(submission):
    """
    Sendet Email an Admin und Benutzer nach Contact Submission
    """
    print("\n" + "="*60, flush=True)
    print("📧 STARTING EMAIL SENDING PROCESS...", flush=True)
    print("="*60, flush=True)
    sys.stdout.flush()

    admin_email = settings.CONTACT_EMAIL
    user_email = submission.email
    from_email = settings.EMAIL_FROM_EMAIL or settings.CONTACT_EMAIL

    print(f"From: {from_email}", flush=True)
    print(f"Admin: {admin_email}", flush=True)
    print(f"User: {user_email}", flush=True)
    sys.stdout.flush()

    # Einfache Text-Emails (Console Backend funktioniert besser damit)
    admin_subject = f"Neue Kontaktanfrage von {submission.name}"
    admin_message = f"""
Neue Kontaktanfrage erhalten:

Name: {submission.name}
Email: {submission.email}
Unternehmen: {submission.company or 'N/A'}
Telefon: {submission.phone or 'N/A'}
Projekttyp: {submission.project_type}
Budget: {submission.budget or 'N/A'}
Zeitrahmen: {submission.timeframe or 'N/A'}

Beschreibung:
{submission.description}

---
ID: {submission.id}
Eingegeben: {submission.created_at.strftime('%d.%m.%Y %H:%M:%S')}
    """

    user_subject = f"Anfrage erhalten - Vielen Dank, {submission.name}!"
    user_message = f"""
Vielen Dank für deine Anfrage!

Lieber {submission.name},

deine Anfrage wurde erfolgreich erhalten. Ich werde mich schnellstmöglich bei dir melden.

Zusammenfassung deiner Anfrage:
- Projekttyp: {submission.project_type}
- Budget: {submission.budget or 'Nicht angegeben'}
- Zeitrahmen: {submission.timeframe or 'Nicht angegeben'}

Falls du Fragen hast, kontaktiere mich gerne unter dieser Email-Adresse.

Beste Grüße,
Adib
    """

    try:
        print("\n📤 Sending ADMIN EMAIL...", flush=True)
        sys.stdout.flush()
        send_mail(
            admin_subject,
            admin_message,
            from_email,
            [admin_email],
            fail_silently=False,
        )
        print("✅ Admin email sent successfully!", flush=True)
        sys.stdout.flush()

        print("\n📤 Sending USER CONFIRMATION EMAIL...", flush=True)
        sys.stdout.flush()
        send_mail(
            user_subject,
            user_message,
            from_email,
            [user_email],
            fail_silently=False,
        )
        print("✅ User confirmation email sent successfully!", flush=True)
        print("="*60 + "\n", flush=True)
        sys.stdout.flush()

        return True, "Emails versendet"
    except Exception as e:
        print(f"❌ EMAIL ERROR: {str(e)}", flush=True)
        print("="*60 + "\n", flush=True)
        sys.stdout.flush()
        return False, f"Email-Fehler: {str(e)}"

@api_view(['POST'])
@throttle_classes([ContactRateThrottle])
def contact_submit(request):
    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            submission = serializer.save()

            # Versuche Emails zu versenden
            email_sent, email_message = send_contact_emails(submission)

            response_data = {
                'message': 'Anfrage erfolgreich versendet!',
                'id': submission.id,
                'email_sent': email_sent,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)