from views import index, invite, check_active, github_openmined_credential, prycon_attendance

def setup_routes(app):
    app.router.add_get('/', index)
    app.router.add_get('/invite', invite)
    app.router.add_get('/connection/{conn_id}/active', check_active)
    app.router.add_post('/credential/github/openmined', github_openmined_credential)
    app.router.add_post('/credential/prycon', prycon_attendance)