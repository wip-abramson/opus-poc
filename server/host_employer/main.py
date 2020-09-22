from aiohttp import web
from routes import setup_routes
from agent_controller import initialise
import asyncio

loop = asyncio.get_event_loop()
loop.create_task(initialise())

app = web.Application()
setup_routes(app)
web.run_app(app, host='0.0.0.0', port=8000)