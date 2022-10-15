const packagejson = require('../package.json');

module.exports = {
	info: {
		name: "Henrik's API Server",
		description: packagejson.description,
		version: packagejson.version,
		docs: {
			url: 'https://heka.no/docs/api',
		},
		swagger: {
			schemes: ['http'],
			host: 'localhost:3000',
		},
	},
	ding: {
		jwt: { secret: 'UPDATE ME' },
		sendgrid: {
			apiKey: 'UPDATE ME',
		},
	},
};
