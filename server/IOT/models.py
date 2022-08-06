from django.db import models
import uuid


unit_choices = [("kg","kg"),("litres","litres"),("pound", "pound"), ("gallon", "gallon")]
recyclables_choice = [("Paper", "Paper"), ("Metal","Metal"), ("Plastics","Plastics"),("Waste Food", "Waste Food"), ("Bottles","Bottles")]

unit_recyclables_relation = {"Paper": "kg","Metal": "kg", "Plastics": "kg", "Waste Food": "litre", "Bottles": "kg"}

class Dustbin(models.Model):
    id = models.UUIDField(primary_key=True, default = uuid.uuid4, editable=False)
    latitude_longitude = models.TextField()
    dustbin_type = models.CharField(max_length=255,choices=recyclables_choice)
    location = models.CharField(max_length=255)
    should_open = models.BooleanField()
    capacity = models.FloatField()
    max_height = models.FloatField()

    def __str__(self):
        return f'\'{self.id}\' at {self.location}'

# if we want the last known weight we have to store the weight somewhere 
# We can create a dustbin_weight and height model 
class Weight_height(models.Model):
    dustbin = models.ForeignKey(Dustbin, on_delete=models.CASCADE)
    weight_value = models.FloatField()
    height_value = models.FloatField()
    redeemed = models.BooleanField()
    date = models.DateTimeField()

    def __str__(self):
        return f'{self.dustbin.id} : Weight->  {self.weight_value} , Height -> {self.height_value}'


class Recyclers(models.Model):
    name = models.CharField(max_length=255)
    recycles = models.CharField(max_length=255, choices=recyclables_choice )
    average_price = models.FloatField()

    def __str__(self):
        return f'{self.name}'


class Recycles_category(models.Model):
    parent = models.ForeignKey(Recyclers, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    unit = models.CharField(max_length=255,choices=unit_choices)
    price_per_unit = models.FloatField()

    def __str__(self):
        return f'{self.parent}-{self.name}: {self.price_per_unit} per {self.unit}'


class Item_to_auction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    starting_price = models.BooleanField
    type = models.CharField(max_length=255,choices=recyclables_choice)
    unit = models.CharField(max_length=255,choices=unit_choices)
    total_no_of_units = models.FloatField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return f'{self.type}: {self.start_date}-{self.end_date} has {self.total_no_of_units} {self.unit}'



