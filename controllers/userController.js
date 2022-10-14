const bcrypt = require("bcrypt")
require('dotenv').config()
const saltRounds = process.env.SALTROUNDS 
const toNumber = +saltRounds
const { User } = require("../models")

class UserController {
    static async handleRegisterPage(req, res) {
        try {
            const { fullname, username, role, password} = req.body

            const salt = bcrypt.genSaltSync(toNumber)
            // console.log(toNumber);
            const hash = bcrypt.hashSync(password, salt)

            const inputUser = {
                fullname,
                username,
                role,
                password:hash
            }
            const result = await User.create(inputUser)
            res.status(200).json({ message: "sukses ya" })
        } catch(error) {
            console.log(error, "error say");
        }
    }
    static async handleLoginPage(req, res) {
        try {
            const result = await User.authenticate(req.body)
            // console.log(result.dataValues)
            const result2 = await User.generateToken(req.body)
            res.status(200).json({token: result2})
        } catch (error) {
            console.log(error, "ini error");
        }
    }
}

module.exports = UserController