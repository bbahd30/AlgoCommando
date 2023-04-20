import axios from 'axios'

export default function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = ''
    delete axios.defaults.headers.common['Authorization']

    if (token) {
        axios.defaults.headers.common['Authorization'] = `JWT  ${token}`
    }
}
