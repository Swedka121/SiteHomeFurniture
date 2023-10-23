const express = require("express")
const cors = require("cors")
const CookieParser = require("cookie-parser")
require("dotenv").config()
const mongoose = require("mongoose")
const app = express()
const ErrorMiddelware = require("./middleware/error-middelware")

const apiRouter = require("./routes/main")

const PORT = process.env.PORT || 9001
const DB_connect = process.env.DB
<<<<<<< HEAD
const corsOptions = {
    credentials: true,
    origin: "http://localhost:9000"
}
=======
const corsOptions = process.env.CORS
>>>>>>> 7a61246a6c4575602504068723a6cd8bed73de1a

app.use(cors(corsOptions))
app.use(CookieParser())
app.use(express.json())
app.use("/asset",express.static("./assets"))
app.use("/hero",express.static("./hero"))
app.use(ErrorMiddelware)
mongoose
 .connect(DB_connect)
 .then(() => console.log("Connected to DB"))
 .catch((err) => console.log(err))

//Get Routes
app.use("/api", apiRouter)
app.listen(PORT, function () {
    console.log(`listen on port 9001`)
})