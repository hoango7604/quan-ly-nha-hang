const router = require('express-promise-router')();

const BanAnController = require('../controllers/banan');
const passport = require('../helpers/authenticate_helpers');
const { validateQueryInput, validateBodyInput, schemas } = require('../shared/share_modules');

router.route('/')
	.get(
		// passport.authenticate('jwt', { session: false }),
		BanAnController.getBanAn
	)
	.patch(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.updateBanAnSchema),
		BanAnController.updateBanAn
	);

router.route('/phieuchonmon')
	.get(
		// passport.authenticate('jwt', { session: false }),
		validateQueryInput(schemas.getPhieuChonMonSchema),
		BanAnController.getPhieuChonMon
	)
	.post(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.createPhieuChonMonSchema),
		BanAnController.createPhieuChonMon
	);

router.route('/chitietphieuchonmon')
	.post(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.createChiTietPhieuChonMonSchema),
		BanAnController.createChiTietPhieuChonMon
	)
	.patch(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.updateChiTietPhieuChonMonSchema),
		BanAnController.updateChiTietPhieuChonMon
	);

module.exports = router;