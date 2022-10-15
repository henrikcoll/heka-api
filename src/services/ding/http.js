const ding = require('./index');

exports.init = (fastify) => {
	fastify.route({
		method: 'POST',
		url: '/api/v1/ding/signup',
		schema: {
			description: 'Signup and get a ding token emailed to you',
			summary: 'Signup for Ding',
			tags: ['ding'],
			body: {
				type: 'object',
				required: ['email'],
				properties: {
					email: {
						type: 'string',
						description: "user's email",
						format: 'email',
					},
				},
			},
			response: {
				201: {
					description: 'Email sent!',
					type: 'object',
					properties: {
						message: {
							type: 'string',
							example: 'Email sent!',
						},
					},
				},
			},
		},
		async handler(req, res) {
			ding.signup(req.body.email);

			return res.status(201).send({
				message: 'Email sent!',
			});
		},
	});

	fastify.route({
		method: 'POST',
		url: '/api/v1/ding/send',
		schema: {
			description: 'Send email notification. NOTE! Requires a ding token.',
			summary: 'Send email',
			tags: ['ding'],
			body: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						description: 'The message',
					},
					subject: {
						type: 'string',
						description: 'The subject',
					},
				},
			},
			security: [
				{
					apiKey: [],
				},
			],
			response: {
				200: {
					description: 'Email sent',
					type: 'object',
					properties: {
						message: {
							type: 'string',
							example: 'Email sent!',
						},
					},
				},
				401: {
					description: 'Could not validate token',
					type: 'object',
					properties: {
						message: {
							type: 'string',
							example: 'Invalid token!',
						},
					},
				},
			},
		},
		async handler(req, res) {
			let email = ding.verify(req.headers.apikey);

			if (!email) return res.status(401).send({ message: 'Invalid token!' });

			ding.send(email, req.body.subject, req.body.message);

			return {
				message: 'Email sent!',
			};
		},
	});
};
