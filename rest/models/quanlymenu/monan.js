const { Model } = require('../base-model');
const { TABLE_NAME } = require('../../shared/share_modules');

module.exports = class MonAn extends Model {

	static get tableName() {
		return TABLE_NAME.monan;
	}

	static get idColumn() {
		return 'maMonAn';
	}

	static get relationMappings() {
		const DanhMucMon = require('./danhmucmon');

		return {
			danhMucMon: {
				relation: Model.BelongsToOneRelation,
				modelClass: DanhMucMon,
				join: {
					from: `${TABLE_NAME.monan}.maDanhMuc`,
					to: `${TABLE_NAME.danhmucmon}.maDanhMuc`
				}
			}
		};
	}
}