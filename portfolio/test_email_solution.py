#!/usr/bin/env python
"""
Test-Script für sichere Email-Lösung
Überprüft:
1. EmailLog Modell
2. Timeout-Konfiguration
3. Email-Versand
4. Fehlerbehandlung
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from django.core.mail import EmailMessage
from django.conf import settings
from portfolio.models import EmailLog, ContactMessage
from django.db import connection


def test_email_timeout_config():
    """Test: EMAIL_TIMEOUT ist auf 30 Sekunden gesetzt"""
    print("\n" + "=" * 60)
    print("TEST 1: Email-Timeout Konfiguration")
    print("=" * 60)

    timeout = settings.EMAIL_TIMEOUT
    print(f"Aktueller EMAIL_TIMEOUT: {timeout} Sekunden")

    if timeout >= 30:
        print("✓ PASS: Timeout ist ausreichend (>= 30 Sekunden)")
        return True
    else:
        print(f"✗ FAIL: Timeout zu kurz ({timeout} < 30 Sekunden)")
        return False


def test_email_log_model():
    """Test: EmailLog Modell existiert und funktioniert"""
    print("\n" + "=" * 60)
    print("TEST 2: EmailLog Modell")
    print("=" * 60)

    try:
        # Erstelle Test-EmailLog
        log = EmailLog.objects.create(
            recipient='test@example.com',
            subject='Test Email',
            status='pending'
        )
        print(f"✓ EmailLog erstellt: {log.id}")

        # Teste mark_sent()
        log.mark_sent()
        log.refresh_from_db()
        assert log.status == 'sent', "mark_sent() funktioniert nicht"
        print("✓ mark_sent() funktioniert")

        # Teste mark_failed()
        log.mark_failed("Test Error")
        log.refresh_from_db()
        assert log.status == 'failed', "mark_failed() funktioniert nicht"
        assert log.error_message == "Test Error", "Error-Message nicht gespeichert"
        print("✓ mark_failed() funktioniert")

        # Cleanup
        log.delete()
        print("✓ Test-Daten gelöscht")
        return True

    except Exception as e:
        print(f"✗ FAIL: {e}")
        return False


def test_contact_message_email_field():
    """Test: ContactMessage hat email_sent Feld"""
    print("\n" + "=" * 60)
    print("TEST 3: ContactMessage.email_sent Feld")
    print("=" * 60)

    try:
        # Überprüfe ob Feld existiert
        field = ContactMessage._meta.get_field('email_sent')
        print(f"✓ email_sent Feld existiert: {field}")
        return True
    except Exception as e:
        print(f"✗ FAIL: {e}")
        return False


def test_email_sending():
    """Test: Versende eine Test-Email zu Resend"""
    print("\n" + "=" * 60)
    print("TEST 4: Email-Versand zu Resend")
    print("=" * 60)

    print(f"Email-Host: {settings.EMAIL_HOST}")
    print(f"Email-Port: {settings.EMAIL_PORT}")
    print(f"Email-TLS: {settings.EMAIL_USE_TLS}")
    print(f"From-Email: {settings.DEFAULT_FROM_EMAIL}")
    print(f"Admin-Email: {settings.ADMIN_EMAIL}")

    try:
        email = EmailMessage(
            subject='[TEST] Django Portfolio - Email Test',
            body='Dies ist ein Test-Email von der sicheren Email-Lösung.',
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.ADMIN_EMAIL],
            timeout=30,
        )

        print(f"\nVersende Test-Email an {settings.ADMIN_EMAIL}...")
        result = email.send(fail_silently=False)

        print(f"✓ Email versendet (Return Value: {result})")
        print("✓ Überprüfe dein Postfach auf Test-Email")
        return True

    except Exception as e:
        print(f"✗ FAIL: {e}")
        print("\nTroubleshooting-Tipps:")
        print("1. Überprüfe EMAIL_HOST_PASSWORD in .env")
        print("2. Stelle sicher, dass der Resend API-Schlüssel gültig ist")
        print("3. Überprüfe deine Internet-Verbindung")
        return False


def test_database_tables():
    """Test: Überprüfe ob alle Tabellen existieren"""
    print("\n" + "=" * 60)
    print("TEST 5: Datenbank-Tabellen")
    print("=" * 60)

    cursor = connection.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall()]

    required_tables = [
        'portfolio_contactmessage',
        'portfolio_emaillog',
    ]

    all_exist = True
    for table in required_tables:
        if table in tables:
            print(f"✓ {table}")
        else:
            print(f"✗ {table} (FEHLT - Migration nötig)")
            all_exist = False

    return all_exist


def run_all_tests():
    """Führe alle Tests aus"""
    print("\n" + "=" * 70)
    print("SICHERE EMAIL-LÖSUNG - TEST SUITE")
    print("=" * 70)

    results = {
        'Timeout-Config': test_email_timeout_config(),
        'EmailLog-Modell': test_email_log_model(),
        'email_sent-Feld': test_contact_message_email_field(),
        'Datenbank-Tabellen': test_database_tables(),
        'Email-Versand': test_email_sending(),
    }

    # Summary
    print("\n" + "=" * 70)
    print("TEST SUMMARY")
    print("=" * 70)
    for test_name, passed in results.items():
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status}: {test_name}")

    all_passed = all(results.values())
    print("\n" + "=" * 70)
    if all_passed:
        print("✓ ALLE TESTS BESTANDEN!")
    else:
        print("✗ EINIGE TESTS FEHLGESCHLAGEN")
        print("\nNächste Schritte:")
        print("1. Führe Migrationen aus: python manage.py migrate")
        print("2. Starte Server neu")
        print("3. Versuche diesen Test erneut")
    print("=" * 70)

    return all_passed


if __name__ == '__main__':
    run_all_tests()