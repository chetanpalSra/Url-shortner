const mongoose = require('mongoose');

async function connectToMongoDb(url){
    return mongoose.connect(url).then(()=>{
        return console.log('MongoDb Connected!');
    }).catch((err)=>{
        return  console.log('An Error occurred!',err);
    })
}

module.exports = {connectToMongoDb};