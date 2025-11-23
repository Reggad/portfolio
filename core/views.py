from django.shortcuts import render
from django.http import JsonResponse
from .models import ChatMessage
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return render(request, "core/index.html")





@csrf_exempt
def save_message(request):
    if request.method == "POST":
        data = json.loads(request.body)

        ChatMessage.objects.create(
            name=data["name"],
            email=data["email"],
            message=data["message"]
        )

        return JsonResponse({"status": "success"})

    return JsonResponse({"error": "Invalid request"}, status=400)
