# from django.shortcuts import render

# Create your views here.

# Create your views here.
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Producto
from rest_framework import viewsets

from django.db.models import Q
from .serializers import ProductoSerializer


class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'cod_barras_prod'
    queryset = Producto.objects.all().order_by('-cantidad_prod')
    serializer_class = ProductoSerializer
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('nombre_prod',)


