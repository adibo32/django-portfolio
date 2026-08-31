"""
Django Settings Checker & Debug Script for "Failed to fetch" errors
Run this to identify configuration issues
"""

import os
import sys
import django
from django.conf import settings

# Configure Django
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()


class PortfolioDebugger:
    """Comprehensive debugger for Django API issues."""

    def __init__(self):
        self.issues = []
        self.warnings = []
        self.success = []

    def print_header(self, text):
        """Print section header."""
        print(f"\n{'='*60}")
        print(f"  {text}")
        print(f"{'='*60}\n")

    def check_cors_configuration(self):
        """Check CORS configuration."""
        self.print_header("1. CORS Configuration")

        # Check if django-cors-headers is installed
        try:
            import corsheaders
            self.success.append("✅ django-cors-headers is installed")
        except ImportError:
            self.issues.append("❌ django-cors-headers NOT installed")
            print("   FIX: pip install django-cors-headers")
            return

        # Check if CORS middleware is installed
        if 'corsheaders.middleware.CorsMiddleware' in settings.MIDDLEWARE:
            self.success.append("✅ CorsMiddleware is in MIDDLEWARE")
        else:
            self.issues.append("❌ CorsMiddleware NOT in MIDDLEWARE")
            print("   FIX: Add 'corsheaders.middleware.CorsMiddleware' to MIDDLEWARE")

        # Check CORS_ALLOWED_ORIGINS
        cors_origins = getattr(settings, 'CORS_ALLOWED_ORIGINS', None)
        if cors_origins:
            print(f"   ✅ CORS_ALLOWED_ORIGINS configured:")
            for origin in cors_origins:
                print(f"      - {origin}")
            self.success.append("✅ CORS_ALLOWED_ORIGINS is set")
        else:
            self.warnings.append("⚠️  CORS_ALLOWED_ORIGINS not configured (may be in CORS_ALLOW_ALL_ORIGINS)")

        # Check CORS_ALLOW_ALL_ORIGINS (development only)
        if getattr(settings, 'CORS_ALLOW_ALL_ORIGINS', False):
            self.warnings.append("⚠️  CORS_ALLOW_ALL_ORIGINS=True (should be False in production)")

    def check_csrf_configuration(self):
        """Check CSRF configuration."""
        self.print_header("2. CSRF Configuration")

        # Check CSRF middleware
        if 'django.middleware.csrf.CsrfViewMiddleware' in settings.MIDDLEWARE:
            self.success.append("✅ CSRF middleware is installed")
        else:
            self.issues.append("❌ CSRF middleware NOT in MIDDLEWARE")

        # Check CSRF_COOKIE_SECURE
        if getattr(settings, 'CSRF_COOKIE_SECURE', False):
            self.success.append("✅ CSRF_COOKIE_SECURE=True (production ready)")
        else:
            self.warnings.append("⚠️  CSRF_COOKIE_SECURE=False (should be True in production)")

        # Check CSRF_TRUSTED_ORIGINS
        csrf_origins = getattr(settings, 'CSRF_TRUSTED_ORIGINS', [])
        if csrf_origins:
            print(f"   ✅ CSRF_TRUSTED_ORIGINS configured:")
            for origin in csrf_origins:
                print(f"      - {origin}")
        else:
            self.warnings.append("⚠️  CSRF_TRUSTED_ORIGINS not configured")

    def check_api_configuration(self):
        """Check Django REST Framework configuration."""
        self.print_header("3. Django REST Framework Configuration")

        # Check if DRF is installed
        try:
            import rest_framework
            self.success.append("✅ Django REST Framework is installed")
        except ImportError:
            self.issues.append("❌ Django REST Framework NOT installed")
            print("   FIX: pip install djangorestframework")
            return

        # Check if DRF is in INSTALLED_APPS
        if 'rest_framework' in settings.INSTALLED_APPS:
            self.success.append("✅ rest_framework in INSTALLED_APPS")
        else:
            self.issues.append("❌ rest_framework NOT in INSTALLED_APPS")

        # Check REST_FRAMEWORK settings
        rest_settings = getattr(settings, 'REST_FRAMEWORK', {})
        if rest_settings:
            print("   ✅ REST_FRAMEWORK settings:")
            for key, value in rest_settings.items():
                print(f"      - {key}: {value}")
        else:
            self.warnings.append("⚠️  REST_FRAMEWORK settings not configured")

    def check_database_configuration(self):
        """Check database configuration."""
        self.print_header("4. Database Configuration")

        db_engine = settings.DATABASES['default']['ENGINE']
        print(f"   Database Engine: {db_engine}")

        if 'sqlite' in db_engine:
            self.warnings.append("⚠️  Using SQLite (fine for development, use PostgreSQL for production)")
        elif 'postgresql' in db_engine:
            self.success.append("✅ Using PostgreSQL (production ready)")
        else:
            print(f"   Database Engine: {db_engine}")

        # Test database connection
        try:
            from django.db import connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            self.success.append("✅ Database connection successful")
        except Exception as e:
            self.issues.append(f"❌ Database connection failed: {e}")

    def check_email_configuration(self):
        """Check email configuration."""
        self.print_header("5. Email Configuration")

        email_backend = getattr(settings, 'EMAIL_BACKEND', None)
        print(f"   EMAIL_BACKEND: {email_backend}")

        if 'console' in email_backend:
            self.warnings.append("⚠️  Using console email backend (development only)")
        elif 'smtp' in email_backend or 'gmail' in email_backend:
            self.success.append("✅ SMTP email backend configured")

        # Check email host configuration
        email_host = getattr(settings, 'EMAIL_HOST', None)
        email_port = getattr(settings, 'EMAIL_PORT', None)
        email_user = getattr(settings, 'EMAIL_HOST_USER', None)

        if email_host:
            print(f"   ✅ EMAIL_HOST: {email_host}")
            print(f"   ✅ EMAIL_PORT: {email_port}")
            print(f"   ✅ EMAIL_HOST_USER: {email_user if email_user else '(not set)'}")
        else:
            self.warnings.append("⚠️  Email host not configured")

    def check_allowed_hosts(self):
        """Check ALLOWED_HOSTS configuration."""
        self.print_header("6. ALLOWED_HOSTS Configuration")

        allowed_hosts = settings.ALLOWED_HOSTS
        if allowed_hosts:
            print(f"   ✅ ALLOWED_HOSTS configured:")
            for host in allowed_hosts:
                print(f"      - {host}")
            self.success.append("✅ ALLOWED_HOSTS is configured")
        else:
            self.issues.append("❌ ALLOWED_HOSTS is empty (will break in production)")

    def check_debug_mode(self):
        """Check DEBUG setting."""
        self.print_header("7. DEBUG Mode")

        debug = settings.DEBUG
        print(f"   DEBUG: {debug}")

        if debug:
            self.warnings.append("⚠️  DEBUG=True (should be False in production)")
        else:
            self.success.append("✅ DEBUG=False (production ready)")

    def check_security_settings(self):
        """Check security-related settings."""
        self.print_header("8. Security Settings")

        # HTTPS
        secure_ssl = getattr(settings, 'SECURE_SSL_REDIRECT', False)
        if secure_ssl:
            self.success.append("✅ SECURE_SSL_REDIRECT=True")
        else:
            self.warnings.append("⚠️  SECURE_SSL_REDIRECT=False (should be True in production)")

        # HSTS
        hsts_seconds = getattr(settings, 'SECURE_HSTS_SECONDS', 0)
        if hsts_seconds > 0:
            print(f"   ✅ SECURE_HSTS_SECONDS: {hsts_seconds}")
            self.success.append("✅ HSTS enabled")
        else:
            self.warnings.append("⚠️  HSTS not enabled")

    def check_api_endpoints(self):
        """Check if API endpoints are registered."""
        self.print_header("9. API Endpoints")

        from django.urls import get_resolver

        try:
            resolver = get_resolver()
            url_patterns = resolver.url_patterns

            submission_found = False
            for pattern in url_patterns:
                if 'submission' in str(pattern).lower() or 'api' in str(pattern).lower():
                    print(f"   ✅ Found endpoint: {pattern}")
                    submission_found = True

            if submission_found:
                self.success.append("✅ API endpoints are registered")
            else:
                self.warnings.append("⚠️  No API endpoints found (check urls.py)")
        except Exception as e:
            self.issues.append(f"❌ Error checking endpoints: {e}")

    def check_frontend_backend_connection(self):
        """Test frontend-backend connection."""
        self.print_header("10. Frontend-Backend Connection Test")

        try:
            from django.test import Client
            client = Client()

            # Test GET request
            response = client.get('/api/submissions/')
            print(f"   GET /api/submissions/ → {response.status_code}")

            if response.status_code == 404:
                self.issues.append("❌ API endpoint not found (404)")
            elif response.status_code in [200, 405]:
                self.success.append("✅ API endpoint is accessible")
            else:
                self.warnings.append(f"⚠️  API returned status {response.status_code}")

            # Test POST request with valid data
            data = {
                "name": "Test",
                "email": "test@example.com",
                "description": "Test"
            }
            response = client.post('/api/submissions/', data=data, content_type='application/json')
            print(f"   POST /api/submissions/ → {response.status_code}")

            if response.status_code in [200, 201, 400]:
                self.success.append("✅ API accepts POST requests")
            elif response.status_code == 403:
                self.warnings.append("⚠️  API returned 403 (check CSRF settings)")
            else:
                self.warnings.append(f"⚠️  API returned {response.status_code}")

        except Exception as e:
            self.issues.append(f"❌ Connection test failed: {e}")

    def generate_report(self):
        """Generate debug report."""
        self.print_header("DEBUG REPORT SUMMARY")

        print(f"✅ Successes: {len(self.success)}")
        print(f"⚠️  Warnings: {len(self.warnings)}")
        print(f"❌ Issues: {len(self.issues)}\n")

        if self.success:
            print("SUCCESSES:")
            for item in self.success:
                print(f"  {item}")

        if self.warnings:
            print("\nWARNINGS:")
            for item in self.warnings:
                print(f"  {item}")

        if self.issues:
            print("\nISSUES:")
            for item in self.issues:
                print(f"  {item}")

        print(f"\n{'='*60}\n")

        if self.issues:
            print("⚠️  ISSUES FOUND - Please fix these before deployment")
            return False
        elif self.warnings:
            print("✅ No critical issues, but check warnings above")
            return True
        else:
            print("✅ All checks passed!")
            return True


def run_tests():
    """Run all debug checks."""
    debugger = PortfolioDebugger()

    print("\n" + "="*60)
    print("  Django Portfolio - Failed to Fetch Debugger")
    print("="*60)

    debugger.check_cors_configuration()
    debugger.check_csrf_configuration()
    debugger.check_api_configuration()
    debugger.check_database_configuration()
    debugger.check_email_configuration()
    debugger.check_allowed_hosts()
    debugger.check_debug_mode()
    debugger.check_security_settings()
    debugger.check_api_endpoints()
    debugger.check_frontend_backend_connection()

    return debugger.generate_report()


if __name__ == '__main__':
    success = run_tests()
    sys.exit(0 if success else 1)
