
exports.up = async function(knex, Promise) {
	const WITHOUT_TIMEZONE = true;
	const schema = knex.schema;

	await schema.dropTableIfExists('doan_vitri_test')

	await schema.createTable('doan_vitri_test', function(table) {
		table.increments('maViTri').primary();
		table.string('tenViTri', 30).notNullable();
	});
};

exports.down = function(knex, Promise) {

};
