"""
pytest configuration for Django Portfolio Application
Shared fixtures and configuration for all tests
"""

import os
import sys
import django
from pathlib import Path
from django.conf import settings

# Configure Django settings before importing any models
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Setup Django
if not settings.configured:
    django.setup()

import pytest
from django.test import Client
from rest_framework.test import APIClient
from faker import Faker


# ============================================================
# PYTEST CONFIGURATION
# ============================================================

def pytest_configure(config):
    """Configure pytest before test collection"""
    # Ensure Django is set up
    if not settings.configured:
        django.setup()

    # Register custom markers
    config.addinivalue_line(
        "markers", "django_db: mark test as requiring database access"
    )
    config.addinivalue_line(
        "markers", "slow: mark test as slow"
    )
    config.addinivalue_line(
        "markers", "integration: mark test as integration test"
    )
    config.addinivalue_line(
        "markers", "unit: mark test as unit test"
    )
    config.addinivalue_line(
        "markers", "api: mark test as API test"
    )


# ============================================================
# SESSION-LEVEL FIXTURES
# ============================================================

@pytest.fixture(scope="session")
def faker_instance():
    """Provide a Faker instance for the test session"""
    return Faker(['de_DE', 'en_US'])


# ============================================================
# FUNCTION-LEVEL FIXTURES
# ============================================================

@pytest.fixture
def faker(faker_instance):
    """Provide Faker for individual tests"""
    return faker_instance


@pytest.fixture
def client():
    """Provide Django test client"""
    return Client()


@pytest.fixture
def django_client_with_csrf():
    """Provide Django test client with CSRF checks enabled"""
    return Client(enforce_csrf_checks=True)


@pytest.fixture
def api_client():
    """Provide DRF API client"""
    return APIClient()


@pytest.fixture
def authenticated_user(db):
    """Provide authenticated user"""
    from django.contrib.auth.models import User

    user = User.objects.create_user(
        username='testuser',
        email='testuser@example.com',
        password='TestPassword123!'
    )
    return user


@pytest.fixture
def authenticated_api_client(api_client, authenticated_user):
    """Provide authenticated API client"""
    api_client.force_authenticate(user=authenticated_user)
    return api_client


@pytest.fixture
def admin_user(db):
    """Provide admin user"""
    from django.contrib.auth.models import User

    admin = User.objects.create_superuser(
        username='admin',
        email='admin@example.com',
        password='AdminPassword123!'
    )
    return admin


@pytest.fixture
def admin_api_client(api_client, admin_user):
    """Provide authenticated admin API client"""
    api_client.force_authenticate(user=admin_user)
    return api_client


# ============================================================
# CONTACT FORM FIXTURES
# ============================================================

@pytest.fixture
def valid_contact_data(faker):
    """Provide valid contact form data"""
    return {
        'name': faker.name(),
        'email': faker.email(),
        'phone': faker.phone_number(),
        'project_type': 'Odoo Development',
        'budget': '5000-10000 EUR',
        'timeline': '1-3 months',
        'description': faker.paragraph(nb_sentences=5)
    }


@pytest.fixture
def valid_contact_data_german(faker):
    """Provide valid contact data in German"""
    return {
        'name': faker.name(),
        'email': faker.email(),
        'phone': faker.phone_number(),
        'project_type': 'Odoo-Entwicklung',
        'budget': '5000-10000 EUR',
        'timeline': '1-3 Monate',
        'description': faker.paragraph(nb_sentences=5)
    }


@pytest.fixture
def invalid_contact_data():
    """Provide invalid contact form data"""
    return {
        'name': '',  # Missing required
        'email': 'not-an-email',
        'phone': '123',
        'project_type': '',
        'budget': 'x' * 1000,  # Too long
        'timeline': '',
        'description': ''  # Missing required
    }


@pytest.fixture
def xss_contact_data():
    """Provide contact data with XSS attempts"""
    return {
        'name': '<script>alert("xss")</script>',
        'email': 'test@example.com',
        'phone': '+49123456789',
        'project_type': '<img src=x onerror="alert(1)">',
        'budget': '5000 EUR',
        'timeline': '1 month',
        'description': '<iframe src="evil.com"></iframe>'
    }


@pytest.fixture
def sql_injection_contact_data():
    """Provide contact data with SQL injection attempts"""
    return {
        'name': "'; DROP TABLE users; --",
        'email': "test@example.com",
        'phone': '+49123456789',
        'project_type': 'Odoo',
        'budget': "5000' OR '1'='1",
        'timeline': '1 month',
        'description': "SELECT * FROM users WHERE 1=1; --"
    }


# ============================================================
# EMAIL FIXTURES
# ============================================================

@pytest.fixture
def mock_email_backend(mocker):
    """Provide mock email backend"""
    return mocker.patch('django.core.mail.send_mail')


@pytest.fixture
def capture_emails(mocker):
    """Capture sent emails for testing"""
    from django.core.mail import outbox as django_outbox
    return django_outbox


# ============================================================
# API RESPONSE FIXTURES
# ============================================================

@pytest.fixture
def expected_api_response_structure():
    """Define expected API response structure"""
    return {
        'success': bool,
        'data': (dict, list, type(None)),
        'error': (str, type(None)),
        'status': int,
    }


@pytest.fixture
def expected_error_response():
    """Define expected error response structure"""
    return {
        'detail': str,
        'error': str,
        'status_code': int,
    }


# ============================================================
# SETTINGS FIXTURES
# ============================================================

@pytest.fixture
def cors_settings():
    """Provide expected CORS settings"""
    return {
        'CORS_ALLOWED_ORIGINS': [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
        ],
        'CORS_ALLOW_CREDENTIALS': True,
    }


@pytest.fixture
def csrf_settings():
    """Provide expected CSRF settings"""
    return {
        'CSRF_TRUSTED_ORIGINS': [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
        ],
        'CSRF_COOKIE_SECURE': None,  # Depends on DEBUG
    }


# ============================================================
# CLEANUP FIXTURES
# ============================================================

@pytest.fixture(autouse=True)
def reset_settings():
    """Reset Django settings after each test"""
    from django.test import override_settings

    yield

    # Any cleanup after test


# ============================================================
# MARKER-BASED FIXTURES
# ============================================================

@pytest.fixture
def slow_test_marker(request):
    """Marker for slow tests"""
    return 'slow' in [marker.name for marker in request.node.iter_markers()]


@pytest.fixture
def api_test_marker(request):
    """Marker for API tests"""
    return 'api' in [marker.name for marker in request.node.iter_markers()]


# ============================================================
# PARAMETRIZE HELPER
# ============================================================

@pytest.fixture(params=['de_DE', 'en_US'])
def language_code(request):
    """Parametrized language codes"""
    return request.param


# ============================================================
# CLEANUP & ASSERTIONS HELPERS
# ============================================================

@pytest.fixture
def assert_settings():
    """Helper for asserting settings"""
    def _assert(setting_name, expected_value):
        from django.conf import settings
        actual_value = getattr(settings, setting_name)
        assert actual_value == expected_value, \
            f"Setting {setting_name}: expected {expected_value}, got {actual_value}"
    return _assert


@pytest.fixture
def assert_middleware():
    """Helper for asserting middleware"""
    def _assert(middleware_name):
        from django.conf import settings
        assert middleware_name in settings.MIDDLEWARE, \
            f"Middleware {middleware_name} not found in MIDDLEWARE list"
    return _assert


@pytest.fixture
def assert_installed_app():
    """Helper for asserting installed apps"""
    def _assert(app_name):
        from django.conf import settings
        assert app_name in settings.INSTALLED_APPS, \
            f"App {app_name} not found in INSTALLED_APPS"
    return _assert


# ============================================================
# LOGGING CONFIGURATION
# ============================================================

@pytest.fixture
def caplog(caplog):
    """Configure logging for tests"""
    import logging

    caplog.set_level(logging.DEBUG)

    return caplog


# ============================================================
# MONKEYPATCH HELPER
# ============================================================

@pytest.fixture
def monkeypatch_setting(monkeypatch):
    """Helper to monkeypatch Django settings"""
    def _patch(setting_name, value):
        from django.conf import settings
        monkeypatch.setattr(settings, setting_name, value)
    return _patch


if __name__ == '__main__':
    pytest.main(['-v', '--tb=short'])
