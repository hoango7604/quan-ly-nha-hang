const { Model } = require('../base-model');
const { TABLE_NAME } = require('../../shared/share_modules');

module.exports = class BanAn extends Model {

	static get tableName() {
		return TABLE_NAME.banan;
	}

	static get idColumn() {
		return 'maBan';
	}
}