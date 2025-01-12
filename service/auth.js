const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.JWT_SECRETKEY;
 
function setUser(user) {
    const payload = {
        name: user.name,
        _id: user._id,
        email: user.email,
        role: user.role 
    };
    return jwt.sign(payload,secretKey);  //This function will create token for only that user which has secretKey.
}

function  getUser(token){ 
        if(!token){
            return null;
        }
        try{ 
        return jwt.verify(token,secretKey);
        }catch(error){
            return null;
        }

     // verifying the token provided by user from secretKey above defined
}


// Statefull -->
// const sessionIdToUserMap = new Map();

// //This map is created every-time when page is refreshed on browser.
// function setUser(id,user){
//      sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

module.exports = {setUser,getUser};