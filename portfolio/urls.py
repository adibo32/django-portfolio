from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    # Main portfolio page
    path('', views.index, name='index'),

    # API endpoints
    path('api/contact/', views.submit_contact_form, name='submit_contact_form'),
    path('api/contact-form/', views.contact_form_partial, name='contact_form_partial'),
    path('api/projects/', views.api_projects, name='api_projects'),
]
