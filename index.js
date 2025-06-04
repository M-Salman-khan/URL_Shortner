const express = require('express')
const path = require('path')
const app = express()
const { connectToMongoDB } = require('./connect')
const PORT = 8000
const URL = require("./models/url")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
require('dotenv').config();

connectToMongoDB(process.env.MONGODB_LOCAL || process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB Successfully"))
.catch((err) => console.error("MongoDB Connection Failed:", err));


app.set("view engine", "ejs")

app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/url', urlRoute)
app.use('/', staticRoute)



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