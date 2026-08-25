# ⚡ Django Portfolio - Quick Start (5 Minuten)

## Projektstruktur

```
portfolio/                          ← Dein Projekt Root
├── manage.py                       ✅ Bereits vorhanden
├── db.sqlite3                      (wird erstellt nach migrate)
├── requirements.txt                ✅ Bereits vorhanden
├── .env.example → .env             ✅ Copy & customize
├── .gitignore                      ✅ Bereits vorhanden
├── Procfile                        ✅ Deployment
├── runtime.txt                     ✅ Python Version
│
├── portfolio_project/              ✅ Project Package
│   ├── __init__.py
│   ├── settings.py                 ✅ Bereits konfiguriert!
│   ├── urls.py                     ✅ Bereits konfiguriert!
│   ├── wsgi.py                     ✅ Bereits vorhanden
│   └── asgi.py                     ✅ Bereits vorhanden
│
├── portfolio/                      ✅ Django App
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py                   ✅ ContactMessage Model
│   ├── forms.py                    ✅ ContactForm
│   ├── views.py                    ✅ 4 Views
│   ├── urls.py                     ✅ URL Routing
│   ├── admin.py                    ✅ Admin Config
│   ├── tests.py
│   ├── migrations/
│   │   └── __init__.py
│   └── templates/
│       ├── index.html              ✅ Portfolio Seite
│       ├── contact_form.html       ✅ Form Partial
│       └── success.html            ✅ Success Page
│
├── static/                         (wird nach collectstatic gefüllt)
├── staticfiles/                    (Produktion)
│
└── Dokumentation:
    ├── QUICK_START.md              ← DU BIST HIER
    ├── README.md                   ← Übersicht
    ├── ANLEITUNG_DE.md             ← Detailliert (Deutsch)
    └── SETUP_GUIDE_EN.md           ← Detailliert (English)
```

**ALLES ist bereits konfiguriert! ✅**

---

## 🚀 Installation (Copy-Paste)

### 1. Virtual Environment

**Windows:**
```powershell
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Dependencies installieren

```bash
pip install -r requirements.txt
```

### 3. .env erstellen

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

**Bearbeite `.env`** (E-Mail eintragen):
```env
SECRET_KEY=django-insecure-change-me
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Gmail Setup: https://myaccount.google.com/security
EMAIL_HOST_USER=deine-email@gmail.com
EMAIL_HOST_PASSWORD=dein-app-passwort
ADMIN_EMAIL=deine-email@gmail.com
```

### 4. Datenbank erstellen

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Admin-Benutzer erstellen

```bash
python manage.py createsuperuser
```

Eingeben:
- Username: `admin`
- Email: `deine@email.com`
- Password: `dein-passwort`

### 6. Server starten

```bash
python manage.py runserver
```

**Öffne im Browser:**
- Portfolio: http://127.0.0.1:8000
- Admin: http://127.0.0.1:8000/admin

---

## ✅ Test-Checklist

- [ ] Portfolio lädt unter http://127.0.0.1:8000
- [ ] Admin Panel unter http://127.0.0.1:8000/admin (Username: admin)
- [ ] Kontaktformular ausfüllen und absenden
- [ ] Email angekommen? (Check Spam!)
- [ ] Nachricht im Admin Panel sichtbar?
- [ ] Success-Seite nach Formular-Abschicken?

---

## 📚 Weitere Hilfe

| Frage | Datei |
|-------|-------|
| Wie funktioniert alles? | `README.md` |
| Schritt-für-Schritt Setup | `ANLEITUNG_DE.md` |
| Deployment (Railway/Render) | `ANLEITUNG_DE.md` Kapitel 5 |
| Custom Domain (adib-dev.com) | `ANLEITUNG_DE.md` Kapitel 6 |
| Email-Probleme | `ANLEITUNG_DE.md` Kapitel 7 |
| English Guide | `SETUP_GUIDE_EN.md` |

---

## 🆘 Häufige Fehler

| Error | Lösung |
|-------|--------|
| "manage.py not found" | Stelle sicher, dass du im Root-Verzeichnis bist |
| "Module not found" | `pip install -r requirements.txt` erneut ausführen |
| "No migrations" | `python manage.py makemigrations` |
| "Port 8000 in use" | `python manage.py runserver 8001` |
| "Email wird nicht gesendet" | Gmail App-Passwort verwenden (NICHT normales Passwort!) |

---

## 🎉 Fertig!

Dein Django Portfolio läuft jetzt lokal. Nächste Schritte:

1. ✅ Lokale Tests abschließen
2. ✅ GitHub Repository erstellen
3. ✅ Auf Railway/Render deployen
4. ✅ Custom Domain verbinden

Siehe `ANLEITUNG_DE.md` für Deployment-Anleitung!

---

**Viel Erfolg! 🚀**
