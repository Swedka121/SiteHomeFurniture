//import services
const UserService = require("../services/user-service")

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            const UserData = await UserService.registration(email, password)
            res.cookie("refreshToken", UserData.refreshToken, {maxAge: 30 * 24* 60 * 60 * 1000, httpOnly: true})

            return res.json(UserData)
        }
        catch (e) {
            console.error(e)
        }
    }
    async login(req, res, next) {
        try {}
        catch (e) {
            console.error(e)
        }
    }

    async refresh(req, res, next) {
        try {}
        catch (e) {
            console.error(e)
        }
    }

    async logout(req, res, next) {
        try {}
        catch (e) {
            console.error(e)
        }
    }

    async activate(req, res, next) {
        try {}
        catch (e) {
            console.error(e)
        }
    }
}

module.exports = new UserController();