from django.core.management.base import BaseCommand
from django.core.mail import EmailMessage
from django.conf import settings
from django.utils import timezone
from portfolio.models import EmailLog
import logging

logger = logging.getLogger('portfolio.email')


class Command(BaseCommand):
    help = 'Wiederhole fehlgeschlagene oder ausstehende Emails'

    def add_arguments(self, parser):
        parser.add_argument(
            '--max-retries',
            type=int,
            default=3,
            help='Maximale Anzahl von Retry-Versuchen pro Email'
        )
        parser.add_argument(
            '--all',
            action='store_true',
            help='Versuche ALL fehlgeschlagenen Emails erneut (standardmäßig nur die neuesten)'
        )

    def handle(self, *args, **options):
        max_retries = options['max_retries']
        retry_all = options['all']

        # Finde Emails die erneut versucht werden sollen
        if retry_all:
            emails = EmailLog.objects.filter(
                status='retry',
                retry_count__lt=max_retries
            )
        else:
            # Nur die neuesten fehlgeschlagenen Emails (letzte Stunde)
            from datetime import timedelta
            one_hour_ago = timezone.now() - timedelta(hours=1)
            emails = EmailLog.objects.filter(
                status__in=['retry', 'failed'],
                retry_count__lt=max_retries,
                updated_at__gte=one_hour_ago
            ).order_by('-updated_at')[:10]

        if not emails.exists():
            self.stdout.write(
                self.style.SUCCESS('✓ Keine Emails zum Erneut-Versuchen gefunden')
            )
            return

        self.stdout.write(
            self.style.WARNING(f'Versuche {emails.count()} Emails erneut...')
        )

        successful = 0
        failed = 0

        for email_log in emails:
            try:
                # Rekonstruiere die Original-Email
                # HINWEIS: Dies ist eine vereinfachte Version
                # In der Praxis könntest du den Message-Body auch speichern
                email = EmailMessage(
                    subject=email_log.subject,
                    body=f"[RETRY ATTEMPT #{email_log.retry_count + 1}]\n\nBitte überprüfe die Original-Email im Admin-Panel.",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[email_log.recipient],
                    timeout=30,
                )
                email.send(fail_silently=False)

                # Erfolg
                email_log.mark_sent()
                successful += 1
                logger.info(f"Email retry successful: {email_log.recipient} (Retry #{email_log.retry_count})")
                self.stdout.write(
                    self.style.SUCCESS(f'✓ {email_log.recipient}')
                )

            except Exception as e:
                failed += 1
                error_msg = f"{type(e).__name__}: {str(e)}"
                email_log.mark_failed(error_msg)
                logger.error(f"Email retry failed: {email_log.recipient} - {error_msg}")
                self.stdout.write(
                    self.style.ERROR(f'✗ {email_log.recipient}: {error_msg}')
                )

        # Summary
        self.stdout.write('\n' + '=' * 60)
        self.stdout.write(
            self.style.SUCCESS(f'✓ Erfolgreich: {successful}')
        )
        if failed > 0:
            self.stdout.write(
                self.style.ERROR(f'✗ Fehlgeschlagen: {failed}')
            )
        self.stdout.write('=' * 60)