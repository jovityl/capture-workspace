from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import CapturedText
from .serializers import CapturedTextSerializer

@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    return Response({"status": "ok"})

@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def capture_view(request):
    if request.method == "POST":
        serializer = CapturedTextSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()
        return Response(serializer.data, status=201)
    if request.method =="GET":
        queryset = CapturedText.objects.order_by("-created_at")[:10]
        serializer = CapturedTextSerializer(queryset, many=True)
        return Response(serializer.data)