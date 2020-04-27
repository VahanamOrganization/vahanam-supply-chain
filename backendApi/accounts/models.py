from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
import jsonfield
class MyAccountManager(BaseUserManager):
	def create_user(self,address,role,password=None):
		if not address:
			raise ValueError("Users must have an address")
		if not role:
			raise ValueError("Users must have a role")
		user=self.model(address=address,role=role)
		user.is_staff=False
		user.set_password(password)
		user.save(using=self.db)
		return user
			
		



	def create_superuser(self,address,role,password=None):
		user=self.create_user(address=address,role=role,password=password)
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
	address=models.CharField(max_length=150,unique=True,default='example')
	date_joined=models.DateTimeField(verbose_name='date joined',auto_now_add=True)
	is_admin=models.BooleanField(default=False)
	is_staff=models.BooleanField(default=False)
	role=models.IntegerField(choices=Role.choices)
	additionalData=jsonfield.JSONField()	
	USERNAME_FIELD='address'
	REQUIRED_FIELDS=['role']

	objects=MyAccountManager()


	def __str__(self):
		return self.address

	def has_perm(self,perm,obj=None):
		return self.is_admin

	def has_module_perms(self,app_label):
		return True
