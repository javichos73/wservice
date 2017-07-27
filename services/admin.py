from django.contrib import admin
from .models import Producto

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre_prod', 'precio1_prod')
    #list_filter = ('nombre_prod',)
    search_fields = ('nombre_prod',)
    #list_editable = ('nombre_prod')

admin.site.register(Producto,ProductoAdmin)