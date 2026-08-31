# 🎯 Adib Portfolio - Full-Stack Web Application

> Modern Portfolio & Contact Management System built with Django + Next.js

## 📋 Overview

A professional full-stack application showcasing projects and managing client inquiries with integrated email notifications and CORS/CSRF security.

**Technology Stack:**
- **Backend:** Django 4.2.8 + Django REST Framework
- **Frontend:** Next.js 16.3.3 (React 19)
- **Database:** PostgreSQL (Production) / SQLite (Development)
- **API:** RESTful with CORS & CSRF protection
- **Email:** SMTP with retry mechanism

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (Production)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

**Backend runs on:** http://localhost:8000

### Frontend Setup

```bash
cd frontend
npm install

# Configure environment
cp .env.example .env.local

# Start development server
npm run dev
```

**Frontend runs on:** http://localhost:3000

---

## 📁 Project Structure

```
adib-portfolio/
├── backend/                      # Django Application
│   ├── config/                   # Project settings
│   │   ├── settings.py           # Main configuration
│   │   ├── urls.py               # URL routing
│   │   ├── asgi.py               # ASGI configuration
│   │   └── wsgi.py               # WSGI configuration
│   ├── api/                      # Main API app
│   │   ├── models.py             # Data models
│   │   ├── views.py              # API views & email logic
│   │   ├── serializers.py        # DRF serializers
│   │   ├── urls.py               # API endpoints
│   │   └── admin.py              # Django admin config
│   ├── manage.py                 # Django CLI
│   ├── requirements.txt          # Python dependencies
│   ├── pytest.ini                # Test configuration
│   ├── conftest.py               # Pytest fixtures
│   └── tests_complete_portfolio.py # Test suite (72 tests)
│
├── frontend/                     # Next.js Application
│   ├── app/                      # Next.js app directory
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── contact/
│   │       └── page.tsx          # Contact page
│   ├── components/               # React components
│   │   ├── Navbar.tsx            # Navigation
│   │   ├── ContactForm.tsx       # Contact form (with CORS/CSRF fixes)
│   │   ├── Hero.tsx              # Hero section
│   │   ├── About.tsx             # About section
│   │   ├── Services.tsx          # Services section
│   │   ├── Projects.tsx          # Projects section
│   │   ├── Footer.tsx            # Footer
│   │   └── Contact.tsx           # Contact section
│   ├── lib/                      # Utilities
│   │   ├── translations.ts       # i18n translations (DE/EN)
│   │   └── useTranslation.ts     # Translation hook
│   ├── public/                   # Static assets
│   ├── next.config.ts            # Next.js configuration
│   ├── tsconfig.json             # TypeScript config
│   ├── package.json              # NPM dependencies
│   └── .env.local                # Environment variables
│
├── .gitignore                    # Git ignore rules
├── .env.example                  # Example environment file
└── README.md                     # This file
```

---

## 🔧 Environment Configuration

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://user:password@localhost/adib_portfolio

# CORS & CSRF
CORS_ALLOWED_ORIGINS=http://localhost:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Email (Development)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend

# Email (Production)
# EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_HOST_USER=your-email@gmail.com
# EMAIL_HOST_PASSWORD=your-app-password
# EMAIL_USE_TLS=True

CONTACT_EMAIL=tadib24@gmail.com
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_EMAIL=tadib24@gmail.com
```

---

## ✨ Key Features

### Backend
- ✅ **REST API** - Fully documented with DRF Spectacular
- ✅ **Contact Submissions** - Store & manage inquiries
- ✅ **Email Notifications** - Automatic admin & user emails
- ✅ **CORS Protection** - Secure cross-origin requests
- ✅ **CSRF Protection** - Token-based security
- ✅ **Rate Limiting** - 5 submissions per hour per IP
- ✅ **Input Validation** - XSS & SQL injection protection
- ✅ **Error Handling** - Comprehensive error responses

### Frontend
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Client-side Validation** - Real-time form validation
- ✅ **CORS/CSRF Handling** - Credentials & token management
- ✅ **Error Messages** - User-friendly error feedback
- ✅ **Bilingual (DE/EN)** - German & English support
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Modern styling

---

## 🧪 Testing

### Run All Tests (72 tests)
```bash
cd backend
pytest tests_complete_portfolio.py -v
```

### Test Categories
- **CORS Configuration** (9 tests)
- **CSRF Protection** (7 tests)
- **API Endpoints** (7 tests)
- **Email Handling** (14 tests)
- **Error Handling** (9 tests)
- **Frontend/Backend Integration** (5 tests)
- **Configuration** (5 tests)
- **Rate Limiting** (3 tests)
- **Input Validation** (8 tests)
- **Integration** (3 tests)

### Coverage Report
```bash
pytest --cov=. --cov-report=html
```
Open `htmlcov/index.html` to view coverage

---

## 📧 Email System

### Development
Emails are printed to console (Console Backend).

### Production
Configured to send via Gmail SMTP:
1. Create Gmail App Password (2FA required)
2. Set `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` in .env
3. Deploy with `EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend`

### Email Flow
1. User submits form → Frontend sends to `/api/submissions/`
2. Backend saves & validates data
3. ViewSet triggers `perform_create()` → calls `send_contact_emails()`
4. **Admin Email:** All details to tadib24@gmail.com
5. **User Confirmation:** Acknowledgment to user

---

## 🔐 Security

| Feature | Status |
|---------|--------|
| CORS Protection | ✅ Configured |
| CSRF Tokens | ✅ Enabled |
| HTTPS Ready | ✅ Production-ready |
| Input Validation | ✅ Client & Server |
| SQL Injection | ✅ ORM Protection |
| XSS Prevention | ✅ Template escaping |
| Rate Limiting | ✅ 5/hour per IP |
| Secure Headers | ✅ Configured |

---

## 🚢 Deployment

### Backend (Gunicorn + Django)
```bash
pip install gunicorn
gunicorn config.wsgi:application --workers 4
```

### Frontend (Vercel/Next.js)
```bash
npm run build
npm run start
```

### Docker (Optional)
```bash
docker-compose up -d
```

---

## 📊 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/submissions/` | GET | List all submissions |
| `/api/submissions/` | POST | Create new submission (triggers emails) |
| `/api/submissions/{id}/` | GET | Get submission details |
| `/api/submissions/{id}/` | PATCH | Update submission |
| `/api/submissions/{id}/` | DELETE | Delete submission |

---

## 🛠️ Development Commands

### Backend
```bash
# Run server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Access admin panel
# http://localhost:8000/admin

# Run tests with coverage
pytest --cov=. --cov-report=html
```

### Frontend
```bash
# Development server
npm run dev

# Build production
npm run build

# Production server
npm run start

# Lint
npm run lint
```

---

## 📝 Git Workflow

```bash
# Clone repository
git clone https://github.com/adib-dev/adib-portfolio.git
cd adib-portfolio

# Create feature branch
git checkout -b feature/feature-name

# Make changes & commit
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/feature-name

# Create Pull Request on GitHub
```

---

## 🐛 Known Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Failed to fetch" in Frontend | CORS not configured, check settings.CORS_ALLOWED_ORIGINS |
| CSRF token errors | Ensure `credentials: 'include'` in fetch, X-CSRFToken header |
| Emails not sending | Check EMAIL_BACKEND, CONTACT_EMAIL, SMTP credentials |
| Database errors | Run `python manage.py migrate` |

---

## 📚 Documentation

- **API Docs:** http://localhost:8000/api/docs/ (Swagger UI)
- **API Schema:** http://localhost:8000/api/schema/ (OpenAPI)
- **Admin Panel:** http://localhost:8000/admin/

---

## 👤 Author

**Adib Tajouri**
- Email: tadib24@gmail.com
- Portfolio: http://localhost:3000
- GitHub: [adib-dev](https://github.com/adib-dev)

---

## 📄 License

MIT License - See LICENSE file for details

---

## ✅ Checklist for Production

- [ ] Set `DEBUG=False`
- [ ] Configure production `SECRET_KEY`
- [ ] Setup PostgreSQL database
- [ ] Configure email SMTP
- [ ] Enable HTTPS/SSL
- [ ] Setup allowed domains in `ALLOWED_HOSTS`
- [ ] Configure static files with CDN
- [ ] Setup monitoring & logging
- [ ] Run security checks (`python manage.py check --deploy`)
- [ ] Run tests & verify coverage
- [ ] Setup CI/CD pipeline
- [ ] Backup database strategy

---

**Last Updated:** August 31, 2026
**Version:** 1.0.0
**Status:** ✅ Production Ready
