from .models import campaign
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from .serializers import campaignSerializer
from accounts.models import account
from django.views.decorators.csrf import csrf_exempt
@api_view(['GET'])
@csrf_exempt
def getCampaigns(request):
	campaigns=campaign.objects.all()
	serializer=campaignSerializer(campaigns,many=True)
	return Response(serializer.data)


@api_view(['POST'])
@csrf_exempt
def createCampaigns(request):
	title=request.data.get('title')
	description=request.data.get('description')
	email=request.data.get('email')
	myCampaign=campaign()
	myCampaign.title=title
	myCampaign.description=description
	myCampaign.is_started=False
	myCampaign.account= account.objects.filter(email=email)[0]
	try:
		myCampaign.save()
		return Response({"status":"Campaign created succesfully"})
	except:
		return Response({"status":"unable to create Campaign"})
		
