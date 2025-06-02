// import { nanoid } from 'nanoid'
const {nanoid} = require('nanoid')
const URL = require('../models/url')
async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const entry = await URL.findOne({redirectURL: body.url},"shortId")
    if(entry)  return res.json({ id: entry.shortId });
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL:body.url,
        visitHistory:[]

    })
    return res.render("home",{id:shortID})
}

module.exports={
    handleGenerateNewShortURL,
    
}