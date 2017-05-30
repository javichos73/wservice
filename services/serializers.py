from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Producto
        fields = ('nombre_prod','precio1_prod','cantidad_prod','cod_barras_prod')