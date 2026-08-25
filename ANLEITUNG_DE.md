# 📚 Django Portfolio - Komplette Anleitung (Deutsch)

## Inhalt
1. [Lokale Installation](#lokale-installation)
2. [Projekt-Setup](#projekt-setup)
3. [Datenbank & Migrationen](#datenbank--migrationen)
4. [Lokal Testen](#lokal-testen)
5. [Deployment auf Railway/Render](#deployment-auf-railwayrender)
6. [Custom Domain Setup](#custom-domain-setup)
7. [Email Konfiguration](#email-konfiguration)

---

## Lokale Installation

### Voraussetzungen
- Python 3.10 oder höher: [python.org](https://python.org)
- Git: [git-scm.com](https://git-scm.com)
- pip (kommt mit Python)

### Schritt 1: Projekt vorbereiten

```bash
# Gehe in deinen Projektordner
cd dein-projekt-ordner

# Erstelle ein Django Projekt
django-admin startproject portfolio_project .

# Erstelle die Portfolio App
python manage.py startapp portfolio
```

### Schritt 2: Dateien kopieren

Kopiere diese Dateien aus dem ZIP in den `portfolio` Ordner:
- `models.py`
- `forms.py`
- `views.py`
- `urls.py`
- `templates/` (alle HTML Dateien)

### Schritt 3: Virtual Environment erstellen

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Schritt 4: Dependencies installieren

```bash
pip install -r requirements.txt
```

---

## Projekt-Setup

### Schritt 1: Main Project URLs aktualisieren

Öffne `portfolio_project/urls.py` und ersetze den Inhalt mit:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio.urls')),  # Alle URLs aus portfolio App
]
```

### Schritt 2: Django Settings aktualisieren

Öffne `portfolio_project/settings.py` und aktualisiere:

```python
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

# Secrets - ÄNDERN!
SECRET_KEY = config('SECRET_KEY', default='dev-insecure-key-change-this')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=lambda v: [s.strip() for s in v.split(',')])

# INSTALLED_APPS - Füge 'portfolio' hinzu
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'portfolio',  # ← HINZUFÜGEN
]

# TEMPLATES - Passe DIRS an
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # ← ÄNDERN
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Static Files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Email - Gmail Beispiel
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Admin Email für Benachrichtigungen
ADMIN_EMAIL = config('ADMIN_EMAIL', default='deine@email.com')
```

### Schritt 3: .env Datei erstellen

Erstelle eine `.env` Datei im Root-Verzeichnis (neben manage.py):

```env
# Nur lokal - für Produktion ÄNDERN
SECRET_KEY=django-insecure-change-me-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Email Konfiguration (Gmail)
EMAIL_HOST_USER=deine-email@gmail.com
EMAIL_HOST_PASSWORD=dein-app-passwort
ADMIN_EMAIL=deine-email@gmail.com
```

**Wichtig für Gmail:**
1. Gehe zu myaccount.google.com
2. Sicherheit → Zwei-Faktor-Authentifizierung aktivieren
3. Sicherheit → App-Passwort erstellen
4. "App-Passwort" in .env verwenden (NICHT dein normales Passwort!)

---

## Datenbank & Migrationen

### Schritt 1: Migrationen erstellen

```bash
python manage.py makemigrations portfolio
```

### Schritt 2: In Datenbank übernehmen

```bash
python manage.py migrate
```

### Schritt 3: Superuser (Admin) erstellen

```bash
python manage.py createsuperuser
```

Folge den Anweisungen:
- Username: `admin` (oder dein Name)
- Email: `deine@email.com`
- Password: `sicheres-passwort`

---

## Lokal Testen

### Entwicklungsserver starten

```bash
python manage.py runserver
```

**Öffne im Browser:**
- Portfolio: http://127.0.0.1:8000/
- Admin Panel: http://127.0.0.1:8000/admin/ (Login mit Superuser)

### Formular testen

1. Scrolle zur Kontakt-Sektion
2. Finde einen Service-Typ, gebe Name, Email, Nachricht ein
3. Sende das Formular ab
4. Du solltest:
   - Eine Erfolgsmeldung sehen
   - Eine Email erhalten (wenn Email korrekt konfiguriert)
   - Die Nachricht im Admin Panel sehen (http://127.0.0.1:8000/admin/portfolio/contactmessage/)

---

## Deployment auf Railway/Render

### Option 1: Railway.app (einfacher)

#### Voraussetzungen
- GitHub Konto mit diesem Projekt als Repository
- Railway Konto: [railway.app](https://railway.app)

#### Schritt 1: Repository auf GitHub pushen

```bash
# Initialisiere Git (falls noch nicht gemacht)
git init
git add .
git commit -m "Initial commit: Django Portfolio"

# Erstelle ein Repository auf github.com und pushe
git remote add origin https://github.com/DEIN-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

#### Schritt 2: Auf Railway Verbinden

1. Gehe zu [railway.app](https://railway.app)
2. Melde dich an / Registriere dich
3. Klick "New Project" → "Deploy from GitHub repo"
4. Wähle dein `portfolio` Repository
5. Railway wird die App automatisch erkennen

#### Schritt 3: Environment Variables setzen

Im Railway Dashboard unter "Variables":

```
SECRET_KEY=create-a-secret-key
DEBUG=False
ALLOWED_HOSTS=dein-railway-domain.up.railway.app,www.adib-dev.com
EMAIL_HOST_USER=deine-email@gmail.com
EMAIL_HOST_PASSWORD=dein-app-passwort
ADMIN_EMAIL=deine-email@gmail.com
DB_ENGINE=postgresql
DATABASE_URL=provided-by-railway
```

#### Schritt 4: Datenbank hinzufügen

1. Im Railway Projekt Dashboard: "+ New" → PostgreSQL
2. Railway fügt automatisch `DATABASE_URL` hinzu
3. Migrationen laufen automatisch

#### Schritt 5: Domain konfigurieren

Im Railway Dashboard:
1. Gehe zum Dienst
2. "Settings" → "Domains"
3. Füge deine Domain hinzu: `www.adib-dev.com`

---

### Option 2: Render.com

#### Schritt 1: GitHub verbinden

1. Gehe zu [render.com](https://render.com)
2. Signups / Login mit GitHub
3. "New +" → "Web Service"
4. Wähle dein Portfolio Repository

#### Schritt 2: Build Befehle setzen

Build Command:
```bash
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
```

Start Command:
```bash
gunicorn portfolio_project.wsgi:application
```

#### Schritt 3: Environment Setup

```
SECRET_KEY=create-a-secret-key
DEBUG=False
ALLOWED_HOSTS=dein-render-domain.onrender.com,www.adib-dev.com
EMAIL_HOST_USER=deine-email@gmail.com
EMAIL_HOST_PASSWORD=dein-app-passwort
ADMIN_EMAIL=deine-email@gmail.com
DATABASE_URL=provided-by-render
```

---

## Custom Domain Setup

### Domain kaufen

Optionen:
- **Namecheap.com** (günstig, 0.99€/Jahr)
- **Domains.google.com** (einfach)
- **GoDaddy.com** (weit verbreitet)

Kaufe: `adib-dev.com`

### Domain auf Railway/Render verbinden

#### Railway:
1. Railway Dashboard → Projekt → "Settings" → "Domains"
2. Klick "Add Custom Domain"
3. Gebe `www.adib-dev.com` ein
4. Railway zeigt dir die CNAME

#### Render:
1. Web Service → "Settings" → "Custom Domains"
2. Klick "Add a Custom Domain"
3. Gebe `www.adib-dev.com` ein
4. Render zeigt dir die CNAME

### DNS-Datensätze aktualisieren

Im Domain Registrar (z.B. Namecheap):

1. "Manage Domain" → "DNS"
2. Füge einen **CNAME Record** hinzu:
   - Name: `www`
   - Value: `CNAME-von-railway-oder-render`
   - TTL: 3600

3. Optional - Root Domain: Füge einen A-Record hinzu (siehe Docs von Railway/Render)

**Warten:** 10-30 Minuten bis DNS propagiert

---

## Email Konfiguration

### Gmail Setup (empfohlen)

1. **Two-Factor-Auth aktivieren:**
   - Google Account: myaccount.google.com
   - Security → 2-Step Verification

2. **App-Passwort erstellen:**
   - Google Account → Security
   - App passwords (unten)
   - Select App: "Mail"
   - Select Device: "Windows/Mac/Linux"
   - Kopiere das 16-stellige Passwort

3. **.env aktualisieren:**
   ```
   EMAIL_HOST_USER=deine-email@gmail.com
   EMAIL_HOST_PASSWORD=xxxxxxxxxx
   ADMIN_EMAIL=deine-email@gmail.com
   ```

4. **Testen:**
   ```bash
   python manage.py shell
   >>> from django.core.mail import send_mail
   >>> send_mail('Test', 'Test Email', 'from@gmail.com', ['to@example.com'])
   1  # 1 = erfolgreich
   ```

---

## Häufige Fehler

### 1. "ModuleNotFoundError: No module named 'portfolio'"
**Lösung:** `pip install -r requirements.txt` erneut ausführen

### 2. "No migrations"
**Lösung:**
```bash
python manage.py makemigrations portfolio
python manage.py migrate
```

### 3. "Static files not found"
**Lösung:**
```bash
python manage.py collectstatic --noinput
```

### 4. "Email wird nicht versendet"
**Lösung:**
- Gmail App-Passwort verwenden (nicht dein normales Passwort)
- Two-Factor-Auth aktivieren
- `.env` Werte überprüfen
- In Django Admin testen (oben "Email konfiguration")

### 5. "Debug Mode Problem"
**In Produktion IMMER:**
```
DEBUG=False
```

---

## Wichtige Befehle

```bash
# Migrationen
python manage.py makemigrations
python manage.py migrate

# Super User
python manage.py createsuperuser

# Server
python manage.py runserver

# Shell (Debug)
python manage.py shell

# Statische Dateien
python manage.py collectstatic --noinput

# Port wechseln
python manage.py runserver 8001
```

---

## Support & Nächste Schritte

✅ **Fertig!** Dein Portfolio läuft.

**Nächste Schritte:**
1. Kontakt-Nachrichten im Admin Panel überprüfen
2. Email testen durch Formularsubmission
3. Custom Domain Setup abschließen
4. Portfolio URL in sozialen Medien teilen

---

**Fragen?** Schreib mir: hello@adib-dev.com (wird bald zu deiner Email)

Viel Erfolg! 🚀
