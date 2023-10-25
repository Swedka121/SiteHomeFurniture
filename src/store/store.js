import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";


export default class Store {
    user = {
        email:"",
        id:"",
        isActivated:""
    }
    isAuth = false
    isReg = true
    isAdmin = false

    setAuth(auth) {
        this.isAuth = auth;
    }
    setUser(user) {
        this.user = user;
    }
    setReg(reg) {
        this.isReg = reg
    }
    setAdmin(admin) {
        this.isAdmin = admin
    }
 
    async login(email, password) {
        try {
            const responce = await AuthService.login(email, password)
            console.log(responce)
            localStorage.setItem("token", responce.data.accessToken)
            this.setAuth(true)
            this.setUser(responce.data.user)
        } catch(e) {
            console.log(e)
        }
    }
    async registration(email, password) {
        try {
            const responce = await AuthService.registration(email, password)
            localStorage.setItem("token", responce.data.accessToken)
            this.setAuth(true)
            this.setUser(responce.data.user)
        } catch(e) {
            console.log(e.responce?.data?.message)
        }
    }
    async logout() {
        try {
            const responce = await AuthService.logout()
            localStorage.removeItem("token")
            this.setAuth(false)
            this.setUser({})
        } catch(e) {
            console.log(e.responce?.data?.message)
        }
    }
    async checkAuth() {
        try {
            const responce = await axios.get("http://localhost:9001/api/refresh", {withCredentials:true})

            localStorage.setItem("token", responce.data.accessToken)
            this.setAuth(true)
            this.setUser(responce.data.user)
        } catch (err) {
            console.log(err)
        }
    }
    constructor() {
        makeAutoObservable(this)
    }
}