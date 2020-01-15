const router = require('express-promise-router')();

const CaLamViecController = require('../controllers/calamviec');
const passport = require('../helpers/authenticate_helpers');
const { validateQueryInput, validateBodyInput, schemas } = require('../shared/share_modules');

router.route('/')
	.get(
		// passport.authenticate('jwt', { session: false }),
		CaLamViecController.getCaLamViec
	)
	.post(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.createCaLamViecSchema),
		CaLamViecController.createCaLamViec
	)
	.patch(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.updateCaLamViecSchema),
		CaLamViecController.updateCaLamViec
	)
	.delete(
		// passport.authenticate('jwt', { session: false }),
		validateQueryInput(schemas.deleteCaLamViecSchema),
		CaLamViecController.deleteCaLamViec
	);

router.route('/nhanvienOutOfCa')
	.get(
		// passport.authenticate('jwt', { session: false }),
		validateQueryInput(schemas.getNhanVienOutOfCaLamViecSchema),
		CaLamViecController.getNhanVienOutOfCaLamViec
	);

router.route('/bangchiaca')
	.post(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.createBangChiaCaSchema),
		CaLamViecController.createBangChiaCa
	)
	.delete(
		// passport.authenticate('jwt', { session: false }),
		validateQueryInput(schemas.deleteBangChiaCaSchema),
		CaLamViecController.deleteBangChiaCa
	);

module.exports = router;