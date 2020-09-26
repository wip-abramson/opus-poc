
import os
import requests
import json
import config
import time
import asyncio
from aries_basic_controller import AriesAgentController
from aries_basic_controller.controllers.connections import ConnectionsController
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

unique_strings = []



def connections_handler(payload):
    global STATE
    connection_id = payload["connection_id"]
    print("Connection message", payload, connection_id)
    STATE = payload['state']
    if STATE == "response":

        loop = asyncio.get_event_loop()
        trust_ping = loop.create_task(agent_controller.messaging.trust_ping(connection_id, 'hello!'))
        time.sleep(3)
        trust_ping = loop.create_task(agent_controller.messaging.trust_ping(connection_id, 'hello!'))


connection_listener = {
    "handler": connections_handler,
    "topic": "connections"
}



async def initialise():
    await agent_controller.listen_webhooks()

    agent_controller.register_listeners([cred_listener, connection_listener], defaults=True)

    is_alive = False
    while not is_alive:
        print("Agent not active yet")
        try:
            response = await agent_controller.server.get_status()
            is_alive = True
        except:

            time.sleep(5)


    # generate new DID
    response = await agent_controller.wallet.create_did()

    did_object = response['result']
    print("New DID", did_object)
    # write new DID to Sovrin Stagingnet

    url = 'https://selfserve.sovrin.org/nym'

    payload = {"network":"stagingnet","did": did_object["did"],"verkey":did_object["verkey"],"paymentaddr":""}

    # Adding empty header as parameters are being sent in payload
    headers = {}

    r = requests.post(url, data=json.dumps(payload), headers=headers)
    if r.status_code != 200:
        raise Exception

    response = await agent_controller.ledger.get_taa()
    TAA = response['result']['taa_record']
    TAA['mechanism'] = "service_agreement"
    print(TAA)

    response = await agent_controller.ledger.accept_taa(TAA)
    ## Will return {} if successful
    print(response)

    response = await agent_controller.wallet.assign_public_did(did_object["did"])
    print(response)

    response = await agent_controller.definitions.write_cred_def(config.om_member_schema_id)


    config.om_member_cred_def_id = response["credential_definition_id"]
    print("OM Member Cred Def", config.om_member_cred_def_id)

    response = await agent_controller.definitions.write_cred_def(config.prycon_schema_id)


    config.prycon_cred_def_id = response["credential_definition_id"]
    print("OM Member Cred Def", config.prycon_cred_def_id)



