import axios from 'axios'

const api = axios.create({
    baseURL: 'http://contest.elecard.ru/frontend_data/'
})

api.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
)

export default api
