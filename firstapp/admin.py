from django.shortcuts import render,HttpResponse
from django.contrib import admin
from django.http import StreamingHttpResponse
from .models import Channel, Provider, Offer, Report, CheckIdfa
import xlwt
import os
from django.conf import settings

BASE_DIR = settings.BASE_DIR
filename = "response"


class ChannelAdmin(admin.ModelAdmin):
	actions = ["saveexecl"]
	list_display = ("id","memo", "name")
	def saveexecl(self,request,queryset):
		Begin = xlwt.Workbook()
		sheet = Begin.add_sheet("response")
		cols = 0
		for query in queryset:
			# you need write colms
			sheet.write(cols,1,str(query.memo))
			sheet.write(cols,2,str(query.name))
			cols += 1
		Begin.save("%s" %(filename))
		def file_iterator(filename,chuck_size=512):
			with open(filename,"rb") as f:
				while True:
					c = f.read(chuck_size)
					if c:
						yield c
					else:
						break
		response = StreamingHttpResponse(file_iterator(filename))
		response['Content-Type'] = 'application/octet-stream'
		response['Content-Disposition'] = 'attachment;filename="{}"'.format("result.xls")
		return response
	saveexecl.short_description = "导出Excel"

admin.site.register(Channel, ChannelAdmin)
admin.site.register(Provider)


class AdminOffer(admin.ModelAdmin):
	list_display = ("id","memo")

admin.site.register(Offer, AdminOffer)


class AdminCheckIdfa(admin.ModelAdmin):
	list_display = ("id","appid", "idfa", "results")


admin.site.register(CheckIdfa, AdminCheckIdfa)


class AdminReport(admin.ModelAdmin):
	list_display = ("id",'offer', 'idfa', 'submit_result_text', 'callback_result_text')


admin.site.register(Report, AdminReport)
