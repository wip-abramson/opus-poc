from views import index, invite

def setup_routes(app):
    app.router.add_get('/', index)
    app.router.add_get('/invite', invite)