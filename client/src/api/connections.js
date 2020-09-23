import axios from 'axios'

const base_endpoint = 'http://0.0.0.0:8000'

const instance = axios.create({
    baseURL: base_endpoint
});

export function createInvite() {
    console.log("Request Create intvite")
    const path = "/invite"
    return instance.get(path)
}


