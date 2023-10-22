const User = require("../models/User")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
//import services
const MailService = require("./mail-service")
const TokenService = require("./token-service")
//import DTO
const UserDto = require("../dtos/user-dto")

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({email: email}).exec()
        if (candidate) {
            throw new Error("Користувач з цією почтою вже існує")
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const Link = uuid.v4()
        const user = await User.create({email: email, password: hashPassword, activationLink: Link})
        MailService.SendActivationMail(email, Link)

        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...UserDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken) 

        return { ...tokens, user: userDto}
    }
}

module.exports = new UserService();