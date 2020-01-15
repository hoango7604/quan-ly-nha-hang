const router = require('express-promise-router')();

const HoaDonController = require('../controllers/hoadon');
const passport = require('../helpers/authenticate_helpers');
const { validateBodyInput, schemas } = require('../shared/share_modules');

router.route('/')
	.get(
		// passport.authenticate('jwt', { session: false }),
		HoaDonController.getHoaDon
	)
	.post(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.createHoaDonSchema),
		HoaDonController.createHoaDon
	);

module.exports = router;