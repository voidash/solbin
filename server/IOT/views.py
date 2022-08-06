from django.forms import ValidationError
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from rest_framework.response import Response 
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.urls import reverse

from .models import Weight_height, Dustbin, Item_to_auction
from .serializers import WeightHeightSerializer, DustbinSerializer, ItemToAuctionSerializer

from django.core.exceptions import EmptyResultSet
from django.utils import timezone

from .utils import get_price_to_pay, sol_send

@api_view(['GET','POST'])
def update_weight_height_value(request, uid):
    if request.method == 'GET':
        try:
            dustbin = Dustbin.objects.get(id=uid)
            whv = Weight_height.objects.filter(dustbin=dustbin)
            serializer = WeightHeightSerializer(whv,many=True) 
            return Response(serializer.data)
            # return Response({'data':'Error'},status=status.HTTP_400_BAD_REQUEST)
        except Dustbin.DoesNotExist:
            return Response({'data':'No dustbin with that UID exists'},status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'POST':
        try:
            dustbin = Dustbin.objects.get(id=uid)
            data = JSONParser().parse(request)
            data['dustbin'] = dustbin.id
            serializer  = WeightHeightSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                try:
                    serializer.save()
                except Exception as e:
                    return Response({'data' : str(e)}, status=status.HTTP_406_NOT_ACCEPTABLE)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'data': 'Missing fields'}, status= status.HTTP_400_BAD_REQUEST)
        except Dustbin.DoesNotExist:
            return Response({'data':'No dustbin with that UID exists'},status=status.HTTP_204_NO_CONTENT)





@api_view(['GET'])
def last_weight_height_value(request, uid):
    if request.method == 'GET':
        try:
            dustbin = Dustbin.objects.get(id=uid)
            whv = Weight_height.objects.filter(dustbin=dustbin).order_by('-date')[0]
            serializer = WeightHeightSerializer(whv) 
            return Response(serializer.data)
            # return Response({'data':'Error'},status=status.HTTP_400_BAD_REQUEST)
        except Dustbin.DoesNotExist:
            return Response({'data':'No dustbin with that UID exists'},status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
def get_all_dustbins_with_type(request,slug):
    if request.method == 'GET':
        try: 
            dustbin = Dustbin.objects.filter(dustbin_type=slug)
            serializer = DustbinSerializer(dustbin,many=True)
            data = serializer.data
            for i,d in enumerate(data):
                url = reverse('IOT:dustbin_data', kwargs={'uid':d['id'] })
                data[i]['url'] = url
            return Response(data)
        except Dustbin.DoesNotExist:
            return Response({'data':'No Dustbins with that type found'},status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_all_dustbins(request):
    if request.method == 'GET':
        try: 
            dustbin = Dustbin.objects.all()
            serializer = DustbinSerializer(dustbin,many=True)
            data = serializer.data
            for i,d in enumerate(data):
                url = reverse('IOT:dustbin_data', kwargs={'uid':d['id'] })
                data[i]['url'] = url
                fill_data = Weight_height.objects.filter(dustbin=data[i]['id']).order_by('-date')
                weight_filled = 0
                height_filled = 0
                if len(fill_data) >= 1:
                    weight_filled = fill_data[0].weight_value
                    height_filled = fill_data[0].height_value

                data[i]['weight_filled'] = weight_filled
                data[i]['height_filled'] = height_filled 
            return Response(data)
        except Dustbin.DoesNotExist:
            return Response({'data':'No Dustbins found'},status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_dustbin_data(request,uid):
    if request.method == 'GET':
        try:
            dustbin = Dustbin.objects.get(id=uid)
            serializer = DustbinSerializer(dustbin)
            data = serializer.data
            fill_data = Weight_height.objects.filter(dustbin=dustbin).order_by('-date')
            weight_filled = 0
            height_filled = 0
            if len(fill_data) >= 1:
                weight_filled = fill_data[0].weight_value
                height_filled = fill_data[0].height_value

            data['weight_filled'] = weight_filled
            data['height_filled'] = height_filled 
            return Response(data)
        except Dustbin.DoesNotExist:
            return Response({'data': 'No Dustbin with that UID found'}, status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
def listen_for_changes(request,uid):
    if request.method == 'GET':
        try: 
            # get the dustbin with that UID and find weight height changes 
            weight_height_changes = Weight_height.objects.filter(dustbin=uid).order_by('-date')
            if len(weight_height_changes) == 0:
                return Response({'data':'No data exists'},status=status.HTTP_204_NO_CONTENT)
            elif len(weight_height_changes) < 2:
                return Response({'data':'Not enough data  '},status=status.HTTP_206_PARTIAL_CONTENT)
            else:
                two_recent_changes = weight_height_changes[0:2];
                weight_change = two_recent_changes[0].weight_value - two_recent_changes[1].weight_value
                # get the current time and if recent_change time is within 1 min then its a recent change  
                tdl = timezone.now() - two_recent_changes[0].date
                money_to_pay = get_price_to_pay(30,weight_change)
                return Response({'data': {'recent': tdl.seconds, 'change': weight_change, 'amount_to_pay': money_to_pay[0], 'amount_to_pay_in_sol': money_to_pay[1]} })
        except Dustbin.DoesNotExist:
            return Response({'data':'No data exists'},status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def open_dustbin(request,uid):
    if request.method == 'GET':
        try:
            dustbin = Dustbin.objects.get(id=uid)
            dustbin.should_open = True
            dustbin.save()
            return Response({'data': 'Dustbin opened'}, status=status.HTTP_200_OK)
        except Dustbin.DoesNotExist:
            return Response({'data':'No data exists'},status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def should_open_dustbin(request,uid):
    if request.method == 'GET':
        try:
            dustbin = Dustbin.objects.get(id=uid)
            if dustbin.should_open == True:
                return Response({'data': 'open'}, status=status.HTTP_200_OK)
            else:
                return Response({'data': 'close'}, status=status.HTTP_200_OK)
        except Dustbin.DoesNotExist:
            return Response({'data':'No data exists'},status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def close_dustbin(request,uid):
    if request.method == 'GET':
        try:
            dustbin = Dustbin.objects.get(id=uid)
            dustbin.should_open = False
            dustbin.save()
            return Response({'data': 'Dustbin closed'}, status=status.HTTP_200_OK)
        except Dustbin.DoesNotExist:
            return Response({'data':'No data exists'},status=status.HTTP_204_NO_CONTENT)

from .models import recyclables_choice
@api_view(['GET'])
def get_average_data(request):
    if request.method == 'GET':
        response_data = dict()
        try:
            # get the latest weight value from all the dustbin types then get its average value   
            for (k,_) in recyclables_choice:
                dustbins = Dustbin.objects.filter(dustbin_type=k)
                total_weight = 0
                total_height = 0
                total_max_height = 0.1
                total_max_weight = 0.1 
                for dustbin in dustbins:
                    weight_height_val = Weight_height.objects.filter(dustbin=dustbin).order_by('-date')
                    if len(weight_height_val) >= 1: 
                        total_height += weight_height_val[0].height_value
                        total_weight += weight_height_val[0].weight_value

                    total_max_height += dustbin.max_height
                    total_max_weight += dustbin.capacity
                
                    print(dustbin.capacity)
                response_data[k] = {'total_weight': total_weight, 
                                    'total_height': total_height,
                                    'average_weight': total_weight/total_max_weight * 100, 
                                    'average_height': total_height/total_max_height * 100} 



            return Response({'data': response_data}, status=status.HTTP_200_OK)
        except Dustbin.DoesNotExist:
            return Response({'data':'No data exists'},status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def send_money(request):
    '''

    requires two fields on body for POST request

    ```
    {
        'recipient_address': <address>,
        'dustbin_uid': <uid>,
    }
    ```
    '''
    if request.method == 'POST':
        money_to_send_to = "" 
        dustbin_uid = "" 
        try:
            print(request.data)
            money_to_send_to = request.data['recipient_address']
            dustbin_uid = request.data['dustbin_uid']
        except:
            return Response({'data': 'No valid parameter provided'}, status=status.HTTP_400_BAD_REQUEST)
        # first off calculate the amount with change in weight
        two_recent_changes = 0
        weight_change = 0
        try:
            # get the dustbin with that UID and find weight height changes 
            weight_height_changes = Weight_height.objects.filter(dustbin=dustbin_uid).order_by('-date')
            if len(weight_height_changes) == 0:
                return Response({'data':'error'},status=status.HTTP_400_BAD_REQUEST)
            elif len(weight_height_changes) < 2:
                return Response({'data':'error'},status=status.HTTP_400_BAD_REQUEST)
            else:
                two_recent_changes = weight_height_changes[0:2];
                weight_change = two_recent_changes[0].weight_value - two_recent_changes[1].weight_value
                if two_recent_changes[0].redeemed == True:
                    return Response({'data': 'already redeemed'})
                # get the current time and if recent_change time is within 1 min then its a recent change  
                tdl = timezone.now() - two_recent_changes[0].date
                money_to_pay = get_price_to_pay(30,weight_change)
                sol_send(str(money_to_send_to),round(money_to_pay[1]*1000000000)) # in lamports
                return Response ({'recipient_address':money_to_send_to, 'dustbin_uid': dustbin_uid, 'amount': money_to_pay[0], 'amount_in_sol': money_to_pay[1]})
        except Dustbin.DoesNotExist:
            return Response({'data':'No data exists'},status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_all_items_in_auction(request):
    if request.method == 'GET':
        try: 
            to_auction = Item_to_auction.objects.all()
            serializer = ItemToAuctionSerializer(to_auction,many=True)
            data = serializer.data
            return Response(data)
        except Item_to_auction.DoesNotExist:
            return Response({'data':'No Items in auction'},status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def item_in_auction_data(request,uid):
    if request.method == 'GET':
        try:
            to_auction = Item_to_auction.objects.get(id=uid)
            serializer = ItemToAuctionSerializer(to_auction)
            data = serializer.data
            return Response(data)
        except Item_to_auction.DoesNotExist:
            return Response({'data': 'No Item with that UID found'}, status=status.HTTP_204_NO_CONTENT)
