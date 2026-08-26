from django import forms
from .models import ContactMessage


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'service_type', 'budget', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-emerald-500 focus:outline-none text-white placeholder-slate-400 transition',
                'placeholder': 'Dein Name',
                'required': True,
            }),
            'email': forms.EmailInput(attrs={
                'class': 'w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-emerald-500 focus:outline-none text-white placeholder-slate-400 transition',
                'placeholder': 'deine@email.com',
                'required': True,
            }),
            'phone': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-emerald-500 focus:outline-none text-white placeholder-slate-400 transition',
                'placeholder': '+49 123 456789',
            }),
            'service_type': forms.Select(attrs={
                'class': 'w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-emerald-500 focus:outline-none text-white transition',
                'required': True,
            }),
            'budget': forms.Select(attrs={
                'class': 'w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-emerald-500 focus:outline-none text-white transition',
            }),
            'message': forms.Textarea(attrs={
                'class': 'w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-emerald-500 focus:outline-none text-white placeholder-slate-400 transition resize-none',
                'placeholder': 'Beschreibe dein Projekt...',
                'rows': 5,
                'required': True,
            }),
        }
