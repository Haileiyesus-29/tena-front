// apiService.js

import axios from 'axios'

const api = axios.create({
   baseURL: 'http://localhost:5000/api',
})

export const registerAccount = (path, userData) => {
   return api.post(`/${path}`, userData)
}
export const loginAccount = credential => {
   return api.post('/login', credential)
}

// Other API functions for different endpoints
