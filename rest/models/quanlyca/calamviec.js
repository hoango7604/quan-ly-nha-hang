const { Model } = require('../base-model');
const { TABLE_NAME } = require('../../shared/share_modules');
const { toTimeString, toMoment } = require('../../helpers/date_helpers');

module.exports = class CaLamViec extends Model {

	static get tableName() {
		return TABLE_NAME.calamviec;
	}

	static get idColumn() {
		return 'maCa';
	}

	static get relationMappings() {
		const NhanVien = require('../quanlynhanvien/nhanvienWithoutPassword');

		return {
			nhanVien: {
				relation: Model.ManyToManyRelation,
				modelClass: NhanVien,
				join: {
					from: `${TABLE_NAME.calamviec}.maCa`,
					through: {
						from: `${TABLE_NAME.bangchiaca}.maCa`,
						to: `${TABLE_NAME.bangchiaca}.maNhanVien`
					},
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

		if (this.thoiGianBatDau) {
			this.thoiGianBatDau = toTimeString(this.thoiGianBatDau);
		}

		if (this.thoiGianKetThuc) {
			this.thoiGianKetThuc = toTimeString(this.thoiGianKetThuc);
		}
	}

	/**
	 * @override
	 * [ObjectionJS]
	 */
	$beforeUpdate(opt, queryContext) {
		super.$beforeUpdate(opt, queryContext);
		
		if (this.thoiGianBatDau) {
			this.thoiGianBatDau = toTimeString(this.thoiGianBatDau);
		}

		if (this.thoiGianKetThuc) {
			this.thoiGianKetThuc = toTimeString(this.thoiGianKetThuc);
		}
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
            thoiGianBatDau: toMoment(json.thoiGianBatDau),
            thoiGianKetThuc: toMoment(json.thoiGianKetThuc),
        }
    }
}