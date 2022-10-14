const app = require("express").Router()
const UserController = require("../controllers/userController")

//Middleware
const {restrict} = require('../middlewares/restrict')

app.post("/register", UserController.handleRegisterPage)
app.post('/login', UserController.handleLoginPage)



module.exports = app