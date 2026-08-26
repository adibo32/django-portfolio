from rest_framework import serializers
from .models import ContactSubmission

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'company', 'phone', 'project_type', 'budget', 'timeframe', 'description', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_description(self, value):
        if len(value) < 20:
            raise serializers.ValidationError("Beschreibung muss mindestens 20 Zeichen lang sein.")
        if value.count('http') > 3:
            raise serializers.ValidationError("Zu viele Links.")
        spam_keywords = ['bitcoin', 'crypto', 'casino']
        if any(k in value.lower() for k in spam_keywords):
            raise serializers.ValidationError("Spam erkannt.")
        return value
