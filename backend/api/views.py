import json
import logging
import urllib.request

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


def _deliver(subject, body, to, reply_to):
    """
    Verschickt eine Text-Mail. Mit RESEND_API_KEY über die HTTPS-API von Resend
    (Port 443). Das ist nötig, weil Render Free ausgehendes SMTP blockiert.
    Ohne API-Key wird der normale Django-E-Mail-Backend (SMTP/Konsole) genutzt.
    Wirft bei Fehlern eine Exception.
    """
    if settings.RESEND_API_KEY:
        payload = json.dumps({
            'from': settings.RESEND_FROM,
            'to': [to],
            'subject': subject,
            'text': body,
            'reply_to': reply_to,
        }).encode('utf-8')
        req = urllib.request.Request(
            'https://api.resend.com/emails',
            data=payload,
            method='POST',
            headers={
                'Authorization': f'Bearer {settings.RESEND_API_KEY}',
                'Content-Type': 'application/json',
                'User-Agent': 'adib-portfolio/1.0',
            },
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()
        return

    EmailMessage(
        subject=subject,
        body=body,
        from_email=settings.EMAIL_FROM_EMAIL or settings.CONTACT_EMAIL,
        to=[to],
        reply_to=[reply_to],
    ).send(fail_silently=False)


def send_contact_emails(submission):
    """
    Benachrichtigung an den Admin (immer) und Bestätigung an den Absender
    (nur wenn SEND_USER_CONFIRMATION aktiv ist). Wirft nie eine Exception:
    die Anfrage ist zu diesem Zeitpunkt bereits gespeichert.
    Rückgabe: (bool, str), True nur wenn die Admin-Mail verschickt wurde.
    """
    admin_email = settings.CONTACT_EMAIL

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

    admin_ok = False
    try:
        _deliver(
            f"Neue Kontaktanfrage von {_one_line(submission.name)}",
            admin_body, admin_email, submission.email,
        )
        admin_ok = True
    except Exception:
        logger.exception("Admin-Mail für Anfrage %s fehlgeschlagen", submission.id)

    if settings.SEND_USER_CONFIRMATION:
        try:
            _deliver(
                "Anfrage erhalten - Vielen Dank!",
                user_body, submission.email, admin_email,
            )
        except Exception:
            logger.exception("Bestätigungs-Mail für Anfrage %s fehlgeschlagen", submission.id)

    if not admin_ok:
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
