const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    //const token = req.get('Authorization').split(' ')[1];
    const {token} = req.params;
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,'SmartSignupVerification');
    }
    catch (err){
        if (err.name === jwt.TokenExpiredError.name){
            const error = new Error("OTP verification Failed");
            error.statusCode = 503;
            throw error;
        }
        else{
            err.statusCode = 500;
            throw err;
        }

    }
    if (!decodedToken){
        const error = new Error('You are not authenticated!');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}