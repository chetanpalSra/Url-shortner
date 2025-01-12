const express = require('express');

const router = express.Router();

const URL = require('../models/url');
const { restrictTo } = require('../middleware/auth');

router.get('/admins/urls',restrictTo(['ADMIN']),async(req,res )=>{

    const allUrls = await URL.find({}); // it will return array of all urls form database.
        
    return res.render('home',{urls: allUrls});

})


router.get('/',restrictTo(["NORMAL_USER","ADMIN"]),async(req,res)=>{

        const allUrls = await URL.find({createdBy: req.user._id}); // it will return array of all urls form database.
        
        return res.render('home',{urls: allUrls,username: req.user.name});

  
})

router.get('/signup',(req,res)=>{
    return res.render('signup');
})

router.get('/login',(req,res)=>{
    return res.render('login');
})

module.exports = router;

