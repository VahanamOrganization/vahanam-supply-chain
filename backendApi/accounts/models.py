from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
import jsonfield
class MyAccountManager(BaseUserManager):
	def create_user(self,email,role,phone_number,password=None):
		if not email:
			raise ValueError("Users must have an email")
		if not role:
			raise ValueError("Users must have a role")
		if not phone_number:
			raise ValueError("Users must have a phone_number")
		user=self.model(email=self.normalize_email(email),role=role,phone_number=phone_number)
		user.is_staff=False
		user.set_password(password)
		user.save(using=self.db)
		return user
			
		



	def create_superuser(self,email,role,phone_number,password=None):
		user=self.create_user(email=self.normalize_email(email),role=role,phone_number=phone_number,password=password)
		user.is_admin=True
		user.is_staff=True
		user.save(using=self.db)
		return user





class account(AbstractBaseUser):
	class Role(models.IntegerChoices):
		COORDINATOR=1
		MANUFACTURER=2
		COURIER=3
		ADMIN=4
		RECIEVER=5
	email=models.EmailField(verbose_name='email',max_length=100,unique=True)
	date_joined=models.DateTimeField(verbose_name='date joined',auto_now_add=True)
	is_admin=models.BooleanField(default=False)
	is_staff=models.BooleanField(default=False)
	role=models.IntegerField(choices=Role.choices)
	phone_number=models.IntegerField()
	additionalData=jsonfield.JSONField()	
	USERNAME_FIELD='email'
	REQUIRED_FIELDS=['role','phone_number']

	objects=MyAccountManager()


	def __str__(self):
		return self.email

	def has_perm(self,perm,obj=None):
		return self.is_admin

	def has_module_perms(self,app_label):
		return True
