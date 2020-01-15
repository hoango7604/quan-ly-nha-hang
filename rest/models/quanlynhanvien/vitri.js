const { Model } = require('../base-model');
const { TABLE_NAME } = require('../../shared/share_modules');

module.exports = class ViTri extends Model {

	static get tableName() {
		return TABLE_NAME.vitri;
	}

	static get idColumn() {
		return 'maViTri';
	}

	static get relationMappings() {
		return {
			nhanVien: {
				relation: Model.HasManyRelation,
				modelClass: ViTri,
				join: {
					from: `${TABLE_NAME.vitri}.maViTri`,
					to: `${TABLE_NAME.nhanvien}.maViTri`
				}
			}
		};
	}
}