from views import index, connect

def setup_routes(app):
    app.router.add_get('/', index)
    app.router.add_get('/connect', connect)