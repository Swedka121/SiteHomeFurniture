//import services
const userService = require("../services/user-service");
const UserService = require("../services/user-service")

const {validationResult} = require("express-validator")
const ApiError = require("../exceptions/ApiError")

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Не пройшов валідацію, з такими помилками:", errors))
            }
            const {email, password} = req.body;
            const UserData = await UserService.registration(email, password)
            res.cookie("refreshToken", UserData.refreshToken, {maxAge: 30 * 24* 60 * 60 * 1000, httpOnly: true})

            return res.json(UserData)
        }
        catch (e) {
            next(e)
        }
    }
    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Не пройшов валідацію, з такими помилками:", errors))
            }
            const {email, password} = req.body;
            const UserData = await UserService.login(email, password)
            res.cookie("refreshToken", UserData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(UserData)
        }
        catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = UserService.refresh(refreshToken)
            res.cookie("refreshToken", UserData.refreshToken, {maxAge: 30 * 24* 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken)
            res.clearCookie("refreshToken")
            return res.status(200).json("logout")
        }
        catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const { link } = req.params;
            await userService.activate(link)
            return res.redirect("http://localhost:9000/profile/")
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();