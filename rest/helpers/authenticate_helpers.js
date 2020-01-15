const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const NhanVien = require('../models/quanlynhanvien/nhanvien');
const { compareRawValueWithHashValue } = require('../helpers/crypto_helpers');
const { JWT_SECRET } = require('../shared/share_modules');

const nhanvienReturnDto = (nhanvien) => {
	if (nhanvien instanceof Array) {
		return nhanvien.map(nv => {
			let result = Object.assign({}, nv);
			delete result.matKhau;
			return result;
		});
	}

	let nv = Object.assign({}, nhanvien);
	delete nv.matKhau;
	return nv;
}

/**
 * Initializes passport using JWT Strategy (Web token)
 */
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: JWT_SECRET
}, async (payload, done) => {
	try {
		// Find nhanvien by maNhanVien attached in token
		const nhanvien = await NhanVien.query().findById(payload.sub);
		if (!nhanvien) {
			return done(null, false);
		}

		// Expired token
		if (new Date().getTime() > payload.exp) {
			return done(null, false);
		}

		done(null, nhanvienReturnDto(nhanvien));
	} catch (error) {
		done(error, false);
	}
}));

/**
 * Initializes passport using Local Strategy (username - password)
 */
passport.use(new LocalStrategy({
	usernameField: 'tenDangNhap',
	passwordField: 'matKhau'
}, async (tenDangNhap, matKhau, done) => {
	try {
		// Find nhanvien by tenDangNhap
		const nhanvien = await NhanVien.query().findOne({
			tenDangNhap
		});
	
		// Check if nhanvien exists
		if (!nhanvien) {
			return done(null, false);
		}
	
		// Check if matKhau is correct
		if (!compareRawValueWithHashValue(matKhau, nhanvien.matKhau)) {
			return done(null, false);
		}
	
		// If all are validated
		done(null, nhanvienReturnDto(nhanvien));
	} catch (error) {
		done(error, false);
	}
}));

module.exports = passport;