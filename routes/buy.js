var db = require('../models/db2.js');

exports.buy = function(req,res){
	if(req.session.user.buyActivate== 0){
		res.redirect('/');
	}
	var btrans = "INSERT INTO TransHistory SET ? ";
	var time =  new Date().toISOString().slice(0, 19).replace('T', ' ');
	var value = {TransHistory_buyer_id:req.session.user.Customer_id, TransHistory_seller_id: req.session.product.Product_seller_id, 
			     TransHistory_product_id: req.session.product.Product_id, TransHistory_type: 1, TransHistory_time: time};
	db.getConnection(function(err,connection){
		connection.query(btrans, value, function(err, result){
			if(err)
				throw err;
			else{
				req.session.product= null;
				res.send('bought success!');
				connection.release();
			}
		});
	});
}