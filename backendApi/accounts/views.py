from .models import account
from django.contrib.auth import authenticate,login,logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from .serializers import accountSerializer
from django.contrib.sessions.models import Session


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
	email=request.data.get('email')
	role=request.data.get('role')
	phone_number=request.data.get('phone_number')
	password=request.data.get('password')
	myuser=account.objects.create_user(email=email,phone_number=phone_number,role=int(role),password=password)
	login(request,myuser)
	return Response(accountSerializer(myuser, many=False).data)

