from django.db import models
from django.contrib.auth.models import User


class Report(models.Model):
	spot_id = models.IntegerField(default = 0, primary_key = True)
	country = models.CharField(max_length = 40)
	region = models.CharField(max_length = 40)
	location = models.CharField(max_length = 40)
	lat_long = models.CharField(max_length = 40, default = '')

	def __str__(self):
		return self.location


class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete = models.CASCADE)
	favorites = models.CharField(max_length = 200, default = '[]')



