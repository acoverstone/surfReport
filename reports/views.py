from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import Report, UserProfile
import requests, datetime, json


def home(request):

	reports = []
	data = []

	if request.user.username != '':
		jsonDec = json.decoder.JSONDecoder()
		u = User.objects.get(username = request.user.username)
		favorites = jsonDec.decode(u.userprofile.favorites)
		

		# for favorite in favorites:
		# 	report = get_object_or_404(Report, pk = favorite)
		# 	reports.append(report)

		# 	r = requests.get('http://magicseaweed.com/api/aa1171867a9a7698c04e99235767afb8/forecast/?spot_id=' + str(report.spot_id) + '&units=us')
		# 	temp = r.json()
		# 	dumpData = json.dumps(temp)
		# 	data.append(dumpData)

		# print reports

		for favorite in favorites:
			report = get_object_or_404(Report, pk = favorite)
			reports.append(report.spot_id)
			data.append(report.location)

	context = {'reports': reports, 'names': json.dumps(data)}
	return render(request, 'reports/home.html', context)


def success(request):
	return render(request, 'registration/success.html')


def failure(request):
	return render(request, 'registration/failure.html')


def auth_login(request):

	if request.POST:
		username = request.POST['username']
		password = request.POST['password']

		user = authenticate(username=username, password=password)
		if user is not None:
			login(request, user)
			return HttpResponseRedirect('/')
		else:
			# Somehow include error message about login unsuccessful
			return HttpResponseRedirect('/accounts/failure')		

	return render(request, 'registration/login.html')


def register(request):
	if request.POST:
		username = request.POST['username']
		email = request.POST['email']
		password = request.POST['password']
		password_confirm = request.POST['password_confirm']

		if password != password_confirm:
			return HttpResponseRedirect('/accounts/failure')

		user = User.objects.create_user(username, email, password)
		user.save()
		userProfile = UserProfile.objects.create(user = user, favorites = '[]')
		userProfile.save()


		if user is not None:
			return HttpResponseRedirect('/accounts/success')
		else:
			return HttpResponseRedirect('/accounts/failure')

	return render(request, 'registration/register.html')


def index(request):
	spot_list = Report.objects.all()
	context = {'spot_list': spot_list}
	return render(request, 'reports/index.html', context)


@csrf_exempt
def detail(request, spot_id):

	# handle favoriting 
	if request.POST:
		# get previous favorites list
		jsonDec = json.decoder.JSONDecoder()
		u = User.objects.get(username = request.user.username)
		favorites = u.userprofile.favorites 
		favoritesList = jsonDec.decode(favorites)

		# check if spot not in list and insert it
		if spot_id not in favoritesList:
			favoritesList.append(spot_id)

		u.userprofile.favorites = json.dumps(favoritesList)
		u.userprofile.save()


	# get report and tide data
	report = get_object_or_404(Report, pk = spot_id)
	r = requests.get('http://magicseaweed.com/api/aa1171867a9a7698c04e99235767afb8/forecast/?spot_id=' + str(report.spot_id) + '&units=us')
	data = r.json()
	dumpData = json.dumps(data)
	r2 = requests.get('http://api.aerisapi.com/tides/' + str(report.lat_long) + '/?client_id=L0G7xkdvu7NrYCWgCV4Cr&client_secret=F7Fa8IRzaJYuKCFWwq2cppFjXO2fdhLssjbYgJW5&from=yesterday&to=+1week')
	tides = r2.json()
	dumpTides = json.dumps(tides)

	context = {'report': report, 'data': dumpData, 'tides': dumpTides}
	return render(request, 'reports/detail.html', context)




