
/**
 * Check required params for a service [middleware]
 * @author Andrea Menegazzo
 * @date 2021-04-30
 * @param {array}  params the params to check
 * @param {object} req the request obj of the service
 * @param {object} res the response obj of the service
 * @param {object} next the next function of the service
 * @returns {function} next() -> void if there are all params, -> errorSchema if required params are missing
 */
const requiredParams = (params) => (req, res, next) => {
	var reqParamList = Object.keys(req.query);

	const hasAllRequiredParams = params.every(param =>
			reqParamList.includes(param) && req.body[param] != false
	);
	
	try{
		if (!hasAllRequiredParams) 
			throw new Error("The param 'cities' is required for the service.");
		else
			next();
	} catch (e) {
		e.status = 400;
		next(e);
	}
};

module.exports = 
{requiredParams: requiredParams}