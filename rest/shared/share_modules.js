/**
 * Imports modules for public uses in this project
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Knex = require('knex');
// const config = require('config');
const { Model } = require('objection');
const { validateBodyInput, validateQueryInput, schemas } = require('../helpers/route_helpers');
const knexConfig = require('../_database/knexfile')

// const knexConnection = Knex(config.get('db_config'));
const knexConnection = Knex(knexConfig);
Model.knex(knexConnection);

const TABLE_NAME = {
	vitri: 'doan_vitri',
	nhanvien: 'doan_nhanvien',
	calamviec: 'doan_calamviec',
	bangchiaca: 'doan_bangchiaca',
	danhmucmon: 'doan_danhmucmon',
	monan: 'doan_monan',
	banan: 'doan_banan',
	phieuchonmon: 'doan_phieuchonmon',
	chitietphieuchonmon: 'doan_chitietphieuchonmon',
	hoadon: 'doan_hoadon'
}

// const JWT_SECRET = config.get('JWT_SECRET');
const JWT_SECRET = 'Pk3Wgq4Zol7fHVRF7vW3';

app.use(bodyParser.json());

module.exports = {
	express,
	cors,
	bodyParser,
	app,
	validateBodyInput,
	validateQueryInput,
	schemas,
	Model,

	TABLE_NAME,
	JWT_SECRET
}