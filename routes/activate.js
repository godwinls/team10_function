var db = require('../models/db2.js');

exports.bactivate = function(req, res){
	var update = "UPDATE Person SET Person.Person_buyActivate = 1 WHERE Person.Person_id = ?";
	db.getConnection(function(err,connection){
		connection.query(update, req.session.user.Person_id, function(err, result){
			if(err)
				console.log("There is an error in creating");
			else{
				req.session.user.Person_buyActivate= 1;
				res.redirect('/');
				connection.release();
			}
		});
	});
};

exports.sactivate = function(req, res){
	var update = "UPDATE Person SET Person.Person_sellActivate = 1 WHERE Person.Person_id = ?";
	db.getConnection(function(err,connection){
		connection.query(update, req.session.user.Person_id, function(err, result){
			if(err)
				throw err;
			else{
				req.session.user.Person_sellActivate= 1;
				res.redirect('/');
				connection.release();
			}
		});
	});
};
exports.bdeactivate = function(req, res){
	var update = "UPDATE Person SET Person.Person_buyActivate = 0 WHERE Person.Person_id = ?";
	db.getConnection(function(err,connection){
		connection.query(update, req.session.user.Person_id, function(err, result){
			if(err)
				throw err;
			else{
				req.session.user.Person_buyActivate= 0;
				res.redirect('/');
				connection.release();
			}
		});
	});
};
exports.sdeactivate = function(req, res){
	var update = "UPDATE Person SET Person.Person_sellActivate = 0 WHERE Person.Person_id = ?";
	db.getConnection(function(err,connection){
		connection.query(update, req.session.user.Person_id, function(err, result){
			if(err)
				throw err;
			else{
				req.session.user.Person_sellActivate= 0;
				res.redirect('/');
				connection.release();
			}
		});
	});
};