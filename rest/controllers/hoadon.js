const ResHandlers = require('../shared/response_handlers');
const HoaDon = require('../models/quanlyhoadon/hoadon');
const PhieuChonMon = require('../models/quanlybanan/phieuchonmon');
const BanAn = require('../models/quanlybanan/banan');
const MonAn = require('../models/quanlymenu/monan');
const ChiTietPhieuChonMon = require('../models/quanlybanan/chitietphieuchonmon');
const { toTimeString } = require('../helpers/date_helpers');

const convertDateOfInputToString = (input) => {
	return {
		...input,
		ngayTao: toTimeString(input.ngayTao),
	}
}

const HoaDonController = {
	getHoaDon: async (req, res, next) => {
		const hoadon = await HoaDon.query()
			.eager('phieuChonMon.[ banAn, chiTietPhieuChonMon.monAn ]')
			.pick(PhieuChonMon, ['ngayTao', 'banAn', 'chiTietPhieuChonMon'])
			.pick(BanAn, ['maBan', 'tenBan'])
			.pick(ChiTietPhieuChonMon, ['monAn', 'gia', 'soLuong', 'tongTien'])
			.pick(MonAn, ['maMonAn', 'tenMonAn']);

		hoadon.map(hd => hd.phieuChonMon = convertDateOfInputToString(hd.phieuChonMon));

		ResHandlers.ok(res, {
			data: hoadon,
			total: hoadon.length
		});
	},

	createHoaDon: async (req, res, next) => {
		// After validate input fields, the validated req.body is attached to req.value.body	
		// temp, change when add middleware
		const validatedInput = req.value.validated;

		const existHoaDon = await HoaDon.query().findOne({
			maPhieuChon: validatedInput.maPhieuChon
		});

		if (existHoaDon) {
			ResHandlers.clientError(res, {
				message: 'EXISTED_HOADON_WITH_MAPHIEUCHON',
				affectedRow: 0
			});
			return;
		}

		const phieuchonmon = await PhieuChonMon.query()
			.findById(validatedInput.maPhieuChon)
			.eager('chiTietPhieuChonMon')
			.filterEager('chiTietPhieuChonMon', builder => {
				builder.where({ huyMon: false }).pick(['thanhTien']);
			});

		let tongTien = 0;
		phieuchonmon.chiTietPhieuChonMon.forEach(ctp => tongTien += ctp.thanhTien);
		validatedInput.tongTien = tongTien;
		
		// Create new calamviec{ huyMon: false }
		const hoadon = await HoaDon.query().insert(validatedInput)
			.eager('phieuChonMon.[ banAn, chiTietPhieuChonMon.monAn ]')
			.pick(PhieuChonMon, ['ngayTao', 'banAn', 'chiTietPhieuChonMon'])
			.pick(BanAn, ['maBan', 'tenBan'])
			.pick(ChiTietPhieuChonMon, ['monAn', 'gia', 'soLuong', 'tongTien'])
			.pick(MonAn, ['maMonAn', 'tenMonAn']);

		hoadon.phieuChonMon = convertDateOfInputToString(hoadon.phieuChonMon);

		await BanAn.query().updateAndFetchById(hoadon.phieuChonMon.banAn.maBan, {
			maBan: hoadon.phieuChonMon.banAn.maBan,
			trangThai: 'DANGTRONG'
		});

		ResHandlers.ok(res, {
			data: hoadon,
			affectedRow: 1
		});
		
	},
};

module.exports = HoaDonController;