from .models import Dustbin, Weight_height, Item_to_auction
from rest_framework import serializers
class DustbinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dustbin
        fields = '__all__'

class ItemToAuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item_to_auction
        fields = '__all__'

class WeightHeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weight_height 
        fields = '__all__'
    
    def create(self, validated_data):
        dustbin = validated_data['dustbin']
        if dustbin.capacity < validated_data['weight_value']:
            raise Exception("weight value exceeds capacity")
        if dustbin.max_height < validated_data['height_value']:
            raise Exception("height value exceeds max_height")
        return Weight_height.objects.create(**validated_data)
