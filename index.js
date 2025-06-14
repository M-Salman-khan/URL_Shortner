const express = require('express')
const path = require('path')
const app = express()
const { connectToMongoDB } = require('./connect')
const PORT = 8000
const URL = require("./models/url")

require('dotenv').config();

const cookieParser = require("cookie-parser")

connectToMongoDB(process.env.MONGODB_LOCAL || process.env.MONGODB_URL).then(() => console.log("Connected to MongoDB Successfully"))
.catch((err) => console.error("MongoDB Connection Failed:", err));


const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")
const {restricToUserLoggedInUserOnly,checkAuth} = require("./middlewares/auth")


app.set("view engine", "ejs")

app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use('/', checkAuth,staticRoute)
app.use('/user',userRoute)
app.use('/url',restricToUserLoggedInUserOnly, urlRoute)



app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitHistory: {
                    "timeStamps": Date.now()
                }
            }
        })
    res.redirect(entry.redirectURL)
})


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))