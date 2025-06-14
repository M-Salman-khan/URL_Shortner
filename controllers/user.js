const User = require("../models/user")
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../service/auth');

async function handleUserSignUp(req, res) {
    const { email, name, password } = req.body
    await User.create({
        name,
        email,
        password
    })
    return res.redirect("/login")
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    if (!user) {
        return res.render("login", { error: "Invalid Username or Password" })
    }
    const sessionID = uuidv4()
    setUser(sessionID, user)
    res.cookie('uid', sessionID)
    return res.redirect("/")
}

module.exports = { handleUserSignUp, handleUserLogin }