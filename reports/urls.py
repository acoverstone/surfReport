from django.conf.urls import url
from . import views

app_name = 'reports'
urlpatterns = [
	url(r'^$', views.home, name = 'home'),
	url(r'^reports/$', views.index, name = 'index'),
	url(r'^reports/(?P<spot_id>[0-9]+)/$', views.detail, name = 'detail'),
	url(r'^accounts/login', views.auth_login, name = 'login'),
	url(r'^accounts/register', views.register, name = 'register'),
	url(r'^accounts/success', views.success, name = 'success'),
	url(r'^accounts/failure', views.failure, name = 'failure'),
]