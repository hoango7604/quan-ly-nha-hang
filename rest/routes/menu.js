const router = require('express-promise-router')();

const MenuController = require('../controllers/menu');
const passport = require('../helpers/authenticate_helpers');
const { validateBodyInput, schemas } = require('../shared/share_modules');

router.route('/')
	.get(
		// passport.authenticate('jwt', { session: false }),
		MenuController.getMonAn
	)
	.post(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.createMonAnSchema),
		MenuController.createMonAn
	)
	.patch(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.updateMonAnSchema),
		MenuController.updateMonAn
	)
	.delete(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.deleteMonAnSchema),
		MenuController.deleteMonAn
	);

router.route('/danhmucmon')
	.get(
		// passport.authenticate('jwt', { session: false }),
		MenuController.getDanhMucMon
	)
	.post(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.createDanhMucMon),
		MenuController.createDanhMucMon
	)
	.patch(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.updateDanhMucMonSchema),
		MenuController.updateDanhMucMon
	)
	.delete(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.deleteDanhMucMonSchema),
		MenuController.deleteDanhMucMon
	);

module.exports = router;