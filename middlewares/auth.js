const { getUser } = require("../service/auth");

async function restricToUserLoggedInUserOnly(req,res,next) {
    const userId = req.cookie?.uid

    if(!userId) return res.redirect("/login");

    const user = getUser(userId)

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

module.exports = {
    restricToUserLoggedInUserOnly
}