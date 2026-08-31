from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'submissions', views.ContactSubmissionViewSet, basename='submission')

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', views.contact_submit, name='contact-submit'),
]
