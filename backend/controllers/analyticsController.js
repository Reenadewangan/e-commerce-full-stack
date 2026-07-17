const Order = require('../model/order');
const User = require('../model/userModel');
const Product = require('../model/Product');

const getAdminstats = async(req,res)=>{
    try{
        const totalUsers = await User.countDocuments({role:'user'});
        const totalOrders= await Order.countDocuments({});
        const totalProducts =await Product.countDocuments({});

        const orders = await Order.find({});

        const totalRevenueData =orders.reduce((acc,order)=>acc+order.totalAmount,0)
         res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue:totalRevenueData
         });          
    }catch(error){
        res.status(500).json({message:"error fetching stats",error});
    }
};

module.exports={getAdminstats};