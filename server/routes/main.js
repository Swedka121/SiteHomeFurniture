const express = require("express")
const {body} = require("express-validator")
const path = require("path")
const FileMiddleware = require("../middleware/file")
const Item = require("../models/Item")
const Config = require("../models/Config")
const fs = require("fs")    
const UserController = require("../controllers/user-controller")
const AuthMiddekware = require("../middleware/authmiddelware")
const ApiError = require("../exceptions/ApiError")

const Router = express.Router
const router = new Router()

router.get("/gethero/", (req, res) => {
    const Data_to_res = []
    fs.readdir(path.join(__dirname,"../hero"), (err, data) => {
        if (err) {console.log(err); res.sendStatus(404)}
        var i = 0
        data.forEach(element => {
            var Object1 = {}
            Object1.img = "http://localhost:9001/hero/" + element
            Object1.id = i
            Data_to_res.push(Object1)
            i++
        })
        res.json({data: Data_to_res})   
    })
})
router.get("/getslider/:name", (req,res) => {
    const { name } = req.params
    const data = []
    try {
        fs.readdir(path.join(__dirname,"../assets/sliders/", name), (err, data1) => {
            if (err) {console.log(err); res.sendStatus(404)}
            var i = 0
            data1.forEach(element => {
                var Object1 = {}
                Object1.img = "http://localhost:9001/asset/sliders/" + name + "/" + element
                Object1.id = i
                data.push(Object1)
                i++
            })
            res.json({data})   
        })
    } catch (error) {
        throw new ApiError.BadRequest("Undefined", error)
    }
    
})
router.get("/getconfig/", async (req, res) => {
    const toRes = await Config.find({}).exec()
    res.json({toRes})
})
router.get("/getitems/", async (req, res) => {
    const toRes = await Item.find({}).exec()
    res.json({data: toRes})
})
router.post("/getitems/filter/", async (req,res) => {
    const { types } = req.body
    console.log(req.headers)
    const toRes = await Item.find({type: types}).exec()
    res.json({data: toRes})
})
router.post("/additem/", FileMiddleware.single("img") , (req, res) => {
    const { title, des, price, type, op1n , op2n, op3n, op4n, op5n, op6n, op7n, op8n, op9n, op10n, op1v , op2v, op3v, op4v, op5v, op6v, op7v, op8v, op9v, op10v} = req.body
    const img = req.file
    const img_url = "http://localhost:9001/asset/" + img.filename
    const NewItem = new Item({title:title,des:des,price:price,type: type,img: img_url, options:[{title: op1n, value: op1v},{title: op2n, value:op2v},{title: op3n, value:op3v},{title: op4n, value:op4v},{title: op5n, value:op5v},{title: op6n, value:op6v},{title: op7n, value:op7v},{title: op8n, value:op8v},{title: op9n, value:op9v},{title: op10n, value:op10v}]})
    NewItem.save()
    res.sendStatus(200)
})
router.post("/getitem", async (req, res) => {
    const { id } = req.body
    const data = await Item.findById(id).exec()
    res.json(data)
})
router.post("/registration", body("email").isEmail(), body("password").isLength({min: 3, max: 32}) ,UserController.registration)
router.post("/login", body("email").isEmail(), body("password").isLength({min: 3, max: 32}) ,UserController.login)
router.get("/logout", UserController.logout)
router.get("/activate/:link", UserController.activate)
router.get("/refresh", UserController.refresh)


module.exports = router