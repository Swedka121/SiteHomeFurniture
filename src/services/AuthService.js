import $api from "../http/index.js"

export default class AuthService {
    static async login(email, password) {
        return $api.post("http://localhost:9001/api/login", {email, password})
    }
    static async registration(email, password) {
        return $api.post("http://localhost:9001/api/registration", {email, password})
    }
    static async logout() {
        return $api.get("http://localhost:9001/api/logout")
    }
}