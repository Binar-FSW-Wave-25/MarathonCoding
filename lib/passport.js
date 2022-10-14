const passport = require('passport')
const localStrategy = require("passport-local").Strategy
const { Strategy : JwtStrategy, ExtractJwt } = require('passport-jwt' )
const { User } = require("../models") 

async function authenticate(username, password, done) {
    try {
        const user = await User.authenticate({ username, password })
        return done(null, user)
    } catch (error) {
        return done(null, false), {message : error.message}
    }
}

const options = {
    // Untuk mengekstrak JWT dari request, dan mengambil token-nya dari header yang bernama Authorization
    jwtFromRequest : ExtractJwt .fromHeader ('authorization' ),

    /* Harus sama seperti dengan apa yang kita masukkan sebagai parameter kedua dari jwt.sign di User Model.
    Inilah yang kita pakai untuk memverifikasi apakah tokennya dibuat oleh sistem kita */
    secretOrKey : 'Ini rahasia ga boleh disebar-sebar' ,
    }

// passport.use (
    // new localStrategy({ usernameField: 'username', passwordField: 'password' }, authenticate)
    // )

passport .use(new JwtStrategy (options, async (payload, done) => {
        // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign
    User.findOne ({
        where: {
            id: payload.id
        }
    })
        .then(user => done(null, user))
        .catch(err => done(err, false))
}))

// passport.serializeUser(
//     (user, done) => done(null, user.id)
// )

// passport.deserializeUser(
//     async (id, done) => done(null, await User.findOne({
//         where : {
//             id
//         }
//     }))
//     )

    module.exports = passport