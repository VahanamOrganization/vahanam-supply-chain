from django.db import models
from django.conf import settings
import jsonfield

# Create your models here
class campaign(models.Model):
	title = models.CharField(max_length=1000, blank=True, default='')
	description = models.CharField(max_length=1000, blank=True, default='')
	identifier= models.IntegerField()
	additionalData=jsonfield.JSONField()

	def __str__(self):
		return self.title




 
