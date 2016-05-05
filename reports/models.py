from django.db import models

class Report(models.Model):
	spot_id = models.IntegerField(default = 0, primary_key = True)
	country = models.CharField(max_length = 40)
	region = models.CharField(max_length = 40)
	location = models.CharField(max_length = 40)

	def __str__(self):
		return self.location