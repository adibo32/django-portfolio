from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.mail import EmailMessage
from django.conf import settings

from .models import ContactMessage
from .forms import ContactForm


def index(request):
    """Main portfolio page"""
    return render(request, 'portfolio/index.html')


@require_http_methods(["POST"])
def submit_contact_form(request):
    """
    Handle contact form submission (HTMX/AJAX)
    Returns JSON response for HTMX to update UI
    """
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # AJAX request
        try:
            form = ContactForm(request.POST)
            if form.is_valid():
                contact_message = form.save()
                return JsonResponse({
                    'status': 'success',
                    'message': 'Danke für deine Anfrage! Ich melde mich schnellstmöglich bei dir.',
                    'id': contact_message.id,
                })
            else:
                errors = {field: error for field, error in form.errors.items()}
                return JsonResponse({
                    'status': 'error',
                    'errors': errors,
                }, status=400)
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': f'Fehler: {str(e)}'
            }, status=500)
    else:
        # Standard form submission
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'portfolio/success.html', {
                'name': form.cleaned_data['name']
            })
        else:
            return render(request, 'portfolio/index.html', {
                'form': form,
                'errors': form.errors
            })


def contact_form_partial(request):
    """Return contact form HTML (for HTMX)"""
    form = ContactForm()
    return render(request, 'portfolio/contact_form.html', {'form': form})


def api_projects(request):
    """API endpoint for GitHub projects (could be enhanced)"""
    projects = [
        {
            'id': 1,
            'title': 'Odoo Construction ERP Module',
            'description': 'Custom Odoo 16 Module für Bauprojekt-Management. Multi-Company-fähig mit automatisierten Workflows.',
            'url': 'https://github.com/adibo32/odoo-construction-Project',
            'tags': ['Odoo 16', 'Python 3.12', 'PostgreSQL'],
            'category': 'odoo',
        },
        {
            'id': 2,
            'title': 'Django Reservation System',
            'description': 'Vollständiges Django-basiertes Reservierungs-System mit Real-time Verfügbarkeitsprüfung.',
            'url': 'https://github.com/adibo32/reservation',
            'tags': ['Django', 'REST API', 'Celery'],
            'category': 'django',
        },
        {
            'id': 3,
            'title': 'Multilingual Translation System',
            'description': 'Flask-basiertes Übersetzungs-Management-System mit automatisierter Lokalisierung.',
            'url': 'https://github.com/adibo32/translate',
            'tags': ['Flask', 'API Integration', 'i18n'],
            'category': 'flask',
        },
    ]
    return JsonResponse({'projects': projects})
