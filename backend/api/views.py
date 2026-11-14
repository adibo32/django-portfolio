import logging

from django.conf import settings
from django.core.mail import EmailMessage
from rest_framework import mixins, status, viewsets
from django.http import JsonResponse
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .serializers import ContactSerializer

logger = logging.getLogger(__name__)


class ContactRateThrottle(AnonRateThrottle):
    """Max. 5 Anfragen pro IP und Stunde (Spam-Schutz)."""
    scope = 'contact'
    rate = '5/hour'


def _one_line(value):
    """Entfernt Zeilenumbrüche (Schutz vor Header-Injection in E-Mail-Betreffs)."""
    return ' '.join(str(value).split())


def send_contact_emails(submission):
    """
    Sendet eine Benachrichtigung an den Admin und eine Bestätigung an den Absender.
    Wirft nie eine Exception: die Anfrage ist zu diesem Zeitpunkt bereits gespeichert.
    Rückgabe: (bool, str)
    """
    admin_email = settings.CONTACT_EMAIL
    from_email = settings.EMAIL_FROM_EMAIL or admin_email

    admin_body = (
        "Neue Kontaktanfrage erhalten:\n\n"
        f"Name: {submission.name}\n"
        f"Email: {submission.email}\n"
        f"Unternehmen: {submission.company or 'N/A'}\n"
        f"Telefon: {submission.phone or 'N/A'}\n"
        f"Projekttyp: {submission.project_type}\n"
        f"Budget: {submission.budget or 'N/A'}\n"
        f"Zeitrahmen: {submission.timeframe or 'N/A'}\n\n"
        f"Beschreibung:\n{submission.description}\n\n"
        "---\n"
        f"ID: {submission.id}\n"
        f"Eingegangen: {submission.created_at.strftime('%d.%m.%Y %H:%M:%S')}\n"
    )
    user_body = (
        f"Hallo {submission.name},\n\n"
        "vielen Dank für deine Anfrage! Ich habe sie erhalten und melde mich "
        "so schnell wie möglich bei dir.\n\n"
        "Zusammenfassung:\n"
        f"- Projekttyp: {submission.project_type}\n"
        f"- Budget: {submission.budget or 'Nicht angegeben'}\n"
        f"- Zeitrahmen: {submission.timeframe or 'Nicht angegeben'}\n\n"
        "Beste Grüße\nAdib\n"
    )

    try:
        EmailMessage(
            subject=f"Neue Kontaktanfrage von {_one_line(submission.name)}",
            body=admin_body,
            from_email=from_email,
            to=[admin_email],
            reply_to=[submission.email],
        ).send(fail_silently=False)

        EmailMessage(
            subject="Anfrage erhalten - Vielen Dank!",
            body=user_body,
            from_email=from_email,
            to=[submission.email],
            reply_to=[admin_email],
        ).send(fail_silently=False)
    except Exception:
        logger.exception("E-Mail-Versand für Anfrage %s fehlgeschlagen", submission.id)
        return False, "E-Mail-Versand fehlgeschlagen"

    return True, "Emails versendet"


def _client_ip(request):
    ident = ContactRateThrottle().get_ident(request)
    return ident if ident and ident != 'None' else None


class ContactSubmissionViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Nur POST /api/submissions/ (Anfrage anlegen).
    Lesen, Ändern und Löschen sind bewusst NICHT öffentlich möglich,
    das passiert ausschließlich im Django-Admin.
    """
    serializer_class = ContactSerializer
    throttle_classes = [ContactRateThrottle]

    def perform_create(self, serializer):
        submission = serializer.save(ip_address=_client_ip(self.request))
        send_contact_emails(submission)


@api_view(['POST'])
@throttle_classes([ContactRateThrottle])
def contact_submit(request):
    serializer = ContactSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    submission = serializer.save(ip_address=_client_ip(request))
    email_sent, _ = send_contact_emails(submission)
    return Response(
        {
            'message': 'Anfrage erfolgreich versendet!',
            'id': submission.id,
            'email_sent': email_sent,
        },
        status=status.HTTP_201_CREATED,
    )


def health(request):
    """Health-Check für Render (kein SSL-Redirect, keine DB-Abfrage)."""
    return JsonResponse({'status': 'ok'})
