const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncErrors( async ( req , res , next) => {
    const { token } = req.cookies; 
    // console.log(token);

    if(!token) {
        return new ErrorHandler("login first to access this resource" , 401);
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id)

    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next( new ErrorHandler("you are not authorized to access this resource", 403));
        }
        next();
    }
}