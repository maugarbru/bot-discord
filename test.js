var moment = require('moment-timezone')
moment.locale("es")

var dia = moment.tz(new Date(), "America/Los_Angeles").format("LLLL")

console.log(dia);
