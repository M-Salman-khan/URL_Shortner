const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{ timeStamps: { type: Number } }],
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},
    { timeStamps: true }
)


const URL = mongoose.model("url",urlSchema)

module.exports = URL