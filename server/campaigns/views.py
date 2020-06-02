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
	iden=request.query_params.get('identifier',None)
	if iden != None:
		campaigns=campaign.objects.filter(identifier=int(iden))
		return Response(campaignSerializer(campaigns,many=True).data)
	campaigns=campaign.objects.all()
	serializer=campaignSerializer(campaigns,many=True)
	return Response(serializer.data)


@api_view(['POST'])
@csrf_exempt
def createCampaigns(request):
	title=request.data.get('title')
	description=request.data.get('description')
	identifier=request.data.get('identifier')
	myCampaign=campaign()
	myCampaign.title=title
	myCampaign.description=description
	myCampaign.identifier=identifier
	myCampaign.save()
	return Response({"status":"Campaign created succesfully"})
		
