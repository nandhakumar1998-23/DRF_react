from django.urls import path
from .views import RegisterView, LoginView, HomeView, TransactionCreateView
from . import views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('home/', HomeView.as_view(), name='home'),
    path('transactions/', TransactionCreateView.as_view(), name='transaction-create'), 
    path('user-info/', views.UserInfoView.as_view(), name='user-info'),
]
