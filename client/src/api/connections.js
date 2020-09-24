import axios from 'axios'

// const base_endpoint = process.env.NODE_ENV == 'production' ? 'http://194.61.20.127:8000' :  'http://0.0.0.0:8000'
const base_endpoint = 'http://194.61.20.127:8000'
export const instance = axios.create({
    baseURL: base_endpoint
});

export function createInvite() {
    console.log("Request Create intvite")
    const path = "/invite"
    return instance.get(path)
}

export function checkActive(connectionId) {
    const path = `/connection/${connectionId}/active`

    return instance.get(path)
}

