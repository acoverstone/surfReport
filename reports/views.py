from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Report
import requests, datetime


def index(request):
	spot_list = Report.objects.all()
	context = {'spot_list': spot_list}
	return render(request, 'reports/index.html', context)


def detail(request, spot_id):
	report = get_object_or_404(Report, pk = spot_id)
	r = requests.get('http://magicseaweed.com/api/aa1171867a9a7698c04e99235767afb8/forecast/?spot_id=' + str(report.spot_id) + '&units=us')
	data = r.json()

	for i, time in enumerate(data):
		data[i]['timestamp'] = datetime.datetime.fromtimestamp(
			int(data[i]['timestamp'] + 180000)
		).strftime('%Y-%m-%d %H:%M:%S')

	context = {'report': report, 'data': data}
	return render(request, 'reports/detail.html', context)
