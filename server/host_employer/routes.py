from views import index, invite, check_active

def setup_routes(app):
    app.router.add_get('/', index)
    app.router.add_get('/invite', invite)
    app.router.add_get('/connection/{id}/active', check_active)