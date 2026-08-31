# 🚀 Django Portfolio - Full-Stack Web Application

Eine moderne, produktionsreife Portfolio-Website mit integriertem Kontaktformular und Admin-Panel.

**Live Demo:** [adib-dev.com](https://adib-dev.com)  
**GitHub:** [adibo32/django-portfolio](https://github.com/adibo32/django-portfolio)  
**Kontakt:** hello@adib-dev.com

---

## ✨ Features

### 🎨 Portfolio-Showcase
- Hero Section mit Gradient-Design
- Skills & Services Übersicht
- GitHub Projekte Integration
- Responsive Grid Layouts
- Smooth Scroll Animationen

### 📧 Kontaktformular
- AJAX/HTMX Requests (kein Page Reload)
- Frontend + Backend Validierung
- JSON Responses mit Toast-Benachrichtigungen
- Email-Benachrichtigungen an Admin
- Datenspeicherung in Datenbank
- Rate Limiting (Spam-Schutz)

### 🔐 Admin Panel
- Django Admin für Kontakt-Verwaltung
- Filter nach Service-Typ, Budget, Status
- Markiere als gelesen/ungelesen
- Suchfunktion nach Name, Email, Nachricht
- Nur für authentifizierte Admins

### 🌍 Mehrsprachig
- Deutsch, English, Français, العربية
- LocalStorage Persistierung
- RTL Support für Arabisch
- Alle UI Texte übersetzt

### 🎨 Dark Mode
- Tailwind CSS mit Dark Mode
- System-Erkennung
- Toggle im Header

---

## 🛠 Tech Stack

| Layer | Technologie |
|-------|------------|
| **Backend** | Python 3.12, Django 4.2, Django REST Framework |
| **Datenbank** | SQLite (lokal), PostgreSQL (Produktion) |
| **Frontend** | HTML5, Tailwind CSS, HTMX, Vanilla JS |
| **Email** | Gmail SMTP mit Retry-Mechanismus |
| **Server** | Gunicorn, Whitenoise |
| **Hosting** | Railway.app oder Render.com |
| **Version Control** | GitHub |

---

## ⚡ Quick Start (5 Minuten)

### 1️⃣ Voraussetzungen
- Python 3.10+ ([Download](https://python.org))
- Git ([Download](https://git-scm.com))
- Virtual Environment

### 2️⃣ Repository klonen
```bash
git clone https://github.com/adibo32/django-portfolio.git
cd django-portfolio
```

### 3️⃣ Virtual Environment erstellen
```bash
# macOS/Linux
python -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### 4️⃣ Dependencies installieren
```bash
pip install -r requirements.txt
```

### 5️⃣ .env Datei erstellen
```bash
# Kopiere .env.example und passe an
cp .env.example .env
```

Inhalt von `.env`:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Email Setup (Gmail)
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ADMIN_EMAIL=your-email@gmail.com

# Datenbank (optional lokal)
DATABASE_URL=sqlite:///db.sqlite3
```

### 6️⃣ Datenbank Setup
```bash
python manage.py migrate
python manage.py createsuperuser
```

### 7️⃣ Entwicklungsserver starten
```bash
python manage.py runserver
```

Öffne: **http://127.0.0.1:8000**  
Admin Panel: **http://127.0.0.1:8000/admin**

---

## 📚 Vollständige Anleitung

### Django Settings konfigurieren

**Datei:** `portfolio_project/settings.py`

```python
# 1. ALLOWED_HOSTS aktualisieren
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'your-domain.com']

# 2. Email Konfiguration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')

# 3. Datenbank (Produktion)
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),
        conn_max_age=600
    )
}
```

### Gmail App-Passwort erstellen

1. Gehe zu [myaccount.google.com](https://myaccount.google.com)
2. Aktiviere **2-Step Verification** (falls noch nicht aktiviert)
3. Gehe zu **Security → App Passwords**
4. Wähle "Mail" und "Windows Computer"
5. Kopiere das generierte Passwort
6. Speichere in `.env`:
   ```env
   EMAIL_HOST_PASSWORD=xxxx-xxxx-xxxx-xxxx
   ```

### Migrationen erstellen

```bash
# Neue Migrations-Dateien erstellen
python manage.py makemigrations portfolio

# Migrationen ausführen
python manage.py migrate

# Bei bestehender Datenbank:
python manage.py migrate --fake-initial
```

### Admin-Benutzer verwalten

```bash
# Neuen Admin erstellen
python manage.py createsuperuser

# Passwort ändern
python manage.py changepassword admin
```

---

## 🚀 Deployment

### Option 1: Railway (empfohlen ⭐)

**Voraussetzungen:**
- GitHub Account
- Railway Account ([railway.app](https://railway.app))

**Schritte:**

1. **Git Setup**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Railway verbinden**
   - Öffne [railway.app](https://railway.app)
   - Klicke "New Project"
   - Wähle "Deploy from GitHub"
   - Authorisiere & wähle Repository

3. **Environment Variables setzen**
   ```
   SECRET_KEY=secure-random-key
   DEBUG=False
   ALLOWED_HOSTS=your-railway-url.railway.app
   EMAIL_HOST_USER=your@gmail.com
   EMAIL_HOST_PASSWORD=app-password
   ADMIN_EMAIL=your@gmail.com
   ```

4. **Deployment starten**
   - Railway deployed automatisch
   - Warte auf "SUCCESS" Status

5. **Datenbank Setup**
   ```bash
   # SSH in Railway
   python manage.py migrate
   python manage.py createsuperuser
   ```

**Custom Domain:**
- Railway → Project Settings → Domains
- Füge `your-domain.com` hinzu
- Aktualisiere DNS Records gemäß Railway-Anleitung

### Option 2: Render

**Schritte:**

1. Push zu GitHub (wie Railway)

2. Öffne [render.com](https://render.com)
   - Klicke "New +" → "Web Service"
   - Wähle GitHub Repository

3. Build & Start Commands
   ```bash
   # Build Command
   pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
   
   # Start Command
   gunicorn portfolio_project.wsgi:application
   ```

4. Environment Variables eingeben (wie Railway)

5. Deploy!

### Option 3: Heroku (klassisch)

```bash
# Heroku CLI installieren
brew install heroku  # macOS
# oder Windows/Linux: heroku.com/apps

# Login
heroku login

# App erstellen
heroku create your-app-name

# Environment Variables
heroku config:set SECRET_KEY=your-key
heroku config:set DEBUG=False
heroku config:set EMAIL_HOST_USER=your@gmail.com
heroku config:set EMAIL_HOST_PASSWORD=app-password

# Deploy
git push heroku main

# Datenbank Setup
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

---

## 📁 Projektstruktur

```
django-portfolio/
├── portfolio/                    # Django App
│   ├── models.py                # ContactMessage, EmailLog Models
│   ├── views.py                 # Views & API Endpoints
│   ├── forms.py                 # ContactForm Validierung
│   ├── admin.py                 # Admin Panel Konfiguration
│   ├── urls.py                  # URL Routing
│   ├── templates/
│   │   ├── base.html            # Base Template
│   │   ├── index.html           # Portfolio Seite
│   │   └── contact_form.html    # Formular (HTMX)
│   └── static/
│       ├── css/
│       │   ├── tailwind.css
│       │   └── custom.css
│       ├── js/
│       │   ├── translations.js
│       │   └── script.js
│       └── images/
├── portfolio_project/
│   ├── settings.py              # Django Settings
│   ├── urls.py                  # Root URL Config
│   ├── asgi.py
│   └── wsgi.py
├── .env                         # Environment Variables (lokal)
├── .env.example                 # .env Template
├── .gitignore
├── requirements.txt             # Python Dependencies
├── Procfile                     # Deployment Config
├── runtime.txt                  # Python Version
├── manage.py
└── README.md
```

---

## 🔧 Wichtige Befehle

### Datenbank
```bash
python manage.py makemigrations portfolio    # Neue Migrationen erstellen
python manage.py migrate                      # Migrationen ausführen
python manage.py migrate --fake-initial       # Bestehende DB "faken"
python manage.py dbshell                      # DB Shell öffnen
```

### Admin
```bash
python manage.py createsuperuser              # Neuen Admin erstellen
python manage.py changepassword admin         # Passwort ändern
python manage.py shell                        # Django Shell
```

### Server
```bash
python manage.py runserver                    # Auf localhost:8000
python manage.py runserver 8001               # Auf eigenem Port
gunicorn portfolio_project.wsgi:application   # Production Server
```

### Static Files
```bash
python manage.py collectstatic --noinput      # Für Produktion
```

### Debugging
```bash
python manage.py shell_plus                   # Mit IPython (django-extensions)
python -m pdb manage.py runserver             # Mit Debugger
```

---

## 📧 Email Konfiguration

### Gmail (empfohlen)

1. **2-Factor Authentication aktivieren**
   - [myaccount.google.com](https://myaccount.google.com)
   - Security → 2-Step Verification

2. **App-Passwort erstellen**
   - Security → App passwords
   - Wähle "Mail" & "Windows Computer"
   - Kopiere 16-stelliges Passwort

3. **.env aktualisieren**
   ```env
   EMAIL_HOST_USER=your@gmail.com
   EMAIL_HOST_PASSWORD=xxxx-xxxx-xxxx-xxxx
   ADMIN_EMAIL=your@gmail.com
   ```

### Andere Email-Provider

**SendGrid:**
```python
EMAIL_BACKEND = 'sendgrid_django.SendgridBackend'
SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
```

**AWS SES:**
```python
EMAIL_BACKEND = 'django_ses.SESBackend'
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_SES_REGION_NAME = 'eu-west-1'
```

---

## 🐛 Fehlerbehebung

| Problem | Lösung |
|---------|--------|
| `ModuleNotFoundError: No module named 'django'` | `pip install -r requirements.txt` |
| `No migrations detected` | `python manage.py makemigrations portfolio` |
| `Static files not found (404)` | `python manage.py collectstatic --noinput` |
| Email wird nicht gesendet | ✅ Gmail App-Passwort verwenden ✅ 2FA aktivieren ✅ ALLOW_LESS_SECURE einschalten |
| `Port 8000 already in use` | `python manage.py runserver 8001` |
| Database is locked | `rm db.sqlite3` (nur lokal!) |
| CSRF token missing | Stelle sicher, dass `{% csrf_token %}` im Form ist |
| CORS Fehler (Frontend) | Konfiguriere `CORS_ALLOWED_ORIGINS` in settings.py |

### Logs in der Produktion überprüfen

**Railway:**
```bash
railway logs
```

**Render:**
```bash
Klicke auf deine Web Service → Logs Tab
```

**Heroku:**
```bash
heroku logs --tail
```

---

## 🔒 Sicherheit

### Checklist für Production

- [ ] `DEBUG = False` in settings.py
- [ ] `SECRET_KEY` in Environment Variables (nicht im Code!)
- [ ] `ALLOWED_HOSTS` aktualisiert
- [ ] HTTPS aktiviert
- [ ] CORS korrekt konfiguriert
- [ ] Rate Limiting aktiviert
- [ ] Admin URL geändert (nicht `/admin/`)
- [ ] Regelmäßige Backups
- [ ] Dependencies regelmäßig updaten

### Wichtige Security-Header

```python
# settings.py
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_SECURITY_POLICY = { ... }
```

---

## 📈 Performance-Tipps

1. **Datenbank-Indizes**
   ```python
   class ContactMessage(models.Model):
       created_at = models.DateTimeField(auto_now_add=True, db_index=True)
   ```

2. **Caching**
   ```python
   from django.views.decorators.cache import cache_page
   
   @cache_page(60 * 5)  # 5 Minuten
   def portfolio_view(request):
       ...
   ```

3. **QuerySet Optimierung**
   ```python
   # ❌ Falsch: N+1 Problem
   for message in ContactMessage.objects.all():
       print(message.user.name)
   
   # ✅ Richtig: select_related
   messages = ContactMessage.objects.select_related('user')
   ```

4. **Lazy Loading & CDN**
   - Bilder komprimieren
   - CDN für Static Files (z.B. Cloudflare)
   - Minify CSS/JS

---

## 🤝 Beitragen

Contributions sind willkommen! 

**Schritte:**
1. Fork das Repository
2. Feature Branch erstellen: `git checkout -b feature/my-feature`
3. Änderungen committen: `git commit -m 'Add my feature'`
4. Push zu Branch: `git push origin feature/my-feature`
5. Pull Request öffnen

---

## 📝 Lizenz

Dieses Projekt ist MIT lizenziert — siehe [LICENSE](LICENSE) Datei für Details.

---

## 📖 Weitere Ressourcen

- **Django Docs:** https://docs.djangoproject.com
- **Django REST:** https://www.django-rest-framework.org
- **Tailwind CSS:** https://tailwindcss.com
- **HTMX:** https://htmx.org
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs

---

## 💬 Support & Kontakt

**Probleme?** 
- Öffne ein [GitHub Issue](https://github.com/adibo32/django-portfolio/issues)
- Email: hello@adib-dev.com
- Website: [adib-dev.com](https://adib-dev.com)

**Folge mir:**
- GitHub: [@adibo32](https://github.com/adibo32)
- LinkedIn: [Adib Tajouri](https://linkedin.com/in/adib-tajouri)

---

## ⭐ Star geben?

Wenn dir das Projekt gefällt, gib einen Star! ⭐  
Das hilft anderen, das Projekt zu finden.

---

**Made with ❤️ by [Adib Tajouri](https://adib-dev.com)**

---

## Changelog

### v1.0.0 (2026-08-31)
- ✅ Initiale Release
- ✅ Portfolio-Showcase
- ✅ Kontaktformular mit Email
- ✅ Admin Panel
- ✅ Mehrsprachigkeit (DE, EN, FR, AR)
- ✅ Dark Mode
- ✅ Production-Ready Deployment
