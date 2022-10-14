const express = require("express")
const session = require("express-session")
const flash = require("express-flash")
const routes = require("./routes")
const app = express()
const port = 3000

require('dotenv').config()
// const passport = require("./lib/passport")

app.use(express.urlencoded({extended:false}))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

// app.use(passport.initialize())
// app.use(passport.session())

app.use(flash())

app.set('view engine', 'ejs')

app.use(routes)



app.listen(port, () => {
    console.log("servernya jalan sayang, gausa nangis.");
})