
import os

import time
import asyncio
from aries_basic_controller import AriesAgentController

WEBHOOK_HOST = os.getenv('WEBHOOK_HOST')
WEBHOOK_PORT = os.getenv('WEBHOOK_PORT')
WEBHOOK_BASE = os.getenv('WEBHOOK_BASE')
ADMIN_URL = os.getenv('ADMIN_URL')
print(ADMIN_URL)

agent_controller = AriesAgentController(webhook_host=WEBHOOK_HOST, webhook_port=WEBHOOK_PORT,
                                       webhook_base=WEBHOOK_BASE, admin_url=ADMIN_URL)



def cred_handler(payload):
    print("Handle Credentials")
    exchange_id = payload['credential_exchange_id']
    state = payload['state']
    role = payload['role']
    attributes = payload['credential_proposal_dict']['credential_proposal']['attributes']
    print(f"Credential exchange {exchange_id}, role: {role}, state: {state}")
    print(f"Offering: {attributes}")


cred_listener = {
    "topic": "issue_credential",
    "handler": cred_handler
}


def connections_handler(payload):
    global STATE
    connection_id = payload["connection_id"]
    print("Connection message", payload, connection_id)
    STATE = payload['state']
    # print(colored("Current state for ConnectionId {} is {}".format(connection_id, STATE), "magenta", attrs=["bold"]))
    # while STATE != 'active':
    #     # print(colored("ConnectionId {0} is not in active state yet".format(connection_id), "yellow", attrs=["bold"]))
    #     # loop = asyncio.get_event_loop()
    #
    #     # trust_ping = loop.run_until_complete(agent_controller.messaging.trust_ping(connection_id, 'hello!'))
    #     # print(colored("Trust ping send to ConnectionId {0} to activate connection".format(trust_ping), "blue",attrs=["bold"]))
    #     time.sleep(5)

connection_listener = {
    "handler": connections_handler,
    "topic": "connections"
}



async def initialise():
    await agent_controller.listen_webhooks()

    agent_controller.register_listeners([cred_listener, connection_listener], defaults=True)


