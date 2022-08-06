from django.contrib import admin
from .models import Dustbin,Recyclers,Recycles_category, Weight_height, Item_to_auction, unit_recyclables_relation

# Register your models here.
admin.site.register(Dustbin)
admin.site.register(Recyclers)
admin.site.register(Recycles_category)
admin.site.register(Weight_height)

@admin.register(Item_to_auction)
class ItemToAuctionAdmin(admin.ModelAdmin):
    exclude = ('total_no_of_units','unit')

    list_display = ('type','start_date','end_date', 'total_units')

    def total_units(self,obj):
        return f'{obj.total_no_of_units} {obj.unit}' 

    def save_model(self, request, obj, form,change):
        recyclable_type = obj.type
        dustbins = Dustbin.objects.filter(dustbin_type=recyclable_type)
        total_weight = 0
        for dustbin in dustbins:
            weight_height_val = Weight_height.objects.filter(dustbin=dustbin).order_by('-date')
            if len(weight_height_val) >= 1: 
                total_weight += weight_height_val[0].weight_value
        obj.total_no_of_units = total_weight
        obj.unit = unit_recyclables_relation[recyclable_type]
        obj.save()
