from aiohttp import web
import async_timeout
from agent_controller import agent_controller
import qrcode
import base64
from io import BytesIO


async def index(request):
    return web.Response(text='Hello Aiohttp!')

async def invite(request):
    # Create Invitation
    # wait for the coroutine to finish
    invite = None
    with async_timeout.timeout(5):
        invite = await agent_controller.connections.create_invitation()

        invite_url = invite["invitation_url"]
        return web.Response(text=invite_url)
    # return web.HTTPError()