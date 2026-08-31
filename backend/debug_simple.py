"""
Simple Debug Script für aktuelle Django-Struktur
Arbeitet mit config/settings.py (nicht mit settings-Package)
"""

import os
import sys
import django
from pathlib import Path

# Windows UTF-8 Fix
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Configure Django - nutze settings.py statt settings.dev
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

try:
    django.setup()
except Exception as e:
    print(f"[ERROR] Django Setup: {e}")
    sys.exit(1)

from django.conf import settings

print("\n" + "=" * 60)
print(">> Django/Next.js Portfolio - Configuration Check")
print("=" * 60 + "\n")

# CORS Check
print(">> CORS Configuration Check\n")
cors_checks = []

# 1. corsheaders app
has_corsheaders = 'corsheaders' in settings.INSTALLED_APPS
cors_checks.append((has_corsheaders, 'corsheaders in INSTALLED_APPS'))

# 2. CorsMiddleware
has_cors_middleware = 'corsheaders.middleware.CorsMiddleware' in settings.MIDDLEWARE
cors_checks.append((has_cors_middleware, 'CorsMiddleware in MIDDLEWARE'))

# 3. Correct position
if has_cors_middleware:
    cors_idx = settings.MIDDLEWARE.index('corsheaders.middleware.CorsMiddleware')
    session_idx = next((i for i, m in enumerate(settings.MIDDLEWARE) if 'SessionMiddleware' in m), 999)
    cors_first = cors_idx < session_idx
    cors_checks.append((cors_first, f'CorsMiddleware position (index {cors_idx}, should be < {session_idx})'))

# 4. CORS_ALLOWED_ORIGINS
cors_origins = getattr(settings, 'CORS_ALLOWED_ORIGINS', None)
has_origins = bool(cors_origins)
cors_checks.append((has_origins, 'CORS_ALLOWED_ORIGINS configured'))

# 5. Frontend in origins
if cors_origins:
    frontend_urls = ['http://localhost:3000', 'http://127.0.0.1:3000']
    has_frontend = any(url in cors_origins for url in frontend_urls)
    cors_checks.append((has_frontend, f'Frontend URL in CORS_ALLOWED_ORIGINS: {cors_origins}'))

for passed, msg in cors_checks:
    status = '[PASS]' if passed else '[FAIL]'
    print(f"{status} - {msg}")

# CSRF Check
print("\n>> CSRF Configuration Check\n")
csrf_checks = []

# 1. CsrfViewMiddleware
has_csrf_mw = 'django.middleware.csrf.CsrfViewMiddleware' in settings.MIDDLEWARE
csrf_checks.append((has_csrf_mw, 'CsrfViewMiddleware in MIDDLEWARE'))

# 2. CSRF_TRUSTED_ORIGINS
csrf_origins = getattr(settings, 'CSRF_TRUSTED_ORIGINS', None)
has_csrf_origins = bool(csrf_origins)
csrf_checks.append((has_csrf_origins, f'CSRF_TRUSTED_ORIGINS configured: {csrf_origins}'))

# 3. Frontend in CSRF origins
if csrf_origins:
    frontend_urls = ['http://localhost:3000', 'http://127.0.0.1:3000']
    has_frontend_csrf = any(url in csrf_origins for url in frontend_urls)
    csrf_checks.append((has_frontend_csrf, 'Frontend URL in CSRF_TRUSTED_ORIGINS'))

for passed, msg in csrf_checks:
    status = '[PASS]' if passed else '[FAIL]'
    print(f"{status} - {msg}")

# DRF Check
print("\n>> Django REST Framework Configuration\n")
drf_checks = []

has_drf = 'rest_framework' in settings.INSTALLED_APPS
drf_checks.append((has_drf, 'rest_framework in INSTALLED_APPS'))

rest_config = getattr(settings, 'REST_FRAMEWORK', {})
has_config = bool(rest_config)
drf_checks.append((has_config, f'REST_FRAMEWORK configured: {bool(rest_config)}'))

for passed, msg in drf_checks:
    status = '[PASS]' if passed else '[FAIL]'
    print(f"{status} - {msg}")

# Security Check
print("\n>> Security Configuration\n")
sec_checks = []

debug_ok = settings.DEBUG is not None
sec_checks.append((debug_ok, f'DEBUG mode: {settings.DEBUG}'))

secret_ok = settings.SECRET_KEY not in ['', 'django-insecure-key']
sec_checks.append((secret_ok, f'SECRET_KEY configured: {secret_ok}'))

hosts_ok = bool(settings.ALLOWED_HOSTS)
sec_checks.append((hosts_ok, f'ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}'))

for passed, msg in sec_checks:
    status = '[PASS]' if passed else '[FAIL]'
    print(f"{status} - {msg}")

# Database Check
print("\n>> Database Configuration\n")
db_checks = []

has_db = 'default' in settings.DATABASES
db_checks.append((has_db, 'Default database configured'))

if has_db:
    db_config = settings.DATABASES['default']
    engine = db_config.get('ENGINE', '')
    has_engine = bool(engine)
    db_checks.append((has_engine, f'Database engine: {engine}'))

for passed, msg in db_checks:
    status = '[PASS]' if passed else '[FAIL]'
    print(f"{status} - {msg}")

# Summary
print("\n" + "=" * 60)
print("Summary")
print("=" * 60)

all_passed = all(p for p, _ in cors_checks + csrf_checks + drf_checks + sec_checks + db_checks)

if all_passed:
    print("\n[OK] All checks passed! Configuration looks good.")
else:
    print("\n[FAIL] Some checks failed. See QUICK_REFERENCE.md for fixes.")

print()
