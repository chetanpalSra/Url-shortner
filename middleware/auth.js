const {getUser} = require('../service/auth');

//authentication --.
function checkForAuthentication(req,res,next){
   const authenticationCookieValue = req.cookies?.token;       

  req.user = null;

  if(!authenticationCookieValue){
    return next();
  } 
  
       
  const user = getUser(authenticationCookieValue);

  req.user = user;

  next();

}

//authorization -->

function restrictTo(roles = []){ // default is empty array.
    return function(req,res,next){ 
      // we can also avoid name in middleware.
      // role is an array.
      
      if(!req.user){
          return res.redirect('/login');
      }

      if(!roles.includes(req.user.role)){
        return res.end("You are Unauthorized"); // we are logged in what we are not satisfying the particular role.
      }
          
      next();
    
    }
}

// These above two function can handle authentication and authorization.

// async function restrictToLoggedInUserOnly(req,res,next){
//    const userUid = req.headers["authorization"];

//       // const userUid = req.cookies?.uid;       

//       if(!userUid){
//         return res.redirect('/login');
//       } 

//       const token = userUid.split('Bearer ')[1]; // gives array --> ['',token-string.]

//       const user = getUser(token);


//       console.log(user);
      
//       if(!user){
//         return res.redirect('/login'); 
//       }
//       req.user = user;
     

//       next();
// };

// async function checkAuth(req,res,next){
//     // const userUid = req.cookies?.uid; 

//        const userUid = req.headers["authorization"];

//     const token = userUid.split('Bearer ')[1]; // gives array --> ['',token-string.]
  
    
//     const user = getUser(token);
    
//     req.user = user;

//     next();
// }

module.exports = {checkForAuthentication,restrictTo};

// module.exports = {restrictToLoggedInUserOnly,checkAuth};

//Yes, in Node.js (Express.js), the keys in the req.headers object are automatically converted to lowercase. This behavior ensures that header names are case-insensitive, as required by the HTTP/1.1 specification.

// Explanation:
// HTTP Specification: HTTP header names are case-insensitive, meaning Content-Type and content-type are treated as the same header.
// Express Implementation: Express normalizes all header names to lowercase in the req.headers object to simplify access and avoid case-related issues.

//Accessing Headers Directly: Always use lowercase keys when accessing headers in req.headers.

// const contentType = req.headers['content-type']; // Correct
// const contentType = req.headers['Content-Type']; // Undefined

// Using req.header: Case-insensitivity is handled for you, so you can use any casing.

// const contentType = req.header('Content-Type'); // Works
// const contentType = req.header('content-type'); // Also works
