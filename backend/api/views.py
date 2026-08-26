from rest_framework import viewsets, status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from .models import ContactSubmission
from .serializers import ContactSerializer

class ContactRateThrottle(AnonRateThrottle):
    scope = 'contact'
    rate = '5/hour'

class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSerializer
    throttle_classes = [ContactRateThrottle]

@api_view(['POST'])
@throttle_classes([ContactRateThrottle])
def contact_submit(request):
    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            submission = serializer.save()
            return Response({'message': 'Anfrage erfolgreich versendet!', 'id': submission.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
