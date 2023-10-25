const User = require("../models/User")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
//import services
const MailService = require("./mail-service")
const TokenService = require("./token-service")
//import DTO
const UserDto = require("../dtos/user-dto")
//import Error`s middelware
const ApiError = require("../exceptions/ApiError")

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({email: email}).exec()
        if (candidate) {
            throw ApiError.BadRequest("Користувач з цією почтою вже існує")
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const Link = uuid.v4()
        const user = await User.create({email: email, password: hashPassword, activationLink: Link})
        MailService.SendActivationMail(email, Link)

        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken) 

        return { ...tokens, user: userDto}
    }
    async login(email, password) {
        const user = await User.findOne({email: email}).exec()
        if (!user) {
            throw ApiError.BadRequest("Користувача не знайдено")
        }
        if (await bcrypt.compare(password, user.password) === true) {
            const userDto = new UserDto(user)
            const tokens = TokenService.generateToken({...userDto})
            await TokenService.saveToken(userDto.id, tokens.refreshToken)

            return {...tokens, user: userDto}
        }
        else {
            throw ApiError.BadRequest("Невірний пароль")
        }
    }
    async logout(refreshToken) {
        await TokenService.logoutToken(refreshToken)
        return
    }
    async activate(activationLink) {
        const user = await User.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest("Некоректне посилання активації")
        }
        user.isActivated = true
        await user.save()
    }
    async refresh(refreshToken) {
        try {
            if (!refreshToken) {
                throw ApiError.UnavthorizadedError()
            }
            const userData = TokenService.validateRefreshToken(refreshToken)
            const DBToken = await TokenService.findToken(refreshToken)
            if (!userData || !DBToken) {
                throw ApiError.UnavthorizadedError()
            }
            const user = User.findById(userData.id)
            const userDto = new UserDto(user)
            const tokens = TokenService.generateToken({...userDto})
            await TokenService.saveToken(userDto.id, tokens.refreshToken)
    
            return {...tokens, user: userDto}
        } catch(err) {
            
        }
        
    }
}

module.exports = new UserService();