# 🚀 Django Portfolio - Backend & Frontend

Ein modernes, produktionsreifes Django Portfolio mit:

- ✨ **Dark Mode Design** (Tailwind CSS)
- 🌍 **Mehrsprachige Unterstützung** (DE, EN, FR, AR)
- 📧 **Kontaktformular mit Email-Benachrichtigungen** (AJAX/HTMX)
- 📱 **Responsive Design**
- 🗄️ **Datenbank-Persistierung** (SQLite lokal, PostgreSQL Produktion)
- 🚀 **Production-Ready Deployment** (Railway/Render)
- 🔒 **Admin Panel** (Django Admin)

## 📁 Projektstruktur

```
portfolio_project/
├── portfolio/                    # Django App
│   ├── __init__.py
│   ├── admin.py                 # Admin Panel Konfiguration
│   ├── apps.py
│   ├── models.py                # ContactMessage Model
│   ├── forms.py                 # ContactForm
│   ├── views.py                 # Views & API Endpoints
│   ├── urls.py                  # URL Routing
│   ├── tests.py
│   ├── settings_template.py     # Settings Vorlage
│   └── templates/
│       ├── index.html           # Haupt-Portfolio Seite
│       ├── contact_form.html    # Formular-Partial (HTMX)
│       └── success.html         # Erfolgs-Seite
├── portfolio_project/
│   ├── __init__.py
│   ├── settings.py              # KONFIGURIEREN!
│   ├── urls.py                  # KONFIGURIEREN!
│   ├── asgi.py
│   └── wsgi.py
├── .env                         # LOKAL - GitHub NICHT committen
├── .gitignore
├── requirements.txt             # Python Dependencies
├── manage.py
├── Procfile                     # Deployment Config
├── runtime.txt                  # Python Version
├── ANLEITUNG_DE.md              # Deutsche Setup-Anleitung
└── SETUP_GUIDE_EN.md            # English Setup Guide
```

## ⚡ Quick Start (5 Minuten)

### 1. Vorbereitung
```bash
# Python 3.10+ installieren: https://python.org
# Git installieren: https://git-scm.com

# Projektordner erstellen und öffnen
mkdir my-portfolio && cd my-portfolio

# Django Projekt initialisieren
django-admin startproject portfolio_project .
python manage.py startapp portfolio
```

### 2. Dateien kopieren
```bash
# Kopiere alle Dateien aus diesem ZIP in die entsprechenden Ordner
# - portfolio/models.py, forms.py, views.py, urls.py, admin.py
# - portfolio/templates/* (alle HTML Dateien)
# - portfolio_project/settings.py und urls.py aktualisieren
```

### 3. Umgebung einrichten
```bash
# Virtual Environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
# oder
venv\Scripts\activate  # Windows

# Abhängigkeiten installieren
pip install -r requirements.txt
```

### 4. Datenbank Setup
```bash
# Migrationen erstellen & anwenden
python manage.py makemigrations portfolio
python manage.py migrate

# Admin-Benutzer erstellen
python manage.py createsuperuser
```

### 5. Testen
```bash
python manage.py runserver
# Öffne http://127.0.0.1:8000
```

## 📚 Vollständige Anleitung

**Deutsch:** Siehe `ANLEITUNG_DE.md` für:
- ✅ Detaillierte lokale Installation
- ✅ Django Settings Konfiguration
- ✅ Email Setup (Gmail)
- ✅ Datenbank Management
- ✅ Deployment auf Railway/Render
- ✅ Custom Domain Setup
- ✅ Fehlerbehebung

**English:** Siehe `SETUP_GUIDE_EN.md`

## 🎨 Features

### Portfolio Seite
- Hero Section mit Gradient
- Skills Übersicht (6 Fähigkeiten)
- Services Katalog (6 Services)
- GitHub Projekte Integration
- Responsive Grid Layouts
- Smooth Scroll Animationen

### Kontaktformular (AJAX)
- Formular-Validierung (Frontend + Backend)
- HTMX für AJAX Requests ohne Page Reload
- JSON Responses für Toast-Benachrichtigungen
- Email-Benachrichtigungen an Admin
- Datenspeicherung in Datenbank
- Fehlerbehandlung

### Admin Panel
- Alle Kontakt-Nachrichten verwalten
- Filtern nach Service-Typ, Budget, Status
- Markiere als gelesen/ungelesen
- Suche nach Name, Email, Nachricht
- Nur für authentifizierte Admins

### Multi-Language Support
- Deutsch, English, Français, العربية
- LocalStorage Persistierung
- RTL Support für Arabisch
- Alle UI Texte übersetzt

## 🔧 Technologie Stack

**Backend:**
- Python 3.12
- Django 4.2
- PostgreSQL (Produktion) / SQLite (Lokal)
- Gunicorn (App Server)
- Whitenoise (Static Files)

**Frontend:**
- HTML5 / Semantic Markup
- Tailwind CSS (Dark Mode)
- HTMX (AJAX Requests)
- Vanilla JavaScript (Translations)

**Infrastructure:**
- Railway.app oder Render.com (Hosting)
- GitHub (Version Control)
- Gmail (Email Notifications)

## 📧 Email Konfiguration

### Gmail Setup (empfohlen)
1. Google Account aktivieren: myaccount.google.com
2. Security → 2-Step Verification
3. Security → App Passwords → erstelle "Mail" App Password
4. `.env` aktualisieren:
```env
EMAIL_HOST_USER=deine@gmail.com
EMAIL_HOST_PASSWORD=xxx-xxx-xxx-xxx
ADMIN_EMAIL=deine@gmail.com
```

**Hinweis:** Verwende App-Passwort, NICHT dein normales Gmail-Passwort!

## 🚀 Deployment

### Option 1: Railway (empfohlen)
```bash
# 1. Push zu GitHub
git init && git add . && git commit -m "Initial"
git push -u origin main

# 2. railway.app öffnen → GitHub verbinden
# 3. Environment Variables setzen
# 4. Fertig! 🎉
```

### Option 2: Render
```bash
# 1. Push zu GitHub (gleich wie Railway)
# 2. render.com öffnen → Web Service erstellen
# 3. Build & Start Commands eingeben
# 4. Fertig! 🎉
```

## ⚙️ Umgebungsvariablen

Lokal (`.env`):
```env
SECRET_KEY=dev-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
EMAIL_HOST_USER=your@gmail.com
EMAIL_HOST_PASSWORD=app-password
ADMIN_EMAIL=your@gmail.com
```

Produktion (Railway/Render):
```env
SECRET_KEY=secure-production-key
DEBUG=False
ALLOWED_HOSTS=www.adib-dev.com,adib-dev.com
EMAIL_HOST_USER=your@gmail.com
EMAIL_HOST_PASSWORD=app-password
ADMIN_EMAIL=your@gmail.com
DATABASE_URL=provided-by-platform
```

## 🛠️ Wichtige Befehle

```bash
# Migrations
python manage.py makemigrations
python manage.py migrate
python manage.py migrate --fake-initial

# Admin
python manage.py createsuperuser
python manage.py changepassword username

# Server
python manage.py runserver
python manage.py runserver 8001

# Debug
python manage.py shell
python manage.py dbshell

# Static Files
python manage.py collectstatic --noinput

# Production
gunicorn portfolio_project.wsgi:application
```

## 🐛 Fehlerbehebung

| Problem | Lösung |
|---------|--------|
| ModuleNotFoundError | `pip install -r requirements.txt` |
| No migrations | `python manage.py makemigrations portfolio` |
| Static files not found | `python manage.py collectstatic --noinput` |
| Email wird nicht gesendet | Gmail App-Passwort verwenden, 2FA aktivieren |
| Database locked | `rm db.sqlite3` (lokal nur) |
| Port 8000 in Benutzung | `python manage.py runserver 8001` |

## 📖 Dokumentation

- Django Docs: https://docs.djangoproject.com
- Tailwind CSS: https://tailwindcss.com
- HTMX: https://htmx.org
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

## 🤝 Support

Probleme beim Setup?
1. Überprüfe `ANLEITUNG_DE.md` oder `SETUP_GUIDE_EN.md`
2. Schau unter "Häufige Fehler"
3. Überprüfe die Python Version: `python --version`
4. Überprüfe pip: `pip --version`

## 📝 Lizenz

Dieses Projekt ist für persönliche Nutzung freigegeben.

---

**Viel Erfolg beim Deployment! 🚀**

Fragen? Schreib an: hello@adib-dev.com

Weitere Infos: https://adib-dev.com
