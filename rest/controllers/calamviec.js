const ResHandlers = require('../shared/response_handlers');
const { moment, toMoment, toTimeString, isSameWeek } = require('../helpers/date_helpers');
const CaLamViec = require('../models/quanlyca/calamviec');
const BangChiaCa = require('../models/quanlyca/bangchiaca');
const NhanVien = require('../models/quanlynhanvien/nhanvien');

const convertDateOfInputToMoment = (input) => {
	const parsedObj = {
		...input,
		thoiGianBatDau: input.thoiGianBatDau ? toMoment(input.thoiGianBatDau) : undefined,
		thoiGianKetThuc: input.thoiGianKetThuc ? toMoment(input.thoiGianKetThuc) : undefined
	};

	Object.keys(parsedObj).map(key => {
		if (parsedObj[key] == undefined) {
			delete parsedObj[key];
		}
	});

	return parsedObj;
}

const convertDateOfInputToString = (input) => {
	return {
		...input,
		thoiGianBatDau: toTimeString(input.thoiGianBatDau),
		thoiGianKetThuc: toTimeString(input.thoiGianKetThuc)
	}
}

const isValidatedCaLamViecConstraints = async (input, res) => {
	const existCaLamViec = await CaLamViec.query()
		.where('tenCa', '=', input.tenCa);
	
	// Check if caLamViec with the same tenCa ON THE WEEK existed in database
	if (Array.isArray(existCaLamViec) && existCaLamViec.length > 0) {
		if (!existCaLamViec.every(calamviec => {
			if ((input.maCa && calamviec.maCa != input.maCa) || !input.maCa) {
				return !isSameWeek(input.thoiGianBatDau, calamviec.thoiGianBatDau)
			}
			return true;
		})) {
			ResHandlers.clientError(res, {
				message: 'EXISTED_TENCA',
				affectedRow: 0
			});
			return false;
		}
	}

	// Check if thoiGianBatDau is not greater than thoiGianKetThuc
	if (!input.thoiGianBatDau.isSameOrBefore(input.thoiGianKetThuc)) {
		ResHandlers.clientError(res, {
			message: 'THOIGIANBATDAU_MUST_BEFORE_THOIGIANKETTHUC',
			affectedRow: 0
		});
		return false;
	}

	// Check if thoiGianBatDau is after the current date
	if (!input.thoiGianBatDau.isSameOrAfter(moment(), 'date')) {
		ResHandlers.clientError(res, {
			message: 'THOIGIANBATDAU_MUST_SAME_OR_AFTER_THE_CURRENT_DATE',
			affectedRow: 0
		});
		return false;
	}

	return true;
}

const CaLamViecController = {
	getCaLamViec: async (req, res, next) => {
		const calamviec = await CaLamViec.query().eager('nhanVien');
		ResHandlers.ok(res, {
			data: calamviec.map(clv => convertDateOfInputToString(clv)),
			total: calamviec.length
		});
	},

	createCaLamViec: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = convertDateOfInputToMoment(req.value.validated);
		
		if (await isValidatedCaLamViecConstraints(validatedInput, res)) {
			// Create new calamviec
			const calamviec = await CaLamViec.query().insert(validatedInput);
			ResHandlers.ok(res, {
				data: convertDateOfInputToString(calamviec),
				affectedRow: 1
			});
		}
	},

	updateCaLamViec: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = convertDateOfInputToMoment(req.value.validated);

		if (await isValidatedCaLamViecConstraints(validatedInput, res)) {
			// Update calamviec
			const calamviec = await CaLamViec.query().patchAndFetchById(validatedInput.maCa, validatedInput);

			// Check if calamviec with maCa existed in database or not
			if (calamviec !== undefined) {
				ResHandlers.ok(res, {
					data: convertDateOfInputToString(calamviec),
					affectedRow: 1
				});
				return;
			}
	
			ResHandlers.clientError(res, {
				message: 'INVALID_MACA',
				affectedRow: 0
			});
		}
	},

	deleteCaLamViec: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = convertDateOfInputToMoment(req.value.validated);
		const maCa = validatedInput.maCa;
			
		const deletedCount = await CaLamViec.query().delete().whereIn('maCa', maCa);

		if (Boolean(deletedCount)) {
			ResHandlers.ok(res, {
				affectedRow: deletedCount
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_MACA',
			affectedRow: 0
		});
	},

	getNhanVienOutOfCaLamViec: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body
		const validatedInput = req.value.validated;
		const nhanvien = await NhanVien.query().omit(['matKhau']);
		const calamviec = await CaLamViec.query().findById(validatedInput.maCa).eager('nhanVien');

		let result;
		if (calamviec && calamviec.nhanVien.length > 0) {
			result = nhanvien.filter(nv => calamviec.nhanVien.every(nvc => nv.maNhanVien != nvc.maNhanVien));
		}
		else {
			result = nhanvien;
		}

		ResHandlers.ok(res, { 
			data: result,
			total: result.length
		});
	},

	createBangChiaCa: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body
		const validatedInput = req.value.validated;
		const listMaNhanVien = validatedInput.maNhanVien;

		// Check if vitri with the same tenViTri existed in database
		for (maNhanVien of listMaNhanVien) {
			const existBangChiaCa = await BangChiaCa.query().findOne({
				maCa: validatedInput.maCa,
				maNhanVien
			});
			if (existBangChiaCa) {
				ResHandlers.clientError(res, {
					message: 'EXISTED_NHANVIEN_IN_CALAMVIEC',
					affectedRow: 0
				});
				return;
			}
		}

		const bangChiaCaInput = listMaNhanVien.map(maNhanVien => {
			return {
				maCa: validatedInput.maCa, 
				maNhanVien
			} 
		});
		
		// Create new vitri
		const bangchiaca = await BangChiaCa.query().insert(bangChiaCaInput);
		ResHandlers.ok(res, { 
			data: bangchiaca,
			affectedRow: bangchiaca.length
		});
	},

	deleteBangChiaCa: async (req, res, next) => {
		const validatedInput = req.value.validated;
		const listMaNhanVien = validatedInput.maNhanVien;
			
		const deletedCount = await BangChiaCa.query().delete()
			.where({ maCa: validatedInput.maCa })
			.whereIn('maNhanVien', listMaNhanVien);

		if (Boolean(deletedCount)) {
			ResHandlers.ok(res, {
				affectedRow: deletedCount
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_BANGCHIACA',
			affectedRow: 0
		});
	}
};

module.exports = CaLamViecController;