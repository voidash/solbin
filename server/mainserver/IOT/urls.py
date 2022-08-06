from .views import close_dustbin, get_all_dustbins, last_weight_height_value, listen_for_changes, open_dustbin, should_open_dustbin, update_weight_height_value, Dustbin, get_dustbin_data, get_average_data,get_all_items_in_auction, item_in_auction_data, send_money 
from django.urls import path


app_name="IOT"
urlpatterns = [
    path('unit_value_history/<slug:uid>/', update_weight_height_value,name="update_weight_height_value"),
    path('get_latest_value/<slug:uid>/', last_weight_height_value,name="get_latest_weight_value"),
    path('dustbins', get_all_dustbins, name="dustbins"),
    path('listen_for_changes/<slug:uid>/', listen_for_changes, name="listen_for_change"),
    path('open_dustbin/<slug:uid>/', open_dustbin, name="open"),
    path('close_dustbin/<slug:uid>/', close_dustbin, name="close"),
    path('should_open_dustbin/<slug:uid>/', should_open_dustbin, name="should_open"),
    path('dustbin_data/<slug:uid>/', get_dustbin_data, name="dustbin_data"),
    path('get_average_data/', get_average_data, name="get_average"),

    #marketplace
    path('marketplace', get_all_items_in_auction, name="marketplace"),
    path('marketplace_item/<slug:uid>', item_in_auction_data, name="specific Item"),
    path('send_money/', send_money , name="send_money"),
]
