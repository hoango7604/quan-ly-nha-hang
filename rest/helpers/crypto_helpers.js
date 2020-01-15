const bcrypt = require('bcryptjs');

module.exports = {
	hashValue: (val) => {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(val, salt);
	},

	compareRawValueWithHashValue: (rawValue, hashValue) => {
		return bcrypt.compareSync(rawValue, hashValue);
	}
} 