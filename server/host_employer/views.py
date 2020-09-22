from aiohttp import web
import async_timeout
from agent_controller import agent_controller

async def index(request):
    return web.Response(text='Hello Aiohttp!')

async def connect(request):
    # Create Invitation
    # wait for the coroutine to finish
    invite = None
    with async_timeout.timeout(2):
        invite = await agent_controller.connections.create_invitation()
        return web.Response(text=invite["invitation_url"])