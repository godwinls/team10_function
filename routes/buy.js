var db = require('../models/db2.js');

exports.buy = function(req,res){
	if(!req.session.user || req.session.user.buyActivate== 0){
		res.redirect('/');
	}
	if(req.body.quantity == 0 ){
		res.send('SOld OUT');
	}
	else {
	var btrans = "INSERT INTO TransHistory SET ? ";
	var updatequantity = "UPDATE Product SET Product_quantity = Product_quantity -1 WHERE Product_id = ?";
	var id = req.params.id;
	var time =  new Date().toISOString().slice(0, 19).replace('T', ' ');
	var value = {TransHistory_buyer_id:req.session.user.Customer_id, TransHistory_seller_id: req.session.product.Product_seller_id, 
			     TransHistory_product_id: req.params.id, TransHistory_type: 1, TransHistory_time: time};
	db.getConnection(function(err,connection){
		connection.query(btrans, value, function(err, result){
			if(err)
				res.redirect('/');
			else{
				connection.query(updatequantity, id, function(err, result) {
					if(err)
						res.redirect('/');
					else{
				req.session.product= null;
				res.send('bought success!');
				connection.release();
					}
				})
				
			}
		});
	});
	}
}