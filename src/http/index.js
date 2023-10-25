import axios from "axios"

export const API_URL = "http://localhost:9001/api"

const $api = axios.create({
    withCredentials:true,
    baseUrl: API_URL
})

$api.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
$api.defaults.headers.common["Content-Type"] = "application/json"

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, (async error => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const responce = await axios.get("http://localhost:9001/refresh", {withCredentials: true})
            localStorage.setItem("token", responce.data.accessToken) 
            return $api.request(originalRequest)
        } catch (e) {
            console.log("non authorized")
        }
        
    }
    throw error
}))

export default $api