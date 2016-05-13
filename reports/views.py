from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Report
import requests, datetime, json


def index(request):
	spot_list = Report.objects.all()
	context = {'spot_list': spot_list}
	return render(request, 'reports/index.html', context)


def detail(request, spot_id):
	report = get_object_or_404(Report, pk = spot_id)
	r = requests.get('http://magicseaweed.com/api/aa1171867a9a7698c04e99235767afb8/forecast/?spot_id=' + str(report.spot_id) + '&units=us')
	data = r.json()
	dumpData = json.dumps(data)
	r2 = requests.get('http://api.aerisapi.com/tides/' + str(report.lat_long) + '/?client_id=L0G7xkdvu7NrYCWgCV4Cr&client_secret=F7Fa8IRzaJYuKCFWwq2cppFjXO2fdhLssjbYgJW5&from=yesterday&to=+1week')
	tides = r2.json()
	dumpTides = json.dumps(tides)

	context = {'report': report, 'data': dumpData, 'tides': dumpTides}
	return render(request, 'reports/detail.html', context)





