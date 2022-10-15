const jwt = require('jsonwebtoken');
const config = require('config');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: config.get('ding.mailgun.apiKey'),
	url: 'https://api.eu.mailgun.net',
});

console.log(config.get('ding.mailgun.apiKey'));

exports.signup = function signup(email) {
	let token = jwt.sign({ email }, config.get('ding.jwt.secret'), {
		audience: 'ding',
	});

	const msg = {
		to: [email],
		from: 'Ding <ding@heka.no>',
		subject: `Your ding token!`,
		text: `Here is your ding token!\n\n${token}\n\nHappy dinging!`,
		html: `<h1>Here is your ding token!</h1><pre><code>${token}</code></pre><p>Happy dinging!</p>`,
	};

	mg.messages.create('heka.no', msg);
};

exports.verify = function verify(token) {
	try {
		let decoded = jwt.verify(token, config.get('ding.jwt.secret'), {
			audience: 'ding',
		});

		return decoded.email;
	} catch (e) {
		return null;
	}
};

exports.send = function send(email, subject, message) {
	const msg = {
		to: [email],
		from: 'Ding <ding@heka.no>',
		subject: `Ding! ${subject}`,
		text: `You dinged!\n\n${message}`,
		html: `<h1>You dinged!</h1><pre><code>${message}</code></pre>`,
	};

	mg.messages.create('heka.no', msg);
};
