from aiohttp import web
import async_timeout
from agent_controller import agent_controller
import requests
from bs4 import BeautifulSoup
import datetime
import config
import secrets

async def index(request):
    return web.Response(text='Hello Aiohttp!')

async def invite(request):
    # Create Invitation
    # wait for the coroutine to finish
    invite = None

    # Generate ownership proof
    ownership_proof = secrets.token_hex(16)
    # ownership_proof = "53a4198707658f2b0402af57441aa380"

    with async_timeout.timeout(5):
        invite = await agent_controller.connections.create_invitation(alias=ownership_proof)
        connection_id = invite["connection_id"]
        invite_url = invite["invitation_url"]
        json_response = {"invite_url" : invite_url, "connection_id": connection_id, "ownership_proof": f"#OPUS {ownership_proof}=="}
        return web.json_response(json_response)
    # return web.HTTPError()


async def check_active(request: web.Request):

    connection_id = request.match_info["conn_id"]

    with async_timeout.timeout(2):

        connection = await agent_controller.connections.get_connection(connection_id)
        state = connection["state"]

        is_active = state == "active"

        json_response = {"active": is_active}

        return web.json_response(json_response)

async def github_openmined_credential(request):
    data = await request.json()
    # print(data.getall())
    user = data.get('username')
    connection_id = data.get('connection_id')
    # ownership_proof= data['ownership_proof']

    connection = await agent_controller.connections.get_connection(connection_id)
    print(connection)

    ownership_proof = connection['alias']
    print("Ownership proof " + ownership_proof)

    global cred_def_id


    #Retrieve Page
    http_response = requests.get("https://github.com/"+user)
    # ownership_proof = "53a4198707658f2b0402af57441aa380"
    #Parse Account info for ownership token
    soup = BeautifulSoup(http_response.text)
    ownership_token = soup.findAll("div", {"class": "user-profile-bio"})[0].findAll("div")[0].text.strip()
    ownership_token = ownership_token.split("#OPUS ",1)[1].split("==",1)[0]

    # If the ownership proof is present
    if ownership_token == ownership_proof:
        soup = BeautifulSoup(http_response.text)
        print("Soup Page\n")
        print(soup)
        print("\n\n\n")
        orgDivs = soup.findAll("div", {"class": "border-top pt-3 mt-3 clearfix hide-sm hide-md"})
        print(orgDivs)
        orgsSection = orgDivs[0].findAll('img')
        myOrgs = set(tag['alt'] for tag in orgsSection)

        # If the user is a member of OpenMined
        if '@OpenMined' in myOrgs:

            date = datetime.datetime.today()
            day = date.strftime('%d')
            month = date.strftime('%m')
            year = date.strftime('%Y')
            #Set the credential
            credential_attributes = [
                {"name": "username", "value": user},
                {"name": "status", "value": "1"},
                {"name": "issued", "value": f"{day}/{month}/{year}"}
            ]

            #Send the credential to the user
            #TODO:
                # - link connection in this session to connection initiated previously
                # - define credential and scheme on ledger

            print("Issuing ", config.schema_id, config.cred_def_id)

            record = await agent_controller.issuer.send_credential(connection_id, config.schema_id, config.cred_def_id, credential_attributes, trace=False)
            print(record)
            return web.Response(text="linked to OpenMined.", content_type='text/html')

        else:
            return web.Response(text="Unable to link to OpenMined.", content_type='text/html')
    else:
        return web.Response(text="Unable to link.", content_type='text/html')
