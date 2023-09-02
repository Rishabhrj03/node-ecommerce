const getHomePageData = (req, res, next) => {
	try {
		const { fk_lang_id } = req.body;
		console.log('I am inside getHomePageData');
		throw new Error('Parameter is not a number!');
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getHomePageData,
};
