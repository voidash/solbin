import requests
import json

def get_price_to_pay(per_kg_price,weight_change):
    weight_change = abs(weight_change)
    solana_price = json.loads(requests.get("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=INR").text)['solana']['inr'] * 1.6
    money_to_pay = per_kg_price * weight_change
    sol_to_pay = money_to_pay / solana_price
    return (money_to_pay,sol_to_pay)

from solathon.core.instructions import transfer
from solathon import Client, Transaction, PublicKey, Keypair

def sol_send(recipient, amount):
    client = Client("https://api.devnet.solana.com")
    sender = Keypair.from_private_key("8bguEDCGRNiftjN2gh2J4VYYzVwfvwWFcUD7jzeLV7hc")
    receiver = PublicKey(recipient)
    amount = amount 

    instruction = transfer(
        from_public_key=sender.public_key,
        to_public_key=receiver,
        lamports=amount
    )

    transaction = Transaction(instructions=[instruction],signers=[sender])

    result = client.send_transaction(transaction)
    print("Transaction result", result)
