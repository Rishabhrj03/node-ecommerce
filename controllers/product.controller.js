const { slider: sliderService } = require('../services/product');
const getHomePageData = async (req, res, next) => {
	try {
		const response = { code: -1, status: false, message: '' };
		// Validate token here
		const { fk_lang_id, user_id, all_product } = req.body;
		if (user_id) {
			if (!fk_lang_id) {
				response.message = 'Language Name is required';
				response.code = 201;
			} else {
				// Slider Code
				let slider = [];
				const sliderResult = await sliderService;
				if (sliderResult) slider = sliderResult;
				return res.json({ slider });
			}
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getHomePageData,
};
