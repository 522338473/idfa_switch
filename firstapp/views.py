from django.shortcuts import render,HttpResponse
from django.db import transaction
from .models import Report,Offer,Channel,CheckIdfa
import logging
import requests
import json

# Create your views here.


def index(request):
	return render(request,"index.html")

def notfound(request):
	return render(request,"404.html")

def check(request):
	offer_id = request.GET.get("offer_id")
	idfa = request.GET.get("idfa")
	ip = request.GET.get("ip")
	offer = Offer.objects.get(pk=offer_id)
	appid = offer.submit_offer_parameter_value
	provider = offer.provider
	# res为数据库中获取到的数据
	res = Report.objects.filter(idfa=idfa,offer_id=offer.id).count()
	if not res:
		# 数据库中没有数据
		params = {
			provider.submit_sign_parameter_name: provider.submit_sign_type,
			provider.submit_appid_parameter_name: appid,
			provider.check_idfa_parameter_name: idfa,
			provider.submit_ip_parameter_name: ip
		}
		r = requests.get(url=provider.check_url_base,params=params)
		result = r.text
		with transaction.atomic():
			checks = CheckIdfa(appid=appid,idfa=idfa,results=result)
			checks.save()
		logging.info(result)
		#results = {idfa: 0}
		return HttpResponse(result)
	results = {idfa: 1}
	return HttpResponse(json.dumps(results))

def submit(request):
	offer_id = request.GET.get("offer_id")
	idfa = request.GET.get("idfa")
	ip = request.GET.get("ip")
	channel_id = request.GET.get("channel_id")
	callback_url = request.GET.get("callback_url")
	keyword = request.GET.get("keywords")
	report_count = Report.objects.filter(idfa=idfa,offer_id=offer_id).count()
	if report_count:
		results = {"retval":"-1","info":"idfa repeated"}
		return HttpResponse(json.dumps(results))
	else:
		offer = Offer.objects.get(pk=offer_id)
		provider = offer.provider
		channel = Channel.objects.get(name=channel_id)
		with transaction.atomic():
			report = Report(idfa=idfa,ip=ip,channel_id=channel.id,offer_id=offer.id,callback_url=callback_url,keyword=keyword)
			report.save()
		params = {
			provider.submit_sign_parameter_name: provider.submit_sign_type,
			provider.submit_ip_parameter_name: ip,
			provider.submit_appid_parameter_name: offer.submit_offer_parameter_value,
			provider.submit_idfa_parameter_name: idfa,
			provider.submit_device_name_parameter_name: keyword
	#		provider.submit_callback_parameter_name: "http://47.254.38.107/firstapp/callback?report_id=" + str(report.id)
		}
		r = requests.get(url=provider.submit_url_base,params=params)
		report.submit_result_text = r.text
		report.save()
		if r.text == provider.submit_success_text:
			results = {"retval":"0","info":"success"}
			return HttpResponse(json.dumps(results))
		else:
			results = {"retval":"-1","info":"failed"}
			return HttpResponse(json.dumps(results))

def callback(request):
    report_id = request.GET['report_id']
    report = Report.objects.get(pk=report_id)
    provider = report.offer.provider
    if provider.callback_server_ip:
        if 'HTTP_X_FORWARDED_FOR' in request.META:
            ip = request.META['HTTP_X_FORWARDED_FOR']
        else:
            ip = request.META['REMOTE_ADDR']
        if provider.callback_server_ip.find(ip) < 0:
            return HttpResponse('{"retval":"-1","info":"invalid ip"}')

    report.callback_result_text = 'success'
    requests.get(url=report.callback_url, params={'idfa': report.idfa, 'offer_id': report.offer_id})
    return HttpResponse('{"retval":"0","info":"success"}')

def active(request):
	idfa = request.GET.get("idfa")
	offer_id = request.GET.get("offer_id")
	report = Report.objects.filter(offer_id=offer_id,idfa=idfa).first()
	offer = Offer.objects.get(pk=offer_id)
	provider = offer.provider
	params = {
		provider.submit_sign_parameter_name: provider.submit_sign_type,
		provider.check_idfa_parameter_name: report.idfa,
		provider.submit_appid_parameter_name: offer.submit_offer_parameter_value,
		provider.submit_callback_parameter_name: report.callback_url,
		provider.submit_device_name_parameter_name: report.keyword,
		#provider.submit_callback_parameter_name: "http://47.254.38.107/firstapp/callback?report_id=" + str(report.id)
	}
	res = requests.get(url=provider.check_success_text,params=params)
	report.callback_result_text = res.text
	report.save()
	if res.text == provider.submit_success_text:
		results = {"retval": 0, "info": "success"}
		return HttpResponse(json.dumps(results))
	results = {"retval": -1, "info": "failed"}
	return HttpResponse(json.dumps(results))









