const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })
	const { name, email, password } = req.body;
	// console.log(name, email, passwo rd);
	const user = await User.create({
		name,
		email,
		password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
	});

	const token = user.getJwtToken();
	res.status(200).json({
		success: true,
		token,
	});
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;
	// console.log(email, password);
	if (!email || !password) {
		return next(new ErrorHandler("Please provide email and password", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid Email or Password", 401));
	}
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorHandler("Invalid Email or  Password", 401));
	}
	sendToken(user, 200, res);
});

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email : req.body.email});

    if(!user) {
        return next(new ErrorHandler("user not found with this email", 404));
    }
    const resetToken = await user.resetPassword();
    console.log(resetToken);
    await user.save({validateBeforeSave : false});

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link to reset your password: \n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message
        })
        res.status(200).json({
            success : true,
            message : "An email has been sent to you with further instructions."
        })
    }
    catch(err) {
            console.log(err);
            user.resetPasswordExpire = undefined;
            user.resetPassword = undefined;
            await user.save({validateBeforeSave: false});

            return next(new ErrorHandler(err.message, 500));

        }

})
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : { $gt : Date.now() }
    });

    if(!user) {
        return next(new ErrorHandler("Invalid Token", 400));
    }
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user , 200 , res);

})


exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    console.log(req.user);
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success : true,
        user
    })

})

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    // console.log("hello");
    const user = await User.findById(req.user.id).select('+password');
    const isMatch = await user.matchPassword(req.body.oldPassword)
    if(!isMatch) {
        return next(new ErrorHandler("Invalid Password", 400));
    }
    // console.log(req.body.newPassword);
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token' , null , {
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "Logged out successfully"
    })

})

//admin routes

exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})


// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update user profile   =>   /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Delete user   =>   /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
    })
})