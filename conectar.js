
const mysql = require('mysql');

const config = {

	host:'wm1707.com',
	user:'c21_wm1707',
	password:'St8yd6M8UdWow',
	database:'c21_wm1707'

};

const pool = mysql.createPool(config);

module.exports = pool;