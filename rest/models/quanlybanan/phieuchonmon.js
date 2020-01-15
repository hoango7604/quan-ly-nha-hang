const { Model } = require('../base-model');
const { TABLE_NAME } = require('../../shared/share_modules');
const { toTimeString, toMoment, moment } = require('../../helpers/date_helpers');

module.exports = class PhieuChonMon extends Model {

	static get tableName() {
		return TABLE_NAME.phieuchonmon;
	}

	static get idColumn() {
		return 'maPhieuChon';
	}

	static get relationMappings() {
		const BanAn = require('./banan');
		const MonAn = require('../quanlymenu/monan');
		const ChiTietPhieuChonMon = require('./chitietphieuchonmon');
		const HoaDon = require('../quanlyhoadon/hoadon');

		return {
			banAn: {
				relation: Model.BelongsToOneRelation,
				modelClass: BanAn,
				join: {
					from: `${TABLE_NAME.phieuchonmon}.maBan`,
					to: `${TABLE_NAME.banan}.maBan`
				}
			},

			monAn: {
				relation: Model.ManyToManyRelation,
				modelClass: MonAn,
				join: {
					from: `${TABLE_NAME.phieuchonmon}.maPhieuChon`,
					through: {
						from: `${TABLE_NAME.chitietphieuchonmon}.maPhieuChon`,
						to: `${TABLE_NAME.chitietphieuchonmon}.maMonAn`
					},
					to: `${TABLE_NAME.monan}.maMonAn`
				}
			},

			chiTietPhieuChonMon: {
				relation: Model.HasManyRelation,
				modelClass: ChiTietPhieuChonMon,
				join: {
					from: `${TABLE_NAME.phieuchonmon}.maPhieuChon`,
					to: `${TABLE_NAME.chitietphieuchonmon}.maPhieuChon`
				}
			},

			hoaDon: {
				relation: Model.HasOneRelation,
				modelClass: HoaDon,
				join: {
					from: `${TABLE_NAME.phieuchonmon}.maPhieuChon`,
					to: `${TABLE_NAME.hoadon}.maPhieuChon`
				}
			}
		};
	}

	/**
	 * @override
	 * [ObjectionJS]
	 */
	$beforeInsert(queryContext) {
		super.$beforeInsert(queryContext);
		this.ngayTao = moment().format();
	}

	/**
	 * @override
	 * [ObjectionJS]
	 */
	$parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json)
        // Do your conversion here.
        return {
            ...json,
            ngayTao: toMoment(json.ngayTao),
        }
    }
}