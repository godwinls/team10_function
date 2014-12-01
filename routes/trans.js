var db = require('../models/db.js');

exports.show = function(req, res){
	var trans = "SELECT buyer.Person_id as bid, buyer.Person_last_name as blname, buyer.Person_first_name as bfname,seller.Person_id as sid, " +
			"seller.Person_last_name as slname, seller.Person_first_name as sfname, TransHistory_id, TransHistory_Product_id, Product.Product_name, TransHistory_time, TransHistory_type  " +
			"FROM TransHistory, Customer, Product, Seller, Person  as buyer , Person as seller WHERE " +
	        "buyer.Person_id = Customer.Person_id AND seller.Person_id = Seller.Person_id AND TransHistory.TransHistory_seller_id = Product.Product_seller_id AND " +
	        "TransHistory.TransHistory_seller_id = Seller.Seller_id AND TransHistory.TransHistory_buyer_id = Customer.Customer_id " +
	        "AND TransHistory.TransHistory_Product_id = Product.Product_id AND TransHistory.TransHistory_id ="+ req.params.id + " AND buyer.Person_id = " + req.session.user.Person_id;
	
	db.fetchData(function(err,result){
		if (err)
			throw err;
		else{
            res.render('transactions', {
			                        title: 'Transaction Detail',
				                    user: req.session.user,   
				                    result: result,
			                        });
	};	    
	},trans);
}