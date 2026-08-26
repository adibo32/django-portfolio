from django.db import models
from django.core.validators import EmailValidator, MinLengthValidator

class ContactSubmission(models.Model):
    PROJECT_TYPE_CHOICES = [
        ('Odoo', 'Odoo'),
        ('Python', 'Python'),
        ('Django', 'Django'),
        ('Flask', 'Flask'),
        ('API / Integration', 'API / Integration'),
        ('KI / Chatbot', 'KI / Chatbot'),
        ('Automatisierung', 'Automatisierung'),
        ('Digitalisierung', 'Digitalisierung'),
        ('Andere', 'Andere'),
    ]

    name = models.CharField(max_length=255, validators=[MinLengthValidator(2)])
    email = models.EmailField(validators=[EmailValidator()])
    company = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    project_type = models.CharField(max_length=50, choices=PROJECT_TYPE_CHOICES, default='Odoo')
    budget = models.CharField(max_length=100, blank=True, null=True)
    timeframe = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(validators=[MinLengthValidator(20)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Anfrage von {self.name}"
