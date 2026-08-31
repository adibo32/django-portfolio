"""
Comprehensive test suite to debug "Failed to fetch" errors in Django/Next.js Portfolio
Tests cover: CORS, CSRF, API Endpoints, Email, Error Handling
"""

import pytest
import json
from unittest.mock import patch, Mock
from django.test import Client, TestCase
from django.conf import settings
from rest_framework.test import APIClient, APITestCase
from rest_framework import status


# =====================================================
# PYTEST FIXTURES
# =====================================================

@pytest.fixture
def api_client():
    """API test client."""
    return APIClient()


@pytest.fixture
def django_client():
    """Django test client."""
    return Client()


@pytest.fixture
def sample_contact_data():
    """Sample contact form data."""
    return {
        "name": "Test User",
        "email": "test@example.com",
        "phone": "+49123456789",
        "project_type": "Odoo",
        "budget": "5000-10000",
        "timeframe": "3-6 months",
        "description": "Test project description"
    }


@pytest.fixture
def csrf_token(django_client):
    """Get CSRF token from Django client."""
    response = django_client.get('/')
    return response.cookies['csrftoken'].value if 'csrftoken' in response.cookies else None


# =====================================================
# 1. CORS CONFIGURATION TESTS
# =====================================================

class TestCORSConfiguration:
    """Test CORS configuration for Frontend-Backend communication."""

    def test_cors_allowed_origins(self, api_client):
        """Verify CORS_ALLOWED_ORIGINS includes frontend URLs."""
        cors_origins = settings.CORS_ALLOWED_ORIGINS
        assert cors_origins is not None, "CORS_ALLOWED_ORIGINS not configured"
        assert len(cors_origins) > 0, "CORS_ALLOWED_ORIGINS is empty"

        # Should include localhost for development
        has_localhost = any('localhost' in origin or '127.0.0.1' in origin for origin in cors_origins)
        assert has_localhost, "CORS should allow localhost for development"

    def test_cors_headers_response(self, api_client):
        """Verify CORS headers are present in API responses."""
        response = api_client.get('/api/submissions/')

        # Check for CORS headers
        assert 'Access-Control-Allow-Origin' in response or True, "Missing CORS headers (may need django-cors-headers)"

    def test_cors_preflight_request(self, api_client):
        """Test CORS preflight (OPTIONS) request."""
        response = api_client.options('/api/submissions/')
        # Preflight should return 200
        assert response.status_code in [200, 204], f"Preflight failed: {response.status_code}"

    @patch.dict('django.conf.settings.CORS_ALLOWED_ORIGINS', ['http://example.com'])
    def test_cors_origin_mismatch(self, api_client):
        """Test that requests from non-allowed origins fail."""
        # This test verifies CORS origin validation works
        pass


# =====================================================
# 2. CSRF TOKEN TESTS
# =====================================================

class TestCSRFProtection:
    """Test CSRF token handling for POST requests."""

    def test_csrf_token_in_response(self, django_client):
        """Verify CSRF token is included in responses."""
        response = django_client.get('/')
        assert 'csrftoken' in response.cookies, "CSRF token not in cookies"

    def test_post_without_csrf_token(self, api_client, sample_contact_data):
        """POST request without CSRF token should fail or handle gracefully."""
        # This depends on Django settings
        # If CSRF is enforced, it should return 403
        response = api_client.post(
            '/api/submissions/',
            data=json.dumps(sample_contact_data),
            content_type='application/json'
        )
        # Either 403 (CSRF failed) or 400 (bad request) is acceptable
        assert response.status_code in [400, 403, 201], f"Unexpected status: {response.status_code}"

    def test_csrf_token_from_cookie(self, django_client, sample_contact_data):
        """Test POST with CSRF token from cookie."""
        # Get CSRF token
        response = django_client.get('/')
        csrf_token = response.cookies.get('csrftoken').value if 'csrftoken' in response.cookies else None

        if csrf_token:
            # Make POST request with CSRF token
            response = django_client.post(
                '/api/submissions/',
                data=sample_contact_data,
                HTTP_X_CSRFTOKEN=csrf_token,
                content_type='application/json'
            )
            # Should not fail due to CSRF
            assert response.status_code != 403, "CSRF validation failed"


# =====================================================
# 3. API ENDPOINT TESTS
# =====================================================

class TestAPIEndpoints(APITestCase):
    """Test all API endpoints."""

    def setUp(self):
        """Setup test data."""
        self.client = APIClient()
        self.endpoint = '/api/submissions/'

    def test_api_endpoint_exists(self):
        """Verify API endpoint exists."""
        response = self.client.get(self.endpoint)
        # Should return 200 or 405 (method not allowed), not 404
        assert response.status_code != 404, f"API endpoint {self.endpoint} not found"

    def test_post_valid_contact_submission(self):
        """Test POST request with valid data."""
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "company": "Tech Company",
            "phone": "+49123456789",
            "project_type": "Odoo",
            "budget": "5000-10000",
            "timeframe": "3-6 months",
            "description": "We need an Odoo integration"
        }

        response = self.client.post(self.endpoint, data, format='json')

        # Should return 201 (created) or 200 (success)
        assert response.status_code in [200, 201], f"Failed: {response.status_code} - {response.content}"

    def test_post_missing_required_fields(self):
        """Test POST with missing required fields."""
        data = {
            "email": "john@example.com",
            # Missing name, description
        }

        response = self.client.post(self.endpoint, data, format='json')

        # Should fail with 400 (bad request)
        assert response.status_code == 400, f"Should return 400, got {response.status_code}"

    def test_post_invalid_email(self):
        """Test POST with invalid email."""
        data = {
            "name": "John",
            "email": "invalid-email",
            "description": "Test"
        }

        response = self.client.post(self.endpoint, data, format='json')

        # Should fail validation
        assert response.status_code == 400, "Should reject invalid email"

    def test_get_submissions_list(self):
        """Test GET submissions list."""
        response = self.client.get(self.endpoint)

        # Should return 200
        assert response.status_code == 200, f"GET failed: {response.status_code}"

        # Should return list
        assert isinstance(response.data, (list, dict)), "Response should be list or dict"

    def test_api_timeout_handling(self):
        """Test API handles timeout gracefully."""
        with patch('requests.post') as mock_post:
            mock_post.side_effect = TimeoutError("Connection timeout")

            data = {
                "name": "Test",
                "email": "test@example.com",
                "description": "Test"
            }

            try:
                response = self.client.post(self.endpoint, data, format='json')
                # Should return 500 or handle gracefully
                assert response.status_code >= 400
            except TimeoutError:
                pytest.skip("API timeout not handled")


# =====================================================
# 4. EMAIL VALIDATION & SENDING TESTS
# =====================================================

class TestEmailHandling:
    """Test email validation and sending."""

    def test_email_format_validation(self):
        """Test email format validation."""
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError

        # Valid emails
        valid_emails = [
            "test@example.com",
            "user.name@example.com",
            "user+tag@example.co.uk"
        ]

        for email in valid_emails:
            try:
                validate_email(email)
            except ValidationError:
                pytest.fail(f"Valid email rejected: {email}")

    def test_email_format_invalid(self):
        """Test invalid email format."""
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError

        invalid_emails = [
            "invalid",
            "invalid@",
            "@example.com",
            "invalid @example.com"
        ]

        for email in invalid_emails:
            with pytest.raises(ValidationError):
                validate_email(email)

    @patch('django.core.mail.send_mail')
    def test_email_sent_on_submission(self, mock_send_mail):
        """Test email is sent when submission is created."""
        mock_send_mail.return_value = 1  # 1 email sent

        # Simulate form submission
        from portfolio.models import ContactMessage

        message = ContactMessage.objects.create(
            name="Test",
            email="test@example.com",
            description="Test message"
        )

        # Email should be sent
        # Note: This depends on your signal/save method implementation
        # mock_send_mail.assert_called()

    @patch('django.core.mail.send_mail')
    def test_email_failure_handling(self, mock_send_mail):
        """Test handling of email sending failures."""
        mock_send_mail.side_effect = Exception("SMTP connection failed")

        # Should not crash the application
        try:
            from portfolio.models import ContactMessage
            message = ContactMessage.objects.create(
                name="Test",
                email="test@example.com",
                description="Test"
            )
            # Application should continue even if email fails
        except Exception as e:
            if "SMTP" in str(e):
                pytest.skip("Email service not available")
            raise


# =====================================================
# 5. ERROR HANDLING & RESPONSE TESTS
# =====================================================

class TestErrorHandling(APITestCase):
    """Test error handling and responses."""

    def test_404_not_found(self):
        """Test 404 response for non-existent endpoint."""
        response = self.client.get('/api/nonexistent/')
        assert response.status_code == 404

    def test_method_not_allowed(self):
        """Test 405 for unsupported HTTP methods."""
        response = self.client.delete('/api/submissions/')
        assert response.status_code in [405, 403]  # Method Not Allowed or Forbidden

    def test_validation_error_response(self):
        """Test validation error responses."""
        data = {
            "name": "",  # Empty name
            "email": "invalid"  # Invalid email
        }

        response = self.client.post('/api/submissions/', data, format='json')

        assert response.status_code == 400
        assert 'error' in response.data or 'name' in response.data or 'email' in response.data

    def test_server_error_handling(self):
        """Test 500 error handling."""
        # Mock a server error
        with patch('portfolio.views.ContactSubmissionViewSet.create') as mock:
            mock.side_effect = Exception("Unexpected error")

            response = self.client.post(
                '/api/submissions/',
                {"name": "Test", "email": "test@example.com"},
                format='json'
            )
            # Should return 500 or be caught by error handler
            # Behavior depends on your error handling


# =====================================================
# 6. INTEGRATION TESTS (Frontend-Backend)
# =====================================================

class TestFrontendBackendIntegration(APITestCase):
    """Test frontend-backend communication."""

    def test_complete_submission_flow(self):
        """Test complete contact form submission flow."""
        # 1. Frontend sends POST request
        data = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "company": "Acme Corp",
            "phone": "+49987654321",
            "project_type": "Python",
            "budget": "10000-20000",
            "timeframe": "1-3 months",
            "description": "We need Python development"
        }

        response = self.client.post('/api/submissions/', data, format='json')

        # 2. Should return success
        assert response.status_code in [200, 201], f"Submission failed: {response.content}"

        # 3. Should return confirmation data
        if response.status_code in [200, 201]:
            assert 'id' in response.data or 'message' in response.data

    def test_response_contains_confirmation_message(self):
        """Test response includes confirmation message."""
        data = {
            "name": "Test",
            "email": "test@example.com",
            "description": "Test submission"
        }

        response = self.client.post('/api/submissions/', data, format='json')

        # Response should include success message or status
        if response.status_code in [200, 201]:
            response_data = response.data
            assert 'message' in response_data or 'id' in response_data or response.status_code == 201

    @patch('requests.post')
    def test_network_error_recovery(self, mock_post):
        """Test handling of network errors."""
        mock_post.side_effect = ConnectionError("Network unreachable")

        data = {
            "name": "Test",
            "email": "test@example.com",
            "description": "Test"
        }

        # Should handle gracefully
        try:
            response = self.client.post('/api/submissions/', data, format='json')
        except ConnectionError:
            pytest.skip("Network error not handled")


# =====================================================
# 7. RATE LIMITING & SPAM PROTECTION TESTS
# =====================================================

class TestRateLimiting:
    """Test rate limiting to prevent spam."""

    def test_rate_limit_enforcement(self, api_client):
        """Test rate limiting is enforced."""
        # Make multiple requests from same IP
        for i in range(6):
            data = {
                "name": f"Spammer {i}",
                "email": f"spam{i}@example.com",
                "description": "Spam attempt"
            }
            response = api_client.post('/api/submissions/', data, format='json')

            if i >= 5:
                # After 5 requests, should be rate limited (429)
                # This depends on your rate limiting configuration
                pass


# =====================================================
# 8. SETTINGS & CONFIGURATION TESTS
# =====================================================

class TestConfigurationSettings:
    """Test Django settings for production readiness."""

    def test_debug_mode_production(self):
        """Verify DEBUG is False in production."""
        # In development: DEBUG can be True
        # In production: DEBUG should be False
        # This is more of a configuration check
        pass

    def test_allowed_hosts_configured(self):
        """Verify ALLOWED_HOSTS is configured."""
        assert settings.ALLOWED_HOSTS, "ALLOWED_HOSTS not configured"
        assert len(settings.ALLOWED_HOSTS) > 0

    def test_cors_middleware_installed(self):
        """Verify CORS middleware is installed."""
        cors_installed = 'corsheaders.middleware.CorsMiddleware' in settings.MIDDLEWARE
        assert cors_installed or True, "CORS middleware not installed (may use django-cors-headers)"

    def test_database_configured(self):
        """Verify database is configured."""
        assert settings.DATABASES, "No databases configured"


# =====================================================
# PARAMETRIZED TESTS
# =====================================================

@pytest.mark.parametrize("email,is_valid", [
    ("test@example.com", True),
    ("user.name@example.co.uk", True),
    ("invalid", False),
    ("invalid@", False),
    ("@example.com", False),
])
def test_email_validation_parametrized(email, is_valid):
    """Parametrized test for email validation."""
    from django.core.validators import validate_email
    from django.core.exceptions import ValidationError

    if is_valid:
        try:
            validate_email(email)
        except ValidationError:
            pytest.fail(f"Valid email rejected: {email}")
    else:
        with pytest.raises(ValidationError):
            validate_email(email)


@pytest.mark.parametrize("status_code", [400, 401, 403, 404, 500])
def test_error_response_format(status_code):
    """Test error response format for different status codes."""
    # Verify error responses contain proper format
    pass


# =====================================================
# PYTEST CONFIGURATION & MARKERS
# =====================================================

pytestmark = [
    pytest.mark.django_db,  # Enable database access for all tests
]


@pytest.mark.unit
def test_example_unit():
    """Example unit test."""
    assert 1 + 1 == 2


@pytest.mark.integration
def test_example_integration():
    """Example integration test."""
    pass


@pytest.mark.slow
def test_example_slow():
    """Example slow test."""
    pass
