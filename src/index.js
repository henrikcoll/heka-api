const fastify = require('fastify')();
const config = require('config');

fastify
	.register(require('@fastify/cors'))
	.register(require('@fastify/swagger'), {
		swagger: {
			info: {
				title: config.get('info.name'),
				description: config.get('info.description'),
				version: config.get('info.version'),
			},
			externalDocs: {
				url: config.get('info.docs.url'),
				description: 'Find more info here',
			},
			schemes: config.get('info.swagger.schemes'),
			host: config.get('info.swagger.host'),
			consumes: ['application/json'],
			produces: ['application/json'],
			securityDefinitions: {
				apiKey: {
					type: 'apiKey',
					name: 'apiKey',
					in: 'header',
				},
			},
		},
		exposeRoute: true,
	})
	.register(require('@fastify/swagger-ui'), {
		routePrefix: '/docs',
		uiConfig: {
			docExpansion: 'list',
			deepLinking: false,
		},
		uiHooks: {
			onRequest: function (request, reply, next) {
				next();
			},
			preHandler: function (request, reply, next) {
				next();
			},
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
	})
	.after(() => {
		require('./services/ding/http').init(fastify);
	});

fastify.listen({
	port: 3000,
	host: '::',
});
