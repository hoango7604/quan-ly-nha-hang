// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
const vitri = require('../models/quanlynhanvien/vitri');
const nhanvien = require('../models/quanlynhanvien/nhanvien');
const should = chai.should();

chai.use(chaiHttp);

describe('vitri controllers', () => {
	/**
	 * Empty the database before testing
	 */
	beforeEach(async done => {
		await vitri.query().truncate();
		done();
	});

	/**
	 * Test the /GET route
	 */
	describe('/GET nhanvien', () => {
		it('it should GET all vitri', done => {
			chai.request(server)
				.get('/vitri')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');

					res.body.should.have.property('data');
					res.body.data.should.be.a('array');

					res.body.should.have.property('total');
					res.body.total.should.be.eql(0);

					done();
				});
		});
	});
});