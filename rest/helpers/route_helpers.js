const Joi = require('joi');
const ResHandlers = require('../shared/response_handlers');

// Schemas definitions
const NhanVienSchemas = {
	createNhanVienSchema: Joi.object().keys({
		tenNhanVien: Joi.string().min(5).required(),
		maViTri: Joi.number().required(),
		tenDangNhap: Joi.string().min(5).max(30).required(),
		matKhau: Joi.string().min(5).max(30).required()
	}),

	updateNhanVienSchema: Joi.object().keys({
		maNhanVien: Joi.number().required(),
		tenNhanVien: Joi.string().min(5).optional(),
		maViTri: Joi.number().forbidden(),
		tenDangNhap: Joi.string().min(5).max(30).optional(),
		matKhau: Joi.string().min(5).max(30).optional()
	}),

	deleteNhanVienSchema: Joi.object().keys({
		maNhanVien: Joi.array().single().items(Joi.number()).required()
	}),

	createViTriSchema: Joi.object().keys({
		tenViTri: Joi.string().min(5).required()
	}),

	updateViTriSchema: Joi.object().keys({
		maViTri: Joi.number().required(),
		tenViTri: Joi.string().min(5).optional()
	}),

	deleteViTriSchema: Joi.object().keys({
		maViTri: Joi.array().single().items(Joi.number()).required()
	}),

	loginSchema: Joi.object().keys({
		tenDangNhap: Joi.string().min(5).max(30).required(),
		matKhau: Joi.string().min(5).max(30).required()
	})
};

const CaSchemas = {
	createCaLamViecSchema: Joi.object().keys({
		tenCa: Joi.string().min(5).required(),
		thoiGianBatDau: Joi.string().required(),
		thoiGianKetThuc: Joi.string().required()
	}),

	updateCaLamViecSchema: Joi.object().keys({
		maCa: Joi.number().required(),
		tenCa: Joi.string().min(5).required(),
		thoiGianBatDau: Joi.string().required(),
		thoiGianKetThuc: Joi.string().required()
	}),

	deleteCaLamViecSchema: Joi.object().keys({
		maCa: Joi.array().single().items(Joi.number()).required()
	}),

	getNhanVienOutOfCaLamViecSchema: Joi.object().keys({
		maCa: Joi.number().required(),
	}),

	createBangChiaCaSchema: Joi.object().keys({
		maCa: Joi.number().required(),
		maNhanVien: Joi.array().single().items(Joi.number()).required()
	}),

	deleteBangChiaCaSchema: Joi.object().keys({
		maCa: Joi.number().required(),
		maNhanVien: Joi.array().single().items(Joi.number()).required()
	})
};

const MenuSchemas = {
	createMonAnSchema: Joi.object().keys({
		tenMonAn: Joi.string().min(5).required(),
		maDanhMuc: Joi.number().required(),
		gia: Joi.number().required(),
		moTa: Joi.string().optional(),
		hinhAnh: Joi.string().optional(),
		khoaMon: Joi.boolean().optional().default(false),
		ghiChu: Joi.string().optional()
	}),

	updateMonAnSchema: Joi.object().keys({
		maMonAn: Joi.number().required(),
		tenMonAn: Joi.string().min(5).optional(),
		maDanhMuc: Joi.number().optional(),
		moTa: Joi.string().optional(),
		gia: Joi.number().optional(),
		hinhAnh: Joi.string().optional(),
		khoaMon: Joi.boolean().optional(),
		ghiChu: Joi.string().optional()
	}),

	deleteMonAnSchema: Joi.object().keys({
		maMonAn: Joi.array().single().items(Joi.number()).required()
	}),

	createDanhMucMonSchema: Joi.object().keys({
		tenDanhMuc: Joi.string().min(5).required(),
		moTa: Joi.string().optional(),
		hinhAnh: Joi.string().optional()
	}),

	updateDanhMucMonSchema: Joi.object().keys({
		maDanhMuc: Joi.number().required(),
		tenDanhMuc: Joi.string().min(5).required(),
		moTa: Joi.string().optional(),
		hinhAnh: Joi.string().optional()
	}),

	deleteDanhMucMonSchema: Joi.object().keys({
		maDanhMuc: Joi.array().single().items(Joi.number()).required()
	}),
};

const HoaDonSchemas = {
	createHoaDonSchema: Joi.object().keys({
		maPhieuChon: Joi.number().required(),
		giamGia: Joi.number().optional().default(0),
		ghiChu: Joi.string().optional()
	}),
};

const TRANG_THAI_BAN_AN = ['DANGTRONG', 'DACOKHACH', 'DANGTHANHTOAN'];

const BanSchemas = {
	updateBanAnSchema: Joi.object().keys({
		maBan: Joi.number().required(),
		trangThai: Joi.string().valid(TRANG_THAI_BAN_AN).required()
	}),

	getPhieuChonMonSchema: Joi.object().keys({
		isPaymentRequest: Joi.boolean().optional().default(false)
	}),

	createPhieuChonMonSchema: Joi.object().keys({
		maBan: Joi.number().required()
	}),

	createChiTietPhieuChonMonSchema: Joi.object().keys({
		maPhieuChon: Joi.number().required(),
		maMonAn: Joi.number().required(),
		maNhanVien: Joi.number().required(),
		soLuong: Joi.number().optional().default(1),
		gia: Joi.number().required(),
		ghiChu: Joi.string().optional(),
		huyMon: Joi.boolean().optional().default(false),
		lyDo: Joi.string().optional()
	}),

	updateChiTietPhieuChonMonSchema: Joi.object().keys({
		maPhieuChon: Joi.number().required(),
		maMonAn: Joi.number().required(),
		maNhanVien: Joi.number().required(),
		gia: Joi.number().required(),
		soLuong: Joi.number().required(),
		ghiChu: Joi.string().optional(),
		huyMon: Joi.boolean().optional(),
		lyDo: Joi.string().optional()
	}),
};


module.exports = {
	validateQueryInput: (schema) => {
		return (req, res, next) => {
			const result = Joi.validate(req.query, schema);

			if (result.error) {
				return ResHandlers.clientError(res, result.error);
			}

			if (!req.value) {
				req.value = {};
			}

			req.value.validated = result.value;
			next();
		}
	},

	validateBodyInput: (schema) => {
		return (req, res, next) => {
			const result = Joi.validate(req.body, schema);

			if (result.error) {
				return ResHandlers.clientError(res, result.error);
			}

			if (!req.value) {
				req.value = {};
			}

			req.value.validated = result.value;
			next();
		}
	},

	schemas: {
		...NhanVienSchemas,
		...CaSchemas,
		...MenuSchemas,
		...HoaDonSchemas,
		...BanSchemas
	}
};