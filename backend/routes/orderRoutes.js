const express =require("express");
const {protect} = require('../middleware/authmiddleware');
const {admin} = require("../middleware/adminMiddleware");

const {createOrder,getOrderById,getOrders, updateOrderStatus, myorders}= require("../controllers/orderController");

const router = express.Router();

router.route('/').post(protect,createOrder).get(protect,admin,getOrders);
router.route('/myorders').get(protect,myorders); 
router.route('/:id/status').put(protect,admin,updateOrderStatus);

module.exports=router;