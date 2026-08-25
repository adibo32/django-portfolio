from django.contrib import admin
from .models import ContactMessage, EmailLog


@admin.register(EmailLog)
class EmailLogAdmin(admin.ModelAdmin):
    list_display = ('recipient', 'status', 'subject', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('recipient', 'subject', 'error_message')
    readonly_fields = ('created_at', 'error_message')
    ordering = ('-created_at',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'service_type', 'budget', 'created_at', 'is_read')
    list_filter = ('service_type', 'budget', 'is_read', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    fieldsets = (
        ('Kontaktinformation', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Projektdetails', {
            'fields': ('service_type', 'budget', 'message')
        }),
        ('Status', {
            'fields': ('is_read', 'created_at')
        }),
    )

    actions = ['mark_as_read', 'mark_as_unread']

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Markiere als gelesen"

    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
    mark_as_unread.short_description = "Markiere als ungelesen"