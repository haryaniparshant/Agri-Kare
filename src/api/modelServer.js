import axios from 'axios'

export default axios.create({
    baseURL: 'https://a3b7-2407-aa80-15-e0a2-18e4-ec36-1364-7f79.ngrok-free.app',
    headers: {
        'Content-Type': 'application/json'
    }
})