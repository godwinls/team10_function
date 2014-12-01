var db = require('../models/db2.js');


exports.sell = function(req, res) {
	if(!req.session.user){
		res.redirect('/');
	}
	res.render('sell', {
		title : 'Sell A Thing',
		user: req.session.user
	});
}

exports.afterSell = function(req,res) {
	if(!req.session.user){
		res.redirect('/');
	}
	else {
	var name = req.body.Product_name;
	var quantity = req.body.Product_quantity;
	var info = req.body.Product_info;
	var category = req.body.Product_category;
	var condition = req.body.Product_condition;
	var type = req.body.Product_type;
	var price = req.body.Product_price;
    var seller = req.session.user.Seller_id;
    var sell = "INSERT INTO Product SET ?";
    var value = {Product_name: name, Product_category_id:category, Product_price: price, Product_condition: condition, Product_type: type,
    		     Product_seller_id:seller, Product_info:info, Product_quantity: quantity};
    db.getConnection(function(err,connection){
		connection.query(sell, value, function(err, result){
			if(err)
				throw err;
			else{
				res.redirect('/');
				connection.release();
			}
		});
	});
	}
}
