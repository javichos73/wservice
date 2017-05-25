# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models

class Producto(models.Model):
    codigo_prod = models.AutoField(primary_key=True)
    cod_barras_prod = models.CharField(unique=True, max_length=20)
    nombre_prod = models.CharField(max_length=150)
    costo_prod = models.DecimalField(max_digits=12, decimal_places=6)
    precio1_prod = models.DecimalField(max_digits=8, decimal_places=3)
    precio2_prod = models.DecimalField(max_digits=8, decimal_places=3)
    precio3_prod = models.DecimalField(max_digits=8, decimal_places=3)
    iva_prod = models.IntegerField()
    fecha_venta = models.DateField(blank=True, null=True)
    cantidad_prod = models.DecimalField(max_digits=8, decimal_places=2)
    cantidadminima = models.DecimalField(db_column='cantidadMinima', max_digits=5, decimal_places=2)  # Field name made lowercase.
    cant_xcaja = models.IntegerField(db_column='cant_xCaja', blank=True, null=True)  # Field name made lowercase.
    cod_subproducto = models.ForeignKey('self', models.DO_NOTHING, db_column='cod_subproducto', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'producto'
