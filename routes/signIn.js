var ejs = require('ejs');
var db = require('../models/db.js');

exports.signIn = function(req, res) {
	res.render('signIn', {
		title : 'Ebay'
	});
};

exports.afterSignIn = function(req, res) {
	var session = req.session;
	console.log(JSON.stringify(session));
	var getUser = "select * from Person , Seller, Customer where " +
			"Seller.Person_id = Customer.Person_id  AND Seller.Person_id = Person.Person_id AND (Person_email, Person_pass) = ('"+ req.param("email") + "', '" + req.param("pass") + "')";
	console.log("Query is: " + getUser);
	
	db.fetchData(function(err, result) {
		if (err){
			throw err;
		}
		else {
			console.log("result = "+ JSON.stringify(result));
			if (result.length > 0) {
				req.session.user = result[0];
				console.log(req.session.user);
				console.log("valid login~~");
				res.redirect('/');
			}else {
				console.log("invalid login");
				ejs.renderFile('./views/failSignIn.ejs', function(err,
						result) {
					if (!err) {
						res.end(result);
					} else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}
	}, getUser);
}