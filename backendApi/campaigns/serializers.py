from .models import campaign
from rest_framework import serializers

class campaignSerializer(serializers.ModelSerializer):
	account=serializers.ReadOnlyField(source='account.email')
	class Meta:
		model = campaign
		fields = ['id','title','description','account','additionalData']



