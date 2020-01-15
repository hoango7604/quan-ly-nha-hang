const { Model } = require('../base-model');
const { TABLE_NAME } = require('../../shared/share_modules');

module.exports = class ChiTietPhieuChonMon extends Model {

	static get tableName() {
		return TABLE_NAME.chitietphieuchonmon;
	}

	static get idColumn() {
		return ['maPhieuChon', 'maMonAn', 'maNhanVien'];
	}

	static get relationMappings() {
		const PhieuChonMon = require('./phieuchonmon');
		const MonAn = require('../quanlymenu/monan');
		const NhanVien = require('../quanlynhanvien/nhanvienWithoutPassword');

		return {
			phieuChonMon: {
				relation: Model.BelongsToOneRelation,
				modelClass: PhieuChonMon,
				join: {
					from: `${TABLE_NAME.chitietphieuchonmon}.maPhieuChon`,
					to: `${TABLE_NAME.phieuchonmon}.maPhieuChon`
				}
			},

			monAn: {
				relation: Model.BelongsToOneRelation,
				modelClass: MonAn,
				join: {
					from: `${TABLE_NAME.chitietphieuchonmon}.maMonAn`,
					to: `${TABLE_NAME.monan}.maMonAn`
				}
			},

			nhanVien: {
				relation: Model.BelongsToOneRelation,
				modelClass: NhanVien,
				join: {
					from: `${TABLE_NAME.chitietphieuchonmon}.maNhanVien`,
					to: `${TABLE_NAME.nhanvien}.maNhanVien`
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
		this.thanhTien = this.gia * this.soLuong;
	}

	/**
	 * @override
	 * [ObjectionJS]
	 */
	$beforeUpdate(opt, queryContext) {
		super.$beforeUpdate(opt, queryContext);
		this.thanhTien = this.gia * this.soLuong;
	}
}