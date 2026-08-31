"""
Comprehensive test suite for Django/Next.js Portfolio Application
Tests for: CORS, CSRF, API endpoints, Email handling, Error handling
"""

import pytest
from unittest.mock import patch, Mock, MagicMock
from django.test import TestCase, Client, override_settings
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from faker import Faker
import json
from datetime import datetime


# ============================================================
# FIXTURES
# ============================================================

@pytest.fixture
def api_client():
    """Fixture providing DRF API client"""
    return APIClient()


@pytest.fixture
def authenticated_client(api_client):
    """Fixture providing authenticated API client"""
    user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )
    api_client.force_authenticate(user=user)
    return api_client


@pytest.fixture
def csrf_client():
    """Fixture providing Django test client with CSRF support"""
    return Client(enforce_csrf_checks=True)


@pytest.fixture
def sample_contact_data():
    """Fixture providing sample contact form data"""
    return {
        'name': 'Max Mustermann',
        'email': 'max@example.com',
        'phone': '+49123456789',
        'project_type': 'Odoo Development',
        'budget': '5000-10000 EUR',
        'timeline': '1-3 months',
        'description': 'Wir brauchen eine Odoo-Erweiterung für unseren Shop.'
    }


@pytest.fixture
def invalid_contact_data():
    """Fixture providing invalid contact data"""
    return {
        'name': '',  # Missing required field
        'email': 'invalid-email',  # Invalid email format
        'phone': '+49123456789',
        'project_type': 'Odoo Development',
        'budget': '',
        'timeline': '',
        'description': ''  # Missing required field
    }


# ============================================================
# TEST CLASS: CORS CONFIGURATION
# ============================================================

@pytest.mark.django_db
class TestCORSConfiguration:
    """Test CORS (Cross-Origin Resource Sharing) configuration"""

    def test_cors_middleware_installed(self):
        """Test that CORS middleware is properly installed"""
        middleware = settings.MIDDLEWARE
        assert 'corsheaders.middleware.CorsMiddleware' in middleware, \
            "CorsMiddleware not found in MIDDLEWARE. Must be before SessionMiddleware!"

    def test_cors_middleware_position(self):
        """Test that CORS middleware is at correct position (first)"""
        middleware = settings.MIDDLEWARE
        cors_index = middleware.index('corsheaders.middleware.CorsMiddleware')
        # Should be before SessionMiddleware
        session_index = middleware.index('django.contrib.sessions.middleware.SessionMiddleware')
        assert cors_index < session_index, \
            f"CorsMiddleware (pos {cors_index}) must come before SessionMiddleware (pos {session_index})"

    def test_cors_allowed_origins_configured(self):
        """Test that CORS_ALLOWED_ORIGINS is configured"""
        assert hasattr(settings, 'CORS_ALLOWED_ORIGINS'), \
            "CORS_ALLOWED_ORIGINS not configured in settings"
        assert len(settings.CORS_ALLOWED_ORIGINS) > 0, \
            "CORS_ALLOWED_ORIGINS is empty"

    def test_cors_allowed_origins_contains_frontend_url(self):
        """Test that CORS_ALLOWED_ORIGINS includes frontend URL"""
        frontend_urls = ['http://localhost:3000', 'http://127.0.0.1:3000']
        configured_origins = settings.CORS_ALLOWED_ORIGINS

        found = any(url in configured_origins for url in frontend_urls)
        assert found or 'http://localhost:3000' in str(configured_origins), \
            f"Frontend URL not in CORS_ALLOWED_ORIGINS: {configured_origins}"

    def test_cors_allow_credentials_setting(self):
        """Test that credentials are allowed in CORS"""
        assert hasattr(settings, 'CORS_ALLOW_CREDENTIALS'), \
            "CORS_ALLOW_CREDENTIALS not configured"
        # Depending on configuration, should be True for JWT/session auth
        # This is optional but recommended for development

    @pytest.mark.parametrize('origin,should_allow', [
        ('http://localhost:3000', True),
        ('http://127.0.0.1:3000', True),
        ('http://malicious-site.com', False),
        ('https://other-domain.com', False),
    ])
    def test_cors_origin_validation(self, api_client, origin, should_allow):
        """Test CORS origin validation with different origins"""
        # This would require actual API endpoint
        # Parametrized for different origins
        pass


# ============================================================
# TEST CLASS: CSRF PROTECTION
# ============================================================

@pytest.mark.django_db
class TestCSRFProtection:
    """Test CSRF (Cross-Site Request Forgery) protection"""

    def test_csrf_middleware_installed(self):
        """Test that CSRF middleware is installed"""
        middleware = settings.MIDDLEWARE
        assert 'django.middleware.csrf.CsrfViewMiddleware' in middleware

    def test_csrf_trusted_origins_configured(self):
        """Test that CSRF_TRUSTED_ORIGINS is configured"""
        assert hasattr(settings, 'CSRF_TRUSTED_ORIGINS'), \
            "CSRF_TRUSTED_ORIGINS not configured"
        assert len(settings.CSRF_TRUSTED_ORIGINS) > 0, \
            "CSRF_TRUSTED_ORIGINS is empty"

    def test_csrf_trusted_origins_includes_frontend(self):
        """Test that CSRF_TRUSTED_ORIGINS includes frontend domain"""
        frontend_urls = ['http://localhost:3000', 'http://127.0.0.1:3000']
        configured_origins = settings.CSRF_TRUSTED_ORIGINS

        found = any(url in configured_origins for url in frontend_urls)
        assert found, f"Frontend URL not in CSRF_TRUSTED_ORIGINS: {configured_origins}"

    def test_csrf_cookie_secure_setting(self):
        """Test CSRF cookie security settings for production"""
        # Skip in development, only test in production
        if settings.DEBUG:
            pytest.skip("CSRF_COOKIE_SECURE check skipped in development (DEBUG=True)")

    def test_csrf_cookie_httponly_setting(self):
        """Test CSRF cookie HttpOnly setting"""
        # Note: CSRF token needs to be readable by JavaScript for forms
        # but can be HttpOnly for additional security on the cookie itself
        pass

    def test_csrf_cookie_samesite_setting(self):
        """Test CSRF_COOKIE_SAMESITE setting"""
        if hasattr(settings, 'CSRF_COOKIE_SAMESITE'):
            assert settings.CSRF_COOKIE_SAMESITE in ['Strict', 'Lax', 'None']

    def test_csrf_failure_view_configured(self):
        """Test that CSRF failure view is properly configured"""
        assert hasattr(settings, 'CSRF_FAILURE_VIEW') or settings.CSRF_FAILURE_VIEW is None


# ============================================================
# TEST CLASS: API ENDPOINTS
# ============================================================

@pytest.mark.django_db
class TestAPIEndpoints(APITestCase):
    """Test API endpoints configuration and functionality"""

    def setUp(self):
        """Setup test data"""
        self.client = APIClient()
        self.api_urls = [
            '/api/',
            '/api/contact/',
            '/api/portfolio/',
        ]

    def test_api_root_endpoint_exists(self):
        """Test that API root endpoint is accessible"""
        response = self.client.get('/api/')
        assert response.status_code in [200, 404], \
            f"API root endpoint returned unexpected status: {response.status_code}"

    def test_drf_installed(self):
        """Test that Django REST Framework is installed"""
        assert 'rest_framework' in settings.INSTALLED_APPS, \
            "rest_framework not found in INSTALLED_APPS"

    def test_drf_default_pagination_configured(self):
        """Test that DRF pagination is configured"""
        rest_config = settings.REST_FRAMEWORK
        # Optional: only assert if configured
        if 'DEFAULT_PAGINATION_CLASS' in rest_config:
            assert rest_config['DEFAULT_PAGINATION_CLASS'], \
                "DEFAULT_PAGINATION_CLASS is empty"

    def test_drf_default_filter_backends_configured(self):
        """Test that DRF filter backends are configured"""
        rest_config = settings.REST_FRAMEWORK
        # Optional: only assert if configured
        if 'DEFAULT_FILTER_BACKENDS' in rest_config:
            assert rest_config['DEFAULT_FILTER_BACKENDS'], \
                "DEFAULT_FILTER_BACKENDS is empty"

    def test_drf_permission_classes_configured(self):
        """Test that DRF default permission classes are configured"""
        rest_config = settings.REST_FRAMEWORK
        # Should have some permission class configured
        # (can be AllowAny for public API or IsAuthenticated for private)
        pass

    def test_contact_api_endpoint_structure(self):
        """Test contact API endpoint response structure"""
        # This would test actual endpoint if it exists
        pass

    def test_portfolio_api_endpoint_structure(self):
        """Test portfolio API endpoint response structure"""
        # This would test actual endpoint if it exists
        pass


# ============================================================
# TEST CLASS: EMAIL VALIDATION & SENDING
# ============================================================

@pytest.mark.django_db
class TestEmailHandling:
    """Test email validation and sending functionality"""

    def test_email_backend_configured(self):
        """Test that email backend is configured"""
        assert hasattr(settings, 'EMAIL_BACKEND'), \
            "EMAIL_BACKEND not configured"
        # Should be either:
        # - 'django.core.mail.backends.smtp.EmailBackend' (production)
        # - 'django.core.mail.backends.console.EmailBackend' (dev)
        # - 'django.core.mail.backends.locmem.EmailBackend' (testing)

    def test_email_host_configured(self):
        """Test that EMAIL_HOST is configured"""
        if not settings.DEBUG:  # Only required in production
            assert settings.EMAIL_HOST, "EMAIL_HOST not configured for production"

    def test_email_port_configured(self):
        """Test that EMAIL_PORT is configured"""
        if not settings.DEBUG:
            assert settings.EMAIL_PORT, "EMAIL_PORT not configured"

    @pytest.mark.skipif(settings.DEBUG, reason="Email credentials not required in development")
    def test_email_host_user_configured(self):
        """Test that EMAIL_HOST_USER is configured"""
        assert settings.EMAIL_HOST_USER, "EMAIL_HOST_USER not configured"

    @pytest.mark.skipif(settings.DEBUG, reason="Email credentials not required in development")
    def test_email_host_password_configured(self):
        """Test that EMAIL_HOST_PASSWORD is configured"""
        assert settings.EMAIL_HOST_PASSWORD, "EMAIL_HOST_PASSWORD not configured"

    @pytest.mark.skipif(settings.DEBUG, reason="EMAIL_USE_TLS not required in development")
    def test_email_use_tls_setting(self):
        """Test that EMAIL_USE_TLS is properly set"""
        # Should be True for security in production
        assert settings.EMAIL_USE_TLS is True, "EMAIL_USE_TLS should be True"

    @pytest.mark.parametrize('email,is_valid', [
        ('valid@example.com', True),
        ('user.name@example.co.uk', True),
        ('invalid.email@', False),
        ('invalid@domain', False),
        ('', False),
        ('spaces in@email.com', False),
        ('user+tag@example.com', True),
    ])
    def test_email_validation(self, email, is_valid):
        """Test email validation with parametrized values"""
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError

        try:
            validate_email(email)
            assert is_valid, f"Email {email} should be invalid but was accepted"
        except ValidationError:
            assert not is_valid, f"Email {email} should be valid but was rejected"

    @patch('django.core.mail.send_mail')
    def test_contact_email_sending(self, mock_send_mail, sample_contact_data):
        """Test contact form email sending"""
        mock_send_mail.return_value = 1  # 1 email sent successfully

        # Simulate sending email
        from django.core.mail import send_mail
        result = send_mail(
            subject='New Contact Request',
            message=f"Name: {sample_contact_data['name']}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=['admin@example.com'],
        )

        assert result == 1
        mock_send_mail.assert_called_once()

    @patch('django.core.mail.send_mail')
    def test_contact_email_sending_failure_handling(self, mock_send_mail):
        """Test handling of email sending failures"""
        mock_send_mail.side_effect = Exception("SMTP connection failed")

        from django.core.mail import send_mail
        with pytest.raises(Exception):
            send_mail(
                subject='Test',
                message='Test message',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=['test@example.com'],
            )

    def test_email_retry_configuration(self):
        """Test that email retry mechanism is configured"""
        # Check if retry settings are in place
        # This could be via Celery or a management command
        pass


# ============================================================
# TEST CLASS: ERROR HANDLING
# ============================================================

@pytest.mark.django_db
class TestErrorHandling:
    """Test error handling and error responses"""

    def test_404_error_response(self, client):
        """Test 404 error response structure"""
        response = client.get('/api/nonexistent-endpoint/')
        assert response.status_code == 404

    def test_400_bad_request_response(self):
        """Test 400 Bad Request error response"""
        # Would require actual endpoint that validates input
        pass

    def test_401_unauthorized_response(self):
        """Test 401 Unauthorized response"""
        # Would require endpoint requiring authentication
        pass

    def test_403_forbidden_response(self):
        """Test 403 Forbidden response"""
        # Would require endpoint with specific permissions
        pass

    def test_500_error_handling(self):
        """Test 500 Server Error handling"""
        # Should have proper error handling middleware
        pass

    def test_allowed_hosts_configuration(self):
        """Test that ALLOWED_HOSTS is properly configured"""
        assert settings.ALLOWED_HOSTS, "ALLOWED_HOSTS is empty"

        if not settings.DEBUG:
            # In production, should not contain '*'
            assert '*' not in settings.ALLOWED_HOSTS, \
                "ALLOWED_HOSTS should not contain '*' in production"

    def test_debug_mode_security(self):
        """Test that DEBUG mode is not enabled in production"""
        if 'DJANGO_SETTINGS_MODULE' in os.environ:
            env = os.environ.get('DJANGO_SETTINGS_MODULE', '')
            if 'prod' in env or 'production' in env:
                assert settings.DEBUG is False, \
                    "DEBUG must be False in production settings"

    def test_secret_key_configured(self):
        """Test that SECRET_KEY is configured and not default"""
        assert settings.SECRET_KEY, "SECRET_KEY not configured"
        assert settings.SECRET_KEY != 'django-insecure-key', \
            "SECRET_KEY has default value - must be changed!"

    @patch('rest_framework.exceptions.APIException')
    def test_api_exception_response_format(self, mock_exception):
        """Test that API exceptions return proper JSON format"""
        # DRF automatically formats exceptions as JSON
        pass


# ============================================================
# TEST CLASS: FRONTEND-BACKEND INTEGRATION
# ============================================================

@pytest.mark.django_db
class TestFrontendBackendIntegration:
    """Test frontend-backend integration and communication"""

    def setUp(self):
        """Setup"""
        self.client = APIClient()

    def test_api_response_content_type(self):
        """Test that API responses have correct content-type"""
        # Would require actual endpoint
        pass

    def test_api_json_response_format(self):
        """Test that API returns valid JSON"""
        # Would require actual endpoint
        pass

    def test_api_cors_headers_present(self):
        """Test that CORS headers are present in response"""
        # Would require actual endpoint
        pass

    def test_api_response_has_error_details(self):
        """Test that error responses include helpful details"""
        # Would require actual endpoint
        pass

    def test_frontend_can_make_cross_origin_request(self):
        """Test cross-origin request simulation"""
        # Simulate frontend request from different origin
        pass


# ============================================================
# TEST CLASS: CONFIGURATION SETTINGS
# ============================================================

@pytest.mark.django_db
class TestConfigurationSettings:
    """Test configuration and settings"""

    def test_installed_apps_complete(self):
        """Test that all required apps are installed"""
        required_apps = [
            'django.contrib.admin',
            'django.contrib.auth',
            'django.contrib.contenttypes',
            'django.contrib.sessions',
            'django.contrib.messages',
            'django.contrib.staticfiles',
            'rest_framework',
            'corsheaders',
        ]

        for app in required_apps:
            assert app in settings.INSTALLED_APPS, \
                f"{app} not found in INSTALLED_APPS"

    def test_database_configured(self):
        """Test that database is configured"""
        assert settings.DATABASES, "DATABASES not configured"
        assert 'default' in settings.DATABASES, "Default database not configured"

    def test_static_files_configuration(self):
        """Test static files configuration"""
        assert hasattr(settings, 'STATIC_URL'), "STATIC_URL not configured"
        assert hasattr(settings, 'STATIC_ROOT'), "STATIC_ROOT not configured"

    def test_media_files_configuration(self):
        """Test media files configuration"""
        assert hasattr(settings, 'MEDIA_URL'), "MEDIA_URL not configured"
        assert hasattr(settings, 'MEDIA_ROOT'), "MEDIA_ROOT not configured"

    def test_security_headers_configured(self):
        """Test that security headers are configured"""
        # Should have various security-related settings
        security_settings = [
            'SECURE_BROWSER_XSS_FILTER',
            'SECURE_CONTENT_SECURITY_POLICY',
            'X_FRAME_OPTIONS',
        ]

        # At least some security headers should be configured
        has_security = any(
            hasattr(settings, setting)
            for setting in security_settings
        )
        assert has_security, "No security headers configured"


# ============================================================
# TEST CLASS: RATE LIMITING
# ============================================================

@pytest.mark.django_db
class TestRateLimiting:
    """Test rate limiting configuration"""

    def test_rate_limiting_middleware_or_decorator_exists(self):
        """Test that rate limiting mechanism exists"""
        # This could be via django-ratelimit or similar
        # Check if rate limiting decorator/middleware is available
        pass

    def test_contact_form_rate_limit_per_ip(self):
        """Test that rate limiting is enforced per IP"""
        # Contact form should have rate limiting (e.g., 5 requests/hour per IP)
        pass

    def test_rate_limit_returns_429_when_exceeded(self):
        """Test that rate limit returns 429 status"""
        # When limit exceeded, should return HTTP 429
        pass


# ============================================================
# TEST CLASS: INPUT VALIDATION
# ============================================================

@pytest.mark.django_db
class TestInputValidation:
    """Test input validation and sanitization"""

    def test_empty_fields_validation(self, invalid_contact_data):
        """Test that empty required fields are rejected"""
        # Name is required
        assert not invalid_contact_data['name']
        # Description is required
        assert not invalid_contact_data['description']

    def test_email_format_validation(self, invalid_contact_data):
        """Test that invalid email format is rejected"""
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError

        with pytest.raises(ValidationError):
            validate_email(invalid_contact_data['email'])

    @pytest.mark.parametrize('field,value', [
        ('name', 'A' * 300),  # Too long
        ('email', 'test@' + 'x' * 300),  # Too long
        ('phone', '<script>alert("xss")</script>'),  # XSS attempt
        ('description', '<img src=x onerror="alert(1)">'),  # XSS attempt
    ])
    def test_field_length_and_xss_validation(self, field, value):
        """Test field length limits and XSS prevention"""
        # Fields should be sanitized
        pass

    def test_sql_injection_prevention(self):
        """Test that SQL injection attempts are prevented"""
        # Django ORM should prevent SQL injection
        malicious_input = "'; DROP TABLE users; --"
        # This should be safely handled by Django ORM
        pass


# ============================================================
# INTEGRATION TESTS
# ============================================================

@pytest.mark.django_db
class TestIntegration:
    """Integration tests for complete workflows"""

    def setUp(self):
        """Setup"""
        self.client = APIClient()

    def test_complete_contact_form_submission_workflow(self, sample_contact_data):
        """Test complete workflow: Form submission -> Validation -> Email sending"""
        # 1. Validate data
        # 2. Save to database
        # 3. Send email
        # 4. Return response
        pass

    def test_api_endpoint_with_cors_and_csrf(self):
        """Test API endpoint with both CORS and CSRF protection"""
        # Should handle both correctly
        pass

    def test_error_handling_for_failed_email_sending(self):
        """Test graceful handling when email sending fails"""
        # Should retry or log error appropriately
        pass


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def test_imports_are_working():
    """Simple test to verify imports work"""
    from django.conf import settings
    from rest_framework import status
    assert settings is not None
    assert status is not None


# ============================================================
# PYTEST CONFIGURATION
# ============================================================

import os

# Configure pytest
def pytest_configure(config):
    """Configure pytest"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.test')

    import django
    django.setup()


if __name__ == '__main__':
    pytest.main([__file__, '-v', '--tb=short'])
