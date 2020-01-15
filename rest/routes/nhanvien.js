const router = require('express-promise-router')();

const NhanVienController = require('../controllers/nhanvien');
const passport = require('../helpers/authenticate_helpers');
const { validateQueryInput, validateBodyInput, schemas } = require('../shared/share_modules');

router.route('/')
	.get(
		// passport.authenticate('jwt', { session: false }),
		NhanVienController.getNhanVien
	)
	.post(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.createNhanVienSchema),
		NhanVienController.createNhanVien
	)
	.patch(
		// passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.updateNhanVienSchema),
		NhanVienController.updateNhanVien
	)
	.delete(
		// passport.authenticate('jwt', { session: false }),
		validateQueryInput(schemas.deleteNhanVienSchema),
		NhanVienController.deleteNhanVien
	);

router.route('/vitri')
	.get(
		// passport.authenticate('jwt', { session: false }),
		NhanVienController.getViTri
	)
	.post(
		passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.createViTriSchema),
		NhanVienController.createViTri
	)
	.patch(
		passport.authenticate('jwt', { session: false }),
		validateBodyInput(schemas.updateViTriSchema),
		NhanVienController.updateViTri
	)
	.delete(
		passport.authenticate('jwt', { session: false}),
		validateBodyInput(schemas.deleteViTriSchema),
		NhanVienController.deleteViTri
	);

router.route('/login')
	.post(
		validateBodyInput(schemas.loginSchema),
		passport.authenticate('local', { session: false }),
		NhanVienController.login
	);

module.exports = router;