"""
Quick Debug Script for "Failed to fetch" Issues
Run this to check all CORS/CSRF and common configuration problems
"""

import os
import sys
from pathlib import Path

# Windows Unicode Fix
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Configure Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')

try:
    import django
    django.setup()
except Exception as e:
    print(f"[ERROR] Django Setup Error: {e}")
    print(f"\nFix: You may need to install: pip install python-dotenv")
    sys.exit(1)

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured


class Colors:
    """Terminal colors"""
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'


def print_check(name, passed, details=""):
    """Print a check result"""
    status = f"{Colors.GREEN}[PASS]{Colors.END}" if passed else f"{Colors.RED}[FAIL]{Colors.END}"
    print(f"{status} - {name}")
    if details:
        print(f"      {Colors.YELLOW}> {details}{Colors.END}")


def print_header(title):
    """Print a section header"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'=' * 60}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}>> {title}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'=' * 60}{Colors.END}\n")


def check_cors():
    """Check CORS configuration"""
    print_header("🔄 CORS Configuration Check")

    checks = []

    # Check 1: CorsMiddleware installed
    cors_installed = 'corsheaders' in settings.INSTALLED_APPS
    checks.append(('corsheaders in INSTALLED_APPS', cors_installed))

    # Check 2: CorsMiddleware in MIDDLEWARE
    cors_middleware_present = 'corsheaders.middleware.CorsMiddleware' in settings.MIDDLEWARE
    checks.append(('CorsMiddleware in MIDDLEWARE', cors_middleware_present))

    # Check 3: CorsMiddleware position
    cors_position_ok = False
    if cors_middleware_present:
        cors_index = settings.MIDDLEWARE.index('corsheaders.middleware.CorsMiddleware')
        session_index = None
        for i, mw in enumerate(settings.MIDDLEWARE):
            if 'SessionMiddleware' in mw:
                session_index = i
                break

        cors_position_ok = session_index is None or cors_index < session_index
        detail = f"Position {cors_index}" + (
            f" (before SessionMiddleware at {session_index})" if session_index else ""
        )
        checks.append(('CorsMiddleware position (should be first)', cors_position_ok, detail))
    else:
        checks.append(('CorsMiddleware position', False, "CorsMiddleware not in MIDDLEWARE"))

    # Check 4: CORS_ALLOWED_ORIGINS configured
    cors_origins_configured = bool(getattr(settings, 'CORS_ALLOWED_ORIGINS', None))
    checks.append(('CORS_ALLOWED_ORIGINS configured', cors_origins_configured))

    # Check 5: Frontend URL in CORS_ALLOWED_ORIGINS
    frontend_urls = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost']
    cors_origins = getattr(settings, 'CORS_ALLOWED_ORIGINS', [])
    frontend_in_cors = any(url in cors_origins for url in frontend_urls)
    checks.append(('Frontend URL in CORS_ALLOWED_ORIGINS', frontend_in_cors,
                   f"Configured: {cors_origins}"))

    # Check 6: CORS_ALLOW_CREDENTIALS
    cors_credentials = getattr(settings, 'CORS_ALLOW_CREDENTIALS', False)
    checks.append(('CORS_ALLOW_CREDENTIALS', cors_credentials))

    # Check 7: CORS_ALLOW_METHODS
    cors_methods = getattr(settings, 'CORS_ALLOW_METHODS', None)
    checks.append(('CORS_ALLOW_METHODS configured', cors_methods is not None,
                   f"Methods: {cors_methods}"))

    # Print results
    for check in checks:
        if len(check) == 3:
            print_check(check[0], check[1], check[2])
        else:
            print_check(check[0], check[1])

    # Summary
    all_passed = all(check[1] for check in checks)
    return all_passed


def check_csrf():
    """Check CSRF configuration"""
    print_header("🛡️  CSRF Configuration Check")

    checks = []

    # Check 1: CsrfViewMiddleware installed
    csrf_middleware_present = 'django.middleware.csrf.CsrfViewMiddleware' in settings.MIDDLEWARE
    checks.append(('CsrfViewMiddleware in MIDDLEWARE', csrf_middleware_present))

    # Check 2: CSRF_TRUSTED_ORIGINS configured
    csrf_origins = getattr(settings, 'CSRF_TRUSTED_ORIGINS', None)
    csrf_origins_configured = bool(csrf_origins)
    checks.append(('CSRF_TRUSTED_ORIGINS configured', csrf_origins_configured,
                   f"Configured: {csrf_origins}"))

    # Check 3: Frontend URL in CSRF_TRUSTED_ORIGINS
    frontend_urls = ['http://localhost:3000', 'http://127.0.0.1:3000']
    csrf_origins = getattr(settings, 'CSRF_TRUSTED_ORIGINS', [])
    frontend_in_csrf = any(url in csrf_origins for url in frontend_urls)
    checks.append(('Frontend URL in CSRF_TRUSTED_ORIGINS', frontend_in_csrf))

    # Check 4: CSRF_COOKIE_SECURE (for production)
    if not settings.DEBUG:
        csrf_cookie_secure = getattr(settings, 'CSRF_COOKIE_SECURE', False)
        checks.append(('CSRF_COOKIE_SECURE (Production)', csrf_cookie_secure))

    # Check 5: CSRF_COOKIE_HTTPONLY
    csrf_cookie_httponly = getattr(settings, 'CSRF_COOKIE_HTTPONLY', False)
    checks.append(('CSRF_COOKIE_HTTPONLY', csrf_cookie_httponly == False,
                   "Should be False for JavaScript access"))

    # Check 6: CSRF_COOKIE_SAMESITE
    csrf_samesite = getattr(settings, 'CSRF_COOKIE_SAMESITE', 'Lax')
    valid_samesite = csrf_samesite in ['Strict', 'Lax', 'None', False]
    checks.append(('CSRF_COOKIE_SAMESITE valid', valid_samesite, f"Value: {csrf_samesite}"))

    # Print results
    for check in checks:
        if len(check) == 3:
            print_check(check[0], check[1], check[2])
        else:
            print_check(check[0], check[1])

    all_passed = all(check[1] for check in checks)
    return all_passed


def check_django_rest_framework():
    """Check Django REST Framework configuration"""
    print_header("⚙️  Django REST Framework Configuration")

    checks = []

    # Check 1: DRF installed
    drf_installed = 'rest_framework' in settings.INSTALLED_APPS
    checks.append(('rest_framework in INSTALLED_APPS', drf_installed))

    # Check 2: REST_FRAMEWORK configured
    rest_config = getattr(settings, 'REST_FRAMEWORK', {})
    rest_configured = bool(rest_config)
    checks.append(('REST_FRAMEWORK settings configured', rest_configured))

    # Check 3: DEFAULT_PAGINATION_CLASS
    pagination_class = rest_config.get('DEFAULT_PAGINATION_CLASS')
    checks.append(('DEFAULT_PAGINATION_CLASS configured', pagination_class is not None,
                   f"Class: {pagination_class}"))

    # Check 4: DEFAULT_FILTER_BACKENDS
    filter_backends = rest_config.get('DEFAULT_FILTER_BACKENDS', [])
    checks.append(('DEFAULT_FILTER_BACKENDS configured', len(filter_backends) > 0,
                   f"Backends: {filter_backends}"))

    # Check 5: DEFAULT_PERMISSION_CLASSES
    permission_classes = rest_config.get('DEFAULT_PERMISSION_CLASSES', [])
    checks.append(('DEFAULT_PERMISSION_CLASSES configured', len(permission_classes) > 0,
                   f"Classes: {permission_classes}"))

    # Print results
    for check in checks:
        if len(check) == 3:
            print_check(check[0], check[1], check[2])
        else:
            print_check(check[0], check[1])

    all_passed = all(check[1] for check in checks)
    return all_passed


def check_general_security():
    """Check general security settings"""
    print_header("🔐 General Security Configuration")

    checks = []

    # Check 1: DEBUG mode
    debug_mode = settings.DEBUG
    if debug_mode and os.environ.get('DJANGO_SETTINGS_MODULE', '').find('prod') != -1:
        checks.append(('DEBUG mode (should be False in production)', False,
                       "DEBUG is True in production settings!"))
    else:
        checks.append(('DEBUG mode', True, f"Value: {debug_mode}"))

    # Check 2: SECRET_KEY configured
    secret_key = settings.SECRET_KEY
    is_default = secret_key in ['django-insecure-key', '']
    checks.append(('SECRET_KEY configured (not default)', not is_default,
                   "Using default key!" if is_default else "Custom key set"))

    # Check 3: ALLOWED_HOSTS configured
    allowed_hosts = settings.ALLOWED_HOSTS
    checks.append(('ALLOWED_HOSTS configured', bool(allowed_hosts),
                   f"Hosts: {allowed_hosts}"))

    # Check 4: ALLOWED_HOSTS doesn't contain '*' (production)
    if not settings.DEBUG and allowed_hosts:
        has_wildcard = '*' in allowed_hosts
        checks.append(("ALLOWED_HOSTS doesn't contain '*' (Production)", not has_wildcard))

    # Check 5: WhiteNoise configured (for static files)
    whitenoise_present = 'whitenoise.middleware.WhiteNoiseMiddleware' in settings.MIDDLEWARE
    checks.append(('WhiteNoise middleware (for static files)', whitenoise_present))

    # Check 6: Email backend configured
    email_backend = getattr(settings, 'EMAIL_BACKEND', '')
    checks.append(('EMAIL_BACKEND configured', bool(email_backend), f"Backend: {email_backend}"))

    # Print results
    for check in checks:
        if len(check) == 3:
            print_check(check[0], check[1], check[2])
        else:
            print_check(check[0], check[1])

    all_passed = all(check[1] for check in checks)
    return all_passed


def check_database():
    """Check database configuration"""
    print_header("🗄️  Database Configuration")

    checks = []

    # Check 1: Default database configured
    databases = getattr(settings, 'DATABASES', {})
    default_db_configured = 'default' in databases
    checks.append(('Default database configured', default_db_configured))

    if default_db_configured:
        default_db = databases['default']
        engine = default_db.get('ENGINE', '')
        checks.append(('Database engine configured', bool(engine),
                       f"Engine: {engine}"))

    # Check 2: Database is accessible
    try:
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        checks.append(('Database connection', True, "Connected successfully"))
    except Exception as e:
        checks.append(('Database connection', False, str(e)))

    # Print results
    for check in checks:
        if len(check) == 3:
            print_check(check[0], check[1], check[2])
        else:
            print_check(check[0], check[1])

    all_passed = all(check[1] for check in checks)
    return all_passed


def main():
    """Run all checks"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("=" * 60)
    print("  Django/Next.js Portfolio - Configuration Debug Checker")
    print("=" * 60)
    print(f"{Colors.END}")

    # Run all checks
    results = {
        'CORS': check_cors(),
        'CSRF': check_csrf(),
        'Django REST Framework': check_django_rest_framework(),
        'General Security': check_general_security(),
        'Database': check_database(),
    }

    # Print summary
    print_header("Summary")
    for name, passed in results.items():
        status = f"{Colors.GREEN}[OK]{Colors.END}" if passed else f"{Colors.RED}[FAIL]{Colors.END}"
        print(f"{status} {name}")

    all_passed = all(results.values())

    print("\n")
    if all_passed:
        print(f"{Colors.GREEN}{Colors.BOLD}[OK] All checks passed! Your configuration looks good.{Colors.END}")
        print(f"{Colors.GREEN}You should be able to run the project now.{Colors.END}\n")
    else:
        print(f"{Colors.RED}{Colors.BOLD}[FAIL] Some checks failed. Please fix the issues above.{Colors.END}")
        print(f"{Colors.RED}See TESTING_GUIDE.md for solutions.{Colors.END}\n")

    return 0 if all_passed else 1


if __name__ == '__main__':
    sys.exit(main())
