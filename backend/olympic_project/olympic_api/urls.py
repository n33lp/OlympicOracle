from django.urls import path
from . import views

urlpatterns = [
    path('', views.root, name='root'),
    path('bysport/', views.bysport, name='bysport'),
    path('bycountry/', views.bycountry, name='bycountry'),
    path('getsports/all/', views.getsports_all, name='getsports_all'),
]
