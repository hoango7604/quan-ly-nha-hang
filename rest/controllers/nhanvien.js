const ResHandlers = require('../shared/response_handlers');
const NhanVien = require('../models/quanlynhanvien/nhanvien');
const ViTri = require('../models/quanlynhanvien/vitri');
const { signToken } = require('../helpers/jwt_helpers');

const NhanVienController = {
	getNhanVien: async (req, res, next) => {
		const nhanvien = await NhanVien.query()
			.eager('viTri')
			.omit(['matKhau']);
		ResHandlers.ok(res, {
			data: nhanvien,
			total: nhanvien.length
		});
	},

	createNhanVien: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body
		// Check if nhanvien with the same tenDangNhap existed in database
		const existNhanVien = await NhanVien.query().findOne({
			tenDangNhap: req.value.validated.tenDangNhap
		});
		if (existNhanVien) {
			ResHandlers.clientError(res, {
				message: 'EXISTED_TENDANGNHAP',
				affectedRow: 0
			});
			return;
		}
		
		// Create new nhanvien
		const nhanvien = await NhanVien.query()
			.insert(req.value.validated)
			.eager('viTri')
			.omit(['matKhau']);
		ResHandlers.ok(res, {
			data: nhanvien,
			affectedRow: 1
		});
	},

	updateNhanVien: async (req, res, next) => {
		// Check if nhanvien with the same tenDangNhap existed in database
		if (req.value.validated.tenDangNhap) {
			const existNhanVien = await NhanVien.query().findOne({
				tenDangNhap: req.value.validated.tenDangNhap
			});
			if (existNhanVien && existNhanVien.maNhanVien !== req.value.validated.maNhanVien) {
				ResHandlers.clientError(res, {
					message: 'EXISTED_TENDANGNHAP',
					affectedRow: 0
				});
				return;
			}
		}
		
		const maNhanVien = req.value.validated.maNhanVien;
		const nhanvien = await NhanVien.query()
			.patchAndFetchById(maNhanVien, req.value.validated)
			.omit(['matKhau']);
		
		// Check if nhanvien with maNhanVien existed in database or not
		if (nhanvien !== undefined) {
			ResHandlers.ok(res, {
				data: nhanvien,
				affectedRow: 1
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_MANHANVIEN',
			affectedRow: 0
		});
	},

	deleteNhanVien: async (req, res, next) => {
		const maNhanVien = req.value.validated.maNhanVien;
			
		const deletedCount = await NhanVien.query().delete().whereIn('maNhanVien', maNhanVien);

		if (Boolean(deletedCount)) {
			ResHandlers.ok(res, {
				affectedRow: deletedCount
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_MANHANVIEN',
			affectedRow: 0
		});
	},

	getViTri: async (req, res, next) => {
		const vitri = await ViTri.query();
		ResHandlers.ok(res, {
			data: vitri,
			total: vitri.length
		});
	},

	createViTri: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body
		// Check if vitri with the same tenViTri existed in database
		const existViTri = await ViTri.query().findOne({
			tenViTri: req.value.validated.tenViTri
		});
		if (existViTri) {
			ResHandlers.clientError(res, {
				message: 'EXISTED_TENVITRI',
				affectedRow: 0
			});
			return;
		}
		
		// Create new vitri
		const vitri = await ViTri.query().insert(req.value.validated);
		ResHandlers.ok(res, { 
			data: vitri,
			affectedRow: 1
		});
	},

	updateViTri: async (req, res, next) => {
		// Check if vitri with the same tenViTri existed in database
		if (req.value.validated.tenViTri) {
			const existViTri = await ViTri.query().findOne({
				tenViTri: req.value.validated.tenViTri
			});
			if (existViTri && existViTri.maViTri !== req.value.validated.maViTri) {
				ResHandlers.clientError(res, {
					message: 'EXISTED_TENVITRI',
					affectedRow: 0
				});
				return;
			}
		}
		
		const maViTri = req.value.validated.maViTri;
		const vitri = await ViTri.query().patchAndFetchById(maViTri, req.value.validated);
		
		// Check if vitri with maViTri existed in database or not
		if (vitri !== undefined) {
			ResHandlers.ok(res, {
				data: vitri,
				affectedRow: 1
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_MAVITRI',
			affectedRow: 0
		});
	},

	deleteViTri: async (req, res, next) => {
		const maViTri = req.value.validated.maViTri;
			
		const deletedCount = await ViTri.query().delete().whereIn('maViTri', maViTri);

		if (Boolean(deletedCount)) {
			ResHandlers.ok(res, {
				affectedRow: deletedCount
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_MAVITRI',
			affectedRow: 0
		});
	},

	login: async (req, res, next) => {
		ResHandlers.ok(res, {
			nhanVien: req.user,
			accessToken: signToken(req.user.maNhanVien)
		});
	},
};

module.exports = NhanVienController;