
from django.contrib import admin
from django.urls import path
from core.views import index,save_message


urlpatterns = [
    path('', index, name='index'),
    path("save-message/", save_message, name="save_message"),
    path('admin/', admin.site.urls),
]
