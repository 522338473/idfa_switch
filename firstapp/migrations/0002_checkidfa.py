# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2018-05-09 08:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CheckIdfa',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('appid', models.CharField(blank=True, max_length=200, null=True)),
                ('idfa', models.CharField(blank=True, max_length=200, null=True)),
                ('results', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
    ]
