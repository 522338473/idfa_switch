from django.db import models


class Channel(models.Model):
    memo = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.memo) + '-' + self.name


class Provider(models.Model):
    memo = models.CharField(max_length=200, null=True, blank=True)
    submit_url_base = models.CharField(max_length=200, null=True, blank=True)
    submit_idfa_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    submit_ip_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    submit_offer_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    submit_appid_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    submit_appid_parameter_value = models.CharField(max_length=200, null=True, blank=True)
    submit_callback_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    submit_success_text = models.CharField(max_length=200, null=True, blank=True)
    callback_success_text = models.CharField(max_length=200, null=True, blank=True)
    check_url_base = models.CharField(max_length=200, null=True, blank=True)
    check_idfa_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    check_success_text = models.CharField(max_length=200, null=True, blank=True)
    callback_server_ip = models.CharField(max_length=200, null=True, blank=True)
    submit_openudid_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    submit_os_version_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    submit_device_name_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    check_openudid_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    check_os_version_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    check_ip_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    submit_http_method = models.CharField(max_length=200, null=True, blank=True)
    submit_sign_parameter_name = models.CharField(max_length=200, null=True, blank=True)
    submit_sign_type = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.memo) + '-' + self.submit_url_base


class Offer(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    memo = models.CharField(max_length=200, null=True, blank=True)
    submit_offer_parameter_value = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.memo) + '-' + self.submit_offer_parameter_value


class Report(models.Model):
    offer = models.ForeignKey(Offer,on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel,on_delete=models.CASCADE)
    idfa = models.CharField(max_length=200, null=True, blank=True)
    ip = models.CharField(max_length=200, null=True, blank=True)
    callback_url = models.CharField(max_length=200, null=True, blank=True)
    submit_result_text = models.CharField(max_length=200, null=True, blank=True)
    callback_result_text = models.CharField(max_length=200, null=True, blank=True)
    openudid = models.CharField(max_length=200, null=True, blank=True)
    os_version = models.CharField(max_length=200, null=True, blank=True)
    device_name = models.CharField(max_length=200, null=True, blank=True)
    keyword = models.CharField(max_length=200,null=True,blank=True)     # 产品关键字
    day_time = models.DateTimeField(auto_now_add=True,null=True,blank=True)  # 表生成时间


class CheckIdfa(models.Model):
    appid = models.CharField(max_length=200,null=True,blank=True)
    idfa = models.CharField(max_length=200,null=True,blank=True)
    results = models.CharField(max_length=200,null=True,blank=True)
    day_time = models.DateTimeField(auto_now_add=True, null=True, blank=True)  # 表生成时间
