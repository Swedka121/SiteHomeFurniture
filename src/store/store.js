import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";


export default class Store {
    user = {
        email:"",
        id:"",
        isActivated:""
    }
    isAuth = false
    isReg = true

    setAuth(auth) {
        this.isAuth = auth;
    }
    setUser(user) {
        this.user = user;
    }
    setReg(reg) {
        this.isReg = reg
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
            localStorage.removeItem("accessToken")
            this.setAuth(false)
            this.setUser({})
        } catch(e) {
            console.log(e.responce?.data?.message)
        }
    }
    constructor() {
        makeAutoObservable(this)
    }
}