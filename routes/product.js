/**
 * New node file
 */
var db = require('../models/db.js');


exports.showProduct = function(req, res){
   var getinfo = "SELECT * From Product, Category, Seller, Person WHERE Product.Product_category_id = Category.Category_id AND " +
   		"Product.Product_seller_id = Seller.Seller_id AND Person.Person_id = Seller.Person_id AND Product_id = "+ req.params.id;
   db.fetchData(function(err,result){
	   if(err)
		   throw err;
	   else {
		   req.session.product= result[0];
		   res.render('product',{
			   title: result[0].Product_name,
			   user: req.session.user,
			   result: result
		   });
	   }
   },getinfo);
}