from rest_framework import serializers 
from .models import CapturedText

class CapturedTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapturedText
        fields = "__all__"
