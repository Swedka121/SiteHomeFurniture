const jwt = require("jsonwebtoken")
const tokenModel = require("../models/Token")

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "15m"})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.updateOne({refreshToken: refreshToken})
            return tokenData
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token;
    }
    async logoutToken(refreshToken) {
        try {
            const token = await tokenModel.deleteOne({refreshToken})
            return
        }
        catch(e) {
            throw new Error(e)
        }
    }
    validateAcssesToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        }
        catch (e) {
            return null;
        }
    }
    async findToken(refreshToken) {
        try {
           const token = await tokenModel.findOne({refreshToken}) 
           return token;
        } catch(e) {
            return null;
        }
    }
}

module.exports = new TokenService();