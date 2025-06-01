const express = require('express')
const app = express()
const { connectToMongoDB } = require('./connect')
const PORT = 8000
const URL = require("./models/url")
const urlRoute = require("./routes/url")
app.use(express.json())

app.use('/url', urlRoute)


app.get('/:shortId', async (req, res) => {
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


connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("Connected to MongoDB Successfully"))
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))