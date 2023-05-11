import axios from 'axios'

export default axios.create({
    baseURL: 'https://3c4e-2407-aa80-15-e0a2-6031-b60c-7d48-a2fe.ngrok-free.app',
    headers: {
        'Content-Type': 'application/json'
    }
})