const app = require("express").Router()
const UserController = require("../controllers/userController")

app.get("/register", UserController.handleRegisterPage)

module.exports = app