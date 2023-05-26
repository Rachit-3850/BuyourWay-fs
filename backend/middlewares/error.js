const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
	if (err.message === 11000) {
		const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
		error = new ErrorHandler(message, 400);
	}

	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorHandler(message, 400);
	}

	if (err.name === "CastError") {
		const message = `Invalid ${Object.keys(err.keyValue)} entered`;
		error = new ErrorHandler(message, 400);
	}

	if (err.name === "JsonWebTokenError") {
		const message = "Invalid token";
		error = new ErrorHandler(message, 400);
	}

	if (err.name === "TokenExpiredError") {
		const message = "Token expired";
		error = new ErrorHandler(message, 400);
	}

	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	res.status(err.statusCode).json({
		success: false,
		error: err.stack,
	});
};
