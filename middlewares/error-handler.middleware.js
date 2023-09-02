module.exports = errorHandler = (error, request, response, next) => {
	response.status(error.status || 500).json({
		success: false,
		error: error.message,
	});
};
