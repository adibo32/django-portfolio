from django.db import models
from django.core.mail import EmailMessage
from django.conf import settings

class ContactMessage(models.Model):
    SERVICE_CHOICES = (
        ('django', 'Django & Flask Development'),
        ('odoo', 'Odoo ERP Solutions'),
        ('ai', 'AI & Chatbot Engineering'),
        ('other', 'Sonstiges / Other'),
    )

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    service_type = models.CharField(max_length=20, choices=SERVICE_CHOICES)
    budget = models.CharField(
        max_length=50,
        choices=[
            ('< 2000', '< 2.000 €'),
            ('2000-5000', '2.000 - 5.000 €'),
            ('5000-10000', '5.000 - 10.000 €'),
            ('10000+', '> 10.000 €'),
        ],
        blank=True,
        null=True
    )
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"{self.name} - {self.get_service_type_display()}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Send email notification to admin
        self.send_notification_email()

    def send_notification_email(self):
        """Send email notification when contact form is submitted"""
        subject = f"Neue Projektanfrage von {self.name}"
        message = f"""
Neue Kontaktanfrage:

Name: {self.name}
E-Mail: {self.email}
Telefon: {self.phone or 'Nicht angegeben'}
Service-Typ: {self.get_service_type_display()}
Budget: {self.get_budget_display() if self.budget else 'Nicht angegeben'}

Nachricht:
{self.message}

---
Portal: https://adib-dev.com/admin
        """

        try:
            email = EmailMessage(
                subject=subject,
                body=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.ADMIN_EMAIL],
            )
            email.send(fail_silently=False)
        except Exception as e:
            print(f"Email error: {e}")
