const { Model } = require('../base-model');
const { hashValue } = require('../../helpers/crypto_helpers');
const { TABLE_NAME } = require('../../shared/share_modules');

module.exports = class NhanVien extends Model {

	static get tableName() {
		return TABLE_NAME.nhanvien;
	}

	static get idColumn() {
		return 'maNhanVien';
	}

	static get relationMappings() {
		const ViTri = require('./vitri');
		const CaLamViec = require('../quanlyca/calamviec');

		return {
			viTri: {
				relation: Model.BelongsToOneRelation,
				modelClass: ViTri,
				join: {
					from: `${TABLE_NAME.nhanvien}.maViTri`,
					to: `${TABLE_NAME.vitri}.maViTri`
				}
			},

			caLamViec: {
				relation: Model.ManyToManyRelation,
				modelClass: CaLamViec,
				join: {
					from: `${TABLE_NAME.nhanvien}.maNhanVien`,
					through: {
						from: `${TABLE_NAME.bangchiaca}.maNhanVien`,
						to: `${TABLE_NAME.bangchiaca}.maCa`
					},
					to: `${TABLE_NAME.calamviec}.maCa`
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
		this.matKhau = hashValue(this.matKhau);
	}

	/**
	 * @override
	 * [ObjectionJS]
	 */
	$beforeUpdate(opt, queryContext) {
		super.$beforeUpdate(opt, queryContext);
		if (this.matKhau) {
			this.matKhau = hashValue(this.matKhau);
		}
	}
}