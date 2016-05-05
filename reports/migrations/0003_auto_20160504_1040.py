# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-05-04 15:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0002_report_spot_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='report',
            name='id',
        ),
        migrations.AlterField(
            model_name='report',
            name='spot_id',
            field=models.IntegerField(default=0, primary_key=True, serialize=False),
        ),
    ]
