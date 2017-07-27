from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.HyperlinkedModelSerializer):
    #imagen_path = serializers.SerializerMethodField()
    class Meta:
        model = Producto
        fields = ('nombre_prod','precio1_prod','cantidad_prod','cod_barras_prod','imagen',#'imagen_path',
                  'ubicacion')

    #def get_imagen_path(self, producto):
    #    return producto.imagen.url if producto.imagen else None
        #request = self.context.get('request')
        #photo_url = producto.imagen.url
        #return request.build_absolute_uri(photo_url)