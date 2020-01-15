const ResHandlers = require('../shared/response_handlers');
const BanAn = require('../models/quanlybanan/banan');
const PhieuChonMon = require('../models/quanlybanan/phieuchonmon');
const ChiTietPhieuChonMon = require('../models/quanlybanan/chitietphieuchonmon');
const NhanVien = require('../models/quanlynhanvien/nhanvienWithoutPassword');
const MonAn = require('../models/quanlymenu/monan');
const { toTimeString } = require('../helpers/date_helpers');

const convertDateOfInputToString = (input) => {
	return {
		...input,
		ngayTao: toTimeString(input.ngayTao),
	}
}

const BanAnController = {
	getBanAn: async (req, res, next) => {
		const banan = await BanAn.query();
		ResHandlers.ok(res, {
			data: banan,
			total: banan.length
		});
	},

	updateBanAn: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;
		const banan = await BanAn.query().updateAndFetchById(validatedInput.maBan, validatedInput);
		if (banan) {
			ResHandlers.ok(res, {
				data: banan,
				affectedRow: 1
			});
			return;
		}
		
		ResHandlers.clientError(res, {
			message: 'INVALID_MABANAN',
			affectedRow: 0
		});
	},

	getPhieuChonMon: async (req, res, next) => {
		const validatedInput = req.value.validated;

		const phieuchonmon = await PhieuChonMon.query()
			.eager('[ banAn, chiTietPhieuChonMon.[ monAn, nhanVien ], hoaDon ]')
			.omit(ChiTietPhieuChonMon, ['maPhieuChon', 'maMonAn', 'maNhanVien'])
			.pick(NhanVien, ['maNhanVien', 'tenNhanVien'])
			.pick(MonAn, ['maMonAn', 'tenMonAn']);

		if (!validatedInput.isPaymentRequest) {
			ResHandlers.ok(res, {
				data: phieuchonmon.map(pcm => convertDateOfInputToString(pcm)),
				total: phieuchonmon.length
			});
			return;
		}
		else {
			const phieuchonmonPaymentPending = phieuchonmon.filter(pcm => pcm.hoaDon == null && pcm.banAn.trangThai == 'DANGTHANHTOAN');
			ResHandlers.ok(res, {
				data: phieuchonmonPaymentPending.map(pcm => convertDateOfInputToString(pcm)),
				total: phieuchonmonPaymentPending.length
			});
			return;
		}
	},

	createPhieuChonMon: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;
		
		// Create new calamviec
		const phieuchonmon = await PhieuChonMon.query().insert(validatedInput);
		await BanAn.query().updateAndFetchById(validatedInput.maBan, {
			maBan: validatedInput.maBan,
			trangThai: 'DACOKHACH'
		});

		ResHandlers.ok(res, {
			data: phieuchonmon,
			affectedRow: 1
		});
		
	},

	createChiTietPhieuChonMon: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;
		
		// Create new calamviec
		const chitietphieuchonmon = await ChiTietPhieuChonMon.query().insert(validatedInput);
		ResHandlers.ok(res, {
			data: chitietphieuchonmon,
			affectedRow: 1
		});
		
	},

	updateChiTietPhieuChonMon: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;

		// Update calamviec
		const chitietphieuchonmon = await ChiTietPhieuChonMon.query().patchAndFetchById(
			[validatedInput.maPhieuChon, validatedInput.maMonAn, validatedInput.maNhanVien], 
			validatedInput
		);

		// Check if calamviec with maCa existed in database or not
		if (chitietphieuchonmon !== undefined) {
			ResHandlers.ok(res, {
				data: chitietphieuchonmon,
				affectedRow: 1
			});
			return;
		}

		ResHandlers.clientError(res, {
			message: 'INVALID_CHITIETPHIEUCHONMON',
			affectedRow: 0
		});
	}
};

module.exports = BanAnController;