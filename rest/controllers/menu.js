const ResHandlers = require('../shared/response_handlers');
const DanhMucMon = require('../models/quanlymenu/danhmucmon');
const MonAn = require('../models/quanlymenu/monan');

const MenuController = {
	getMonAn: async (req, res, next) => {
		const monan = await MonAn.query().eager('danhMucMon');
		ResHandlers.ok(res, {
			data: monan,
			total: monan.length
		});
	},

	createMonAn: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;
		
		// Create new calamviec
		const monan = await MonAn.query().insert(validatedInput);
		ResHandlers.ok(res, {
			data: monan,
			affectedRow: 1
		});
		
	},

	updateMonAn: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;

		// Update calamviec
		const monan = await MonAn.query().patchAndFetchById(validatedInput.maMonAn, validatedInput);

		// Check if calamviec with maCa existed in database or not
		if (monan !== undefined) {
			ResHandlers.ok(res, {
				data: monan,
				affectedRow: 1
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_MAMONAN',
			affectedRow: 0
		});
	},

	deleteMonAn: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;
		const maMonAn = validatedInput.maMonAn;
			
		const deletedCount = await MonAn.query().delete().whereIn('maMonAn', maMonAn);

		if (Boolean(deletedCount)) {
			ResHandlers.ok(res, {
				affectedRow: deletedCount
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_MAMONAN',
			affectedRow: 0
		});
	},

	getDanhMucMon: async (req, res, next) => {
		const danhmucmon = await DanhMucMon.query();
		ResHandlers.ok(res, {
			data: danhmucmon,
			total: danhmucmon.length
		});
	},

	createDanhMucMon: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;
		
		// Create new calamviec
		const danhmucmon = await DanhMucMon.query().insert(validatedInput);
		ResHandlers.ok(res, {
			data: danhmucmon,
			affectedRow: 1
		});
		
	},

	updateDanhMucMon: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;

		// Update calamviec
		const danhmucmon = await DanhMucMon.query().patchAndFetchById(validatedInput.maDanhMuc, validatedInput);

		// Check if calamviec with maCa existed in database or not
		if (danhmucmon !== undefined) {
			ResHandlers.ok(res, {
				data: danhmucmon,
				affectedRow: 1
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_MADANHMUC',
			affectedRow: 0
		});
	},

	deleteDanhMucMon: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;
		const maDanhMuc = validatedInput.maDanhMuc;
			
		const deletedCount = await DanhMucMon.query().delete().whereIn('maDanhMuc', maDanhMuc);

		if (Boolean(deletedCount)) {
			ResHandlers.ok(res, {
				affectedRow: deletedCount
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_MADANHMUC',
			affectedRow: 0
		});
	},
};

module.exports = MenuController;