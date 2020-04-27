from .models import campaign
from rest_framework import serializers

class campaignSerializer(serializers.ModelSerializer):
	class Meta:
		model = campaign
		fields = ['id','title','description','identifier','additionalData']



