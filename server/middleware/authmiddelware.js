const ApiError = require("../exceptions/ApiError")
const tokenService = require("../services/token-service")

module.exports = (res,req,next) => {
    try {
        const AuthHeader = req.headers.authorization
        if (!AuthHeader) {
            return next(ApiError.UnavthorizadedError())
        }

        const AccsessToken = AuthHeader.split(" ")[1]
        if (!AccsessToken) {
            return next(ApiError.UnavthorizadedError())
        }

        const userData = tokenService.validateAcssesToken(AccsessToken)
        if (!userData) {
            return next(ApiError.UnavthorizadedError())
        }

        req.user = userData
        next()
    }
    catch(e) {
        return next(ApiError.UnavthorizadedError())
    }
}