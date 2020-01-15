const { Model } = require('../base-model');
const { TABLE_NAME } = require('../../shared/share_modules');

module.exports = class DanhMucMon extends Model {

	static get tableName() {
		return TABLE_NAME.danhmucmon;
	}

	static get idColumn() {
		return 'maDanhMuc';
	}
}