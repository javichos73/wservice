# from django.shortcuts import render

# Create your views here.

# Create your views here.

from .models import Producto
from rest_framework import viewsets
from django.db.models import Q
from .serializers import ProductoSerializer


class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'cod_barras_prod'
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def get_queryset(self):
        """
        Metodo para buscar los productos, si se envía el parámetro nombre,
        se buscará dentro de las coincidencias en los nombres y codigos de barra
        :return: Listado de Productos.
        """

        nombres = self.request.query_params.get('nombre', None)
        if nombres is not None:
            p_criterio = nombres.split(" ")
            qset = Q()
            for i in p_criterio:
                qset = qset & (
                    Q(nombre_prod__icontains=i))  # | Q(cod_barras_prod__icontains=i))
            return Producto.objects.filter(qset).distinct()
        # si no viene parametro nombres, se envian todos.
        return Producto.objects.all()
