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
    with async_timeout.timeout(2):
        invite = await agent_controller.connections.create_invitation()
        input_data = invite["invitation_url"]
        qr = qrcode.QRCode(
            version=1,
            box_size=10,
            border=5)

        qr.add_data(input_data)
        qr.make(fit=True)

        img = qr.make_image(fill='black', back_color='white')
        buffered = BytesIO()
        img.save(buffered, format="png")
        img_str = base64.b64encode(buffered.getvalue())
        return web.Response(text=str(img_str))