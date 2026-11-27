"""Tests für die öffentliche Kontakt-API (echte Felder, echte Rechte)."""
import pytest
from django.core import mail
from django.core.cache import cache
from django.test import override_settings
from rest_framework.test import APIClient

from api.models import ContactSubmission

pytestmark = pytest.mark.django_db

VALID = {
    'name': 'Max Mustermann',
    'email': 'max@example.com',
    'project_type': 'Odoo',
    'description': 'Ich brauche eine Odoo-Erweiterung für meinen Shop, bitte melde dich.',
}


@pytest.fixture(autouse=True)
def _clean_throttle_cache():
    cache.clear()
    yield
    cache.clear()


@pytest.fixture
def client():
    return APIClient()


@pytest.mark.parametrize('url', ['/api/submissions/', '/api/contact/'])
def test_create_saves_and_sends_two_emails(client, url, settings):
    settings.SEND_USER_CONFIRMATION = True
    settings.RESEND_API_KEY = ''
    resp = client.post(url, VALID, format='json')
    assert resp.status_code == 201
    assert ContactSubmission.objects.count() == 1
    assert len(mail.outbox) == 2
    assert mail.outbox[0].reply_to == [VALID['email']]
    assert mail.outbox[1].to == [VALID['email']]


def test_create_response_does_not_leak_other_data(client):
    resp = client.post('/api/submissions/', VALID, format='json')
    assert 'ip_address' not in resp.json()


def test_public_cannot_list_read_update_or_delete(client):
    obj = ContactSubmission.objects.create(**VALID)
    assert client.get('/api/submissions/').status_code == 405
    assert client.get(f'/api/submissions/{obj.id}/').status_code == 404
    assert client.delete(f'/api/submissions/{obj.id}/').status_code == 404
    assert client.patch(f'/api/submissions/{obj.id}/', {'name': 'x'}, format='json').status_code == 404
    assert ContactSubmission.objects.count() == 1


@pytest.mark.parametrize('payload', [
    {**VALID, 'email': 'kaputt'},
    {**VALID, 'description': 'zu kurz'},
    {**VALID, 'name': 'A'},
    {**VALID, 'project_type': 'Unbekannt'},
    {**VALID, 'description': 'Kaufe jetzt Bitcoin und Casino Bonus, ganz sicher!!'},
])
def test_invalid_payload_rejected(client, payload):
    resp = client.post('/api/submissions/', payload, format='json')
    assert resp.status_code == 400
    assert ContactSubmission.objects.count() == 0


def test_email_failure_does_not_lose_submission(client):
    with override_settings(EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend',
                           EMAIL_HOST='127.0.0.1', EMAIL_PORT=1, EMAIL_TIMEOUT=1):
        resp = client.post('/api/contact/', VALID, format='json')
    assert resp.status_code == 201
    assert resp.json()['email_sent'] is False
    assert ContactSubmission.objects.count() == 1


def test_rate_limit_5_per_hour(client):
    codes = [client.post('/api/submissions/', VALID, format='json').status_code for _ in range(6)]
    assert codes == [201] * 5 + [429]


def test_newline_in_name_does_not_break_email_header(client):
    resp = client.post('/api/submissions/', {**VALID, 'name': 'Max\nBcc: evil@example.com'}, format='json')
    assert resp.status_code == 201
    assert '\n' not in mail.outbox[0].subject


def test_resend_api_used_when_key_set(client, settings):
    from unittest import mock
    settings.RESEND_API_KEY = 're_test_key'
    settings.RESEND_FROM = 'Adib Portfolio <onboarding@resend.dev>'
    settings.SEND_USER_CONFIRMATION = False
    with mock.patch('api.views.urllib.request.urlopen') as urlopen:
        resp = client.post('/api/submissions/', VALID, format='json')
    assert resp.status_code == 201
    assert urlopen.call_count == 1  # nur Admin-Mail, keine Bestätigung
    req = urlopen.call_args[0][0]
    assert req.full_url == 'https://api.resend.com/emails'
    assert req.get_header('Authorization') == 'Bearer re_test_key'
    assert len(mail.outbox) == 0  # SMTP-Pfad wurde nicht benutzt


def test_resend_confirmation_sent_with_own_domain(client, settings):
    from unittest import mock
    settings.RESEND_API_KEY = 're_test_key'
    settings.RESEND_FROM = 'Adib <kontakt@example.com>'
    settings.SEND_USER_CONFIRMATION = True
    with mock.patch('api.views.urllib.request.urlopen') as urlopen:
        client.post('/api/submissions/', VALID, format='json')
    assert urlopen.call_count == 2


def test_resend_failure_keeps_submission(client, settings):
    from unittest import mock
    settings.RESEND_API_KEY = 're_test_key'
    with mock.patch('api.views.urllib.request.urlopen', side_effect=OSError('boom')):
        resp = client.post('/api/contact/', VALID, format='json')
    assert resp.status_code == 201
    assert resp.json()['email_sent'] is False
    assert ContactSubmission.objects.count() == 1


def test_no_confirmation_by_default_with_resend_sandbox_sender(client, settings):
    settings.RESEND_API_KEY = ''
    settings.SEND_USER_CONFIRMATION = False
    client.post('/api/submissions/', VALID, format='json')
    assert len(mail.outbox) == 1
    assert mail.outbox[0].to == [settings.CONTACT_EMAIL]


@pytest.mark.parametrize('url', ['/api/submissions/', '/api/contact/'])
def test_email_sent_flag_present_on_success(client, url):
    resp = client.post(url, VALID, format='json')
    assert resp.status_code == 201
    assert resp.json()['email_sent'] is True


def test_email_sent_flag_false_on_viewset_when_email_fails(client):
    with override_settings(EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend',
                           EMAIL_HOST='127.0.0.1', EMAIL_PORT=1, EMAIL_TIMEOUT=1,
                           RESEND_API_KEY=''):
        resp = client.post('/api/submissions/', VALID, format='json')
    assert resp.status_code == 201
    assert resp.json()['email_sent'] is False
    assert ContactSubmission.objects.count() == 1
