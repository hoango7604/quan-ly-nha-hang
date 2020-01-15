module.exports = {
	ok: (res, message) => {
		return res.status(200).send(message);
	},

	clientError: (res, err) => {
		return res.status(400).send(err);
	}
}