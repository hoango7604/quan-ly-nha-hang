const { Model } = require('../base-model');
const { TABLE_NAME } = require('../../shared/share_modules');

module.exports = class BangChiaCa extends Model {

	static get tableName() {
		return TABLE_NAME.bangchiaca;
	}

	static get idColumn() {
		return ['maCa', 'maNhanVien'];
	}

	static get relationMappings() {
		const CaLamViec = require('./calamviec');
		const NhanVien = require('../quanlynhanvien/nhanvienWithoutPassword');

		return {
			caLamViec: {
				relation: Model.BelongsToOneRelation,
				modelClass: CaLamViec,
				join: {
					from: `${TABLE_NAME.bangchiaca}.maCa`,
					to: `${TABLE_NAME.vitri}.maCa`
				}
			},

			nhanVien: {
				relation: Model.BelongsToOneRelation,
				modelClass: NhanVien,
				join: {
					from: `${TABLE_NAME.bangchiaca}.maNhanVien`,
					to: `${TABLE_NAME.nhanvien}.maNhanVien`
				}
			}
		};
	}
}