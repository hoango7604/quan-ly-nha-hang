const NhanVien = require('./nhanvien');
const { TABLE_NAME } = require('../../shared/share_modules');

module.exports = class NhanVienWithoutPassword extends NhanVien {
	/**
	 * @override
	 * [ObjectionJS]
	 */
	$afterGet(queryContext) {
		super.$afterGet(queryContext);
		delete this.matKhau;
		delete this.maViTri;
	}
}