const { Model } = require('../base-model');
const { TABLE_NAME } = require('../../shared/share_modules');

module.exports = class HoaDon extends Model {

	static get tableName() {
		return TABLE_NAME.hoadon;
	}

	static get idColumn() {
		return 'maHoaDon';
	}

	static get relationMappings() {
		const PhieuChonMon = require('../quanlybanan/phieuchonmon');

		return {
			phieuChonMon: {
				relation: Model.BelongsToOneRelation,
				modelClass: PhieuChonMon,
				join: {
					from: `${TABLE_NAME.hoadon}.maPhieuChon`,
					to: `${TABLE_NAME.phieuchonmon}.maPhieuChon`
				}
			}
		};
	}
}