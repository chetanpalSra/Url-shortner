const URL = require('../models/url');

const shortid = require('shortid');


async function handleGenerateNewShortUrl(req,res){
     const body = req.body;
     if(!body || !body.url){
         return res.status(400).json({error: 'url is required'});
     }
      const shortID = shortid(8);
       await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
       })
    
       return res.status(201).render('home',{id: shortID});
}

async function handleGetAnalytics(req,res){
      const shortId = req.params.shortId;

      const entry = await URL.findOne({shortId});

      return res.status(200).json({totalClicks: entry.visitHistory.length,analytics : entry.visitHistory});
       
}
module.exports = {handleGenerateNewShortUrl,handleGetAnalytics};