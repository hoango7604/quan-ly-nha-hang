const JWT = require('jsonwebtoken');

const { JWT_SECRET } = require('../shared/share_modules');

module.exports = {
	signToken: (sub) => {
		return JWT.sign({
			iss: 'Doan_PTTKHTTT_Nhom12',
			sub,
			iat: new Date().getTime(),
			exp: new Date().setHours(new Date().getHours() + 6)
		}, JWT_SECRET);
	}
}