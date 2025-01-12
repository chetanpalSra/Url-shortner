const express = require('express');

const app = express();

const PORT = 7010;

const Url = "mongodb://127.0.0.1:27017/urlShortner";

const {connectToMongoDb} = require('./connection');

const urlRoute = require('./routes/url');
 
const URL = require('./models/url');

const path = require('path'); //buitl-in.

const staticRoute = require('./routes/staticRouter');

const userRoute = require('./routes/user');

// const {restrictToLoggedInUserOnly,checkAuth} = require('./middleware/auth');

const {checkForAuthentication,restrictTo} =  require('./middleware/auth');

const cookieParser = require('cookie-parser');

connectToMongoDb(Url);

//express ko bta rhe ha ki konsa view engine hm use kr rhe ha.
app.set('view engine','ejs');

//express ko bta rhe ha ki ejs file kha pr ha.
app.set('views',path.resolve('./views'));

//Middleware-->
app.use(express.json());
//To parse form data that we used in ejs -->

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(checkForAuthentication);

app.use('/url',restrictTo(["NORMAL_USER","ADMIN"]),urlRoute); // restrict to only normal user.

app.use('/user',userRoute);

app.use('/',staticRoute); 



app.get('/urls/:shortId',async(req,res)=>{

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
       {shortId} ,
        {
            $push:
            {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        })

        res.status(301).redirect(entry.redirectURL);

})

app.listen(PORT,()=>{
    console.log(`Server Started at Port: ${PORT} successfully!`);
})