# 📚 Django Portfolio - Complete Setup Guide (English)

## Contents
1. [Local Installation](#local-installation)
2. [Project Setup](#project-setup)
3. [Database & Migrations](#database--migrations)
4. [Local Testing](#local-testing)
5. [Deployment to Railway/Render](#deployment-to-railwayrender)
6. [Custom Domain Setup](#custom-domain-setup)
7. [Email Configuration](#email-configuration)

---

## Local Installation

### Prerequisites
- Python 3.10 or higher: [python.org](https://python.org)
- Git: [git-scm.com](https://git-scm.com)
- pip (comes with Python)

### Step 1: Prepare Project

```bash
# Navigate to your project folder
cd your-project-folder

# Create Django project
django-admin startproject portfolio_project .

# Create portfolio app
python manage.py startapp portfolio
```

### Step 2: Copy Files

Copy these files from the ZIP into the `portfolio` folder:
- `models.py`
- `forms.py`
- `views.py`
- `urls.py`
- `templates/` (all HTML files)

### Step 3: Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Project Setup

### Step 1: Update Main Project URLs

Open `portfolio_project/urls.py` and replace with:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio.urls')),  # All URLs from portfolio app
]
```

### Step 2: Update Django Settings

Open `portfolio_project/settings.py` and update:

```python
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

# Secrets - CHANGE THESE!
SECRET_KEY = config('SECRET_KEY', default='dev-insecure-key-change-this')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=lambda v: [s.strip() for s in v.split(',')])

# INSTALLED_APPS - Add 'portfolio'
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'portfolio',  # ← ADD THIS
]

# TEMPLATES - Update DIRS
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # ← CHANGE THIS
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

# Email - Gmail Example
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Admin Email for notifications
ADMIN_EMAIL = config('ADMIN_EMAIL', default='your@email.com')
```

### Step 3: Create .env File

Create a `.env` file in root directory (next to manage.py):

```env
# Local only - CHANGE for production
SECRET_KEY=django-insecure-change-me-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Email Configuration (Gmail)
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ADMIN_EMAIL=your-email@gmail.com
```

**Important for Gmail:**
1. Go to myaccount.google.com
2. Security → Enable Two-Factor Authentication
3. Security → Create App Password
4. Use "App Password" in .env (NOT your regular password!)

---

## Database & Migrations

### Step 1: Create Migrations

```bash
python manage.py makemigrations portfolio
```

### Step 2: Apply to Database

```bash
python manage.py migrate
```

### Step 3: Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

Follow the prompts:
- Username: `admin` (or your name)
- Email: `your@email.com`
- Password: `secure-password`

---

## Local Testing

### Start Development Server

```bash
python manage.py runserver
```

**Open in browser:**
- Portfolio: http://127.0.0.1:8000/
- Admin Panel: http://127.0.0.1:8000/admin/ (login with superuser)

### Test Contact Form

1. Scroll to Contact Section
2. Fill in: Name, Email, Service Type, Message
3. Submit the form
4. You should:
   - See success message
   - Receive an email (if configured correctly)
   - See the message in Admin Panel (http://127.0.0.1:8000/admin/portfolio/contactmessage/)

---

## Deployment to Railway/Render

### Option 1: Railway.app (Recommended)

#### Prerequisites
- GitHub account with this project as repository
- Railway account: [railway.app](https://railway.app)

#### Step 1: Push to GitHub

```bash
# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial commit: Django Portfolio"

# Create repo on github.com and push
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Railway

1. Go to [railway.app](https://railway.app)
2. Login/Register
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `portfolio` repository
5. Railway will auto-detect Django setup

#### Step 3: Set Environment Variables

In Railway Dashboard under "Variables":

```
SECRET_KEY=create-a-secure-secret-key
DEBUG=False
ALLOWED_HOSTS=your-railway-domain.up.railway.app,www.adib-dev.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ADMIN_EMAIL=your-email@gmail.com
DB_ENGINE=postgresql
DATABASE_URL=provided-by-railway
```

#### Step 4: Add Database

1. In Railway Project Dashboard: "+ New" → PostgreSQL
2. Railway auto-adds `DATABASE_URL`
3. Migrations run automatically

#### Step 5: Configure Domain

In Railway Dashboard:
1. Go to service
2. "Settings" → "Domains"
3. Add your domain: `www.adib-dev.com`

---

### Option 2: Render.com

#### Step 1: Connect GitHub

1. Go to [render.com](https://render.com)
2. Sign up/login with GitHub
3. "New +" → "Web Service"
4. Select your Portfolio repository

#### Step 2: Set Build Commands

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

#### Step 3: Environment Setup

```
SECRET_KEY=create-a-secure-secret-key
DEBUG=False
ALLOWED_HOSTS=your-render-domain.onrender.com,www.adib-dev.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ADMIN_EMAIL=your-email@gmail.com
DATABASE_URL=provided-by-render
```

---

## Custom Domain Setup

### Buy Domain

Options:
- **Namecheap.com** (cheap, $0.99/year)
- **Domains.google.com** (simple)
- **GoDaddy.com** (popular)

Purchase: `adib-dev.com`

### Connect Domain to Railway/Render

#### Railway:
1. Railway Dashboard → Project → "Settings" → "Domains"
2. Click "Add Custom Domain"
3. Enter `www.adib-dev.com`
4. Railway shows CNAME value

#### Render:
1. Web Service → "Settings" → "Custom Domains"
2. Click "Add a Custom Domain"
3. Enter `www.adib-dev.com`
4. Render shows CNAME value

### Update DNS Records

In your domain registrar (e.g., Namecheap):

1. "Manage Domain" → "DNS"
2. Add a **CNAME Record**:
   - Name: `www`
   - Value: `CNAME-from-railway-or-render`
   - TTL: 3600

3. Optional - Root Domain: Add A-Record (see Railway/Render docs)

**Wait:** 10-30 minutes for DNS to propagate

---

## Email Configuration

### Gmail Setup (Recommended)

1. **Enable Two-Factor Auth:**
   - Google Account: myaccount.google.com
   - Security → 2-Step Verification

2. **Create App Password:**
   - Google Account → Security
   - App passwords (bottom)
   - Select App: "Mail"
   - Select Device: "Windows/Mac/Linux"
   - Copy the 16-character password

3. **Update .env:**
   ```
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=xxxxxxxxxx
   ADMIN_EMAIL=your-email@gmail.com
   ```

4. **Test:**
   ```bash
   python manage.py shell
   >>> from django.core.mail import send_mail
   >>> send_mail('Test', 'Test Email', 'from@gmail.com', ['to@example.com'])
   1  # 1 = success
   ```

---

## Common Errors

### 1. "ModuleNotFoundError: No module named 'portfolio'"
**Solution:** Re-run `pip install -r requirements.txt`

### 2. "No migrations"
**Solution:**
```bash
python manage.py makemigrations portfolio
python manage.py migrate
```

### 3. "Static files not found"
**Solution:**
```bash
python manage.py collectstatic --noinput
```

### 4. "Email not sending"
**Solution:**
- Use Gmail App Password (NOT your regular password)
- Enable Two-Factor Authentication
- Verify .env values
- Test in Django Admin (see Email Configuration above)

### 5. "Debug mode issue"
**In production ALWAYS:**
```
DEBUG=False
```

---

## Important Commands

```bash
# Migrations
python manage.py makemigrations
python manage.py migrate

# Superuser
python manage.py createsuperuser

# Server
python manage.py runserver

# Shell (Debug)
python manage.py shell

# Static files
python manage.py collectstatic --noinput

# Change port
python manage.py runserver 8001
```

---

## Support & Next Steps

✅ **Done!** Your portfolio is running.

**Next Steps:**
1. Check contact messages in Admin Panel
2. Test email by submitting form
3. Complete Custom Domain Setup
4. Share portfolio URL on social media

---

**Questions?** Write to: hello@adib-dev.com (soon your email)

Good luck! 🚀
