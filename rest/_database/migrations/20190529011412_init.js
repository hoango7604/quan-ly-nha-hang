const { TABLE_NAME } = require('../../shared/share_modules');

exports.up = async function(knex, Promise) {

	const WITHOUT_TIMEZONE = true;
	const schema = knex.schema;

	await Promise.all([
		schema.dropTableIfExists(TABLE_NAME.hoadon),
		schema.dropTableIfExists(TABLE_NAME.chitietphieuchonmon),
		schema.dropTableIfExists(TABLE_NAME.phieuchonmon),
		schema.dropTableIfExists(TABLE_NAME.banan),
		schema.dropTableIfExists(TABLE_NAME.monan),
		schema.dropTableIfExists(TABLE_NAME.danhmucmon),
		schema.dropTableIfExists(TABLE_NAME.bangchiaca),
		schema.dropTableIfExists(TABLE_NAME.calamviec),
		schema.dropTableIfExists(TABLE_NAME.nhanvien),
		schema.dropTableIfExists(TABLE_NAME.vitri),
	]);
	
	await schema.createTable(TABLE_NAME.vitri, function(table) {
		table.increments('maViTri').primary();
		table.string('tenViTri', 30).notNullable();
	});

	await schema.createTable(TABLE_NAME.nhanvien, function(table) {
		table.increments('maNhanVien').primary();
		table.string('tenNhanVien', 30).notNullable();
		table.integer('maViTri').unsigned().references('maViTri').inTable(TABLE_NAME.vitri);
		table.string('tenDangNhap', 20).notNullable();
		table.string('matKhau', 100).notNullable();
	});

	await schema.createTable(TABLE_NAME.calamviec, function(table) {
		table.increments('maCa').primary();
		table.string('tenCa', 30).notNullable();
		table.timestamp('thoiGianBatDau', WITHOUT_TIMEZONE);
		table.timestamp('thoiGianKetThuc', WITHOUT_TIMEZONE);
	});

	await schema.createTable(TABLE_NAME.bangchiaca, function(table) {
		table.integer('maCa').unsigned().references('maCa').inTable(TABLE_NAME.calamviec);
		table.integer('maNhanVien').unsigned().references('maNhanVien').inTable(TABLE_NAME.nhanvien);

		table.primary(['maCa', 'maNhanVien']);
	});

	await schema.createTable(TABLE_NAME.danhmucmon, function(table) {
		table.increments('maDanhMuc').primary();
		table.string('tenDanhMuc', 30).notNullable();
		table.text('mota');
		table.string('hinhAnh', 255);
	});

	await schema.createTable(TABLE_NAME.monan, function(table) {
		table.increments('maMonAn').primary();
		table.string('tenMonAn', 50).notNullable();
		table.integer('maDanhMuc').unsigned().references('maDanhMuc').inTable(TABLE_NAME.danhmucmon);
		table.text('moTa');
		table.integer('gia').unsigned().notNullable();
		table.string('hinhAnh', 255);
		table.boolean('khoaMon').default(false).notNullable();
		table.text('ghiChu');
	});

	await schema.createTable(TABLE_NAME.banan, function(table) {
		table.increments('maBan').primary();
		table.string('tenBan', 30).notNullable();
		table.string('trangThai').notNullable().default('');
	});

	await schema.createTable(TABLE_NAME.phieuchonmon, function(table) {
		table.increments('maPhieuChon').primary();
		table.integer('maBan').unsigned().references('maBan').inTable(TABLE_NAME.banan);
		table.timestamp('ngayTao', WITHOUT_TIMEZONE).notNullable();
	});

	await schema.createTable(TABLE_NAME.chitietphieuchonmon, function(table) {
		table.integer('maPhieuChon').unsigned().references('maPhieuChon').inTable(TABLE_NAME.phieuchonmon);
		table.integer('maMonAn').unsigned().references('maMonAn').inTable(TABLE_NAME.monan);
		table.integer('maNhanVien').unsigned().references('maNhanVien').inTable(TABLE_NAME.nhanvien);
		table.integer('soLuong').unsigned().notNullable();
		table.integer('gia').unsigned().notNullable();
		table.integer('thanhTien').unsigned().notNullable();
		table.text('ghiChu');
		table.boolean('huyMon').default(false).notNullable();
		table.text('lyDo');

		table.primary(['maPhieuChon', 'maMonAn', 'maNhanVien']);
	});

	await schema.createTable(TABLE_NAME.hoadon, function(table) {
		table.increments('maHoaDon').primary();
		table.integer('maPhieuChon').unsigned().references('maPhieuChon').inTable(TABLE_NAME.phieuchonmon);
		table.integer('tongTien').unsigned().notNullable();
		table.integer('giamGia').unsigned();
		table.text('ghiChu');
	});

};

exports.down = async function(knex, Promise) {

	const schema = knex.schema;

	await Promise.all([
		schema.dropTableIfExists(TABLE_NAME.hoadon),
		schema.dropTableIfExists(TABLE_NAME.chitietphieuchonmon),
		schema.dropTableIfExists(TABLE_NAME.phieuchonmon),
		schema.dropTableIfExists(TABLE_NAME.banan),
		schema.dropTableIfExists(TABLE_NAME.monan),
		schema.dropTableIfExists(TABLE_NAME.danhmucmon),
		schema.dropTableIfExists(TABLE_NAME.bangchiaca),
		schema.dropTableIfExists(TABLE_NAME.calamviec),
		schema.dropTableIfExists(TABLE_NAME.nhanvien),
		schema.dropTableIfExists(TABLE_NAME.vitri),
	]);

};
