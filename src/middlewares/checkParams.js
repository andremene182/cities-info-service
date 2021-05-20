
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
	
	if (!hasAllRequiredParams) 
    //next(structures.json.errorSchema(i18n.__('params_required', params.join(",")) , 400, 2, req))
		next('Cities richiesta');
	else
		next();
};

module.exports = 
{requiredParams: requiredParams}