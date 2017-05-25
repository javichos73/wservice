#from django.shortcuts import render

# Create your views here.

# Create your views here.

from .models import Producto
from rest_framework import viewsets
from .serializers import ProductoSerializer

class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer