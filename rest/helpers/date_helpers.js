const moment = require('moment');

moment.updateLocale('en', {
	week: {
		dow: 1,
		doy: 1
	}
});

module.exports = {
	moment,
	
	toTimeString: (val) => {
		const wrapped = moment.isMoment(val) ? val : moment(val);
		return (wrapped.isValid() ? wrapped.format() : val);
	},

	toMoment: (val) => {
		const wrapped = !moment.isMoment(val) ? moment(val) : val;
		return (wrapped.isValid() ? wrapped : val);
	},

	getFirstDateOfWeek: () => {
		return moment().startOf('week');
	},

	getLastDateOfWeek: () => {
		return moment().endOf('week');
	},

	isSameWeek: (firstDate, secondDate) => {
		return moment(firstDate).startOf('week').isSame(moment(secondDate).startOf('week'));
	}
};