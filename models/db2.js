/**
 * New node file
 */
var mysql = require('mysql');

//node Mysql poo
module.exports= mysql.createPool({
	host:'localhost',
		user:'root',
		database:'mydb',
		password: '5245193'
	});
