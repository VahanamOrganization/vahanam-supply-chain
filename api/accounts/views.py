from .models import account
from django.contrib.auth import authenticate,login,logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from .serializers import accountSerializer
from django.contrib.sessions.models import Session
from django.db.models import Q

@api_view(['POST'])
#@csrf_exempt
def Login(request):
	"""
	List all code snippets, or create a new snippet.
	"""
	body=request.data
	username=body.get('username',None)
	password=body.get('password',None)
	user=authenticate(request,username=username,password=password)
	if user is not None:
		login(request,user)
		return Response(accountSerializer(user, many=False).data)
	return Response({"user":"failed to login"})




@api_view(['GET'])
#@csrf_exempt
def checkLogin(request):
	userCookies=request.query_params.get('sid',None)
	if userCookies is None:
		return Response({"status":"no user with this session"})
	
	s=Session.objects.get(pk=userCookies)
	data=s.get_decoded()['_auth_user_id']
	user=account.objects.filter(id=data)[0]
	serializer=accountSerializer(user, many=False)
	return Response(serializer.data)



@api_view(['POST'])
#@csrf_exempt
def Logout(request):
	"""
	List all code snippets, or create a new snippet.
	"""
	logout(request)
	return Response({"status":"user logged out"})


@api_view(['POST'])
#@csrf_exempt
def Register(request):
	"""
	List all code snippets, or create a new snippet.
	"""
	address=request.data.get('address')
	role=request.data.get('role')
	password=request.data.get('password')
	displayName=request.data.get('displayName')
	additionalData=request.data.get('additionalData')
	myuser=account.objects.create_user(address=address,role=int(role),password=password,displayName=displayName,additionalData=additionalData)
	login(request,myuser)
	return Response(accountSerializer(myuser, many=False).data)



@api_view(['GET'])
def getUsersByRole(request):
	role=request.query_params.get('role')
	users=account.objects.filter(role=int(role))
	serializer=accountSerializer(users,many=True)
	return Response(serializer.data)




@api_view(['POST'])
@csrf_exempt
def setAdditionalData(request):
	address=request.data.get('address',None)
	newData=request.data.get('data',None)
	account.objects.filter(address=address).update(additionalData=newData)
	user=account.objects.filter(address=address)
	return Response(accountSerializer(user, many=True).data)


@api_view(['GET'])
@csrf_exempt

def getUsersByAddress(request):
	currentAddress=request.query_params.get('address')
	if currentAddress is None:
		return Response({"status":"need at least one addres"})	
	addresses=currentAddress.split(',')
	queries=[Q(address=i) for i in addresses]
	query=queries.pop()
	for item in queries:
		query |=item
	users=account.objects.filter(query)
	return Response(accountSerializer(users,many=True).data)			
