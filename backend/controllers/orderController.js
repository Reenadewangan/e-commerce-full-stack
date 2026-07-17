const Order =require('../model/order');

const sendEmail = require('../utils/sendEmail');

const createOrder = async(req,res)=>{
   
    try{
         const {items,totalAmount,address,paymentId} = req.body;
         if(!items|| items.length===0||!totalAmount || !address){
            return res.status(400).json({message:'Invalid order data'});
         }else{
            const order = new Order({
                user:req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            });
            await order.save();
            const message=`Dear ${req.user.name},\n\nThank you for your order!Your order been successfully created with the following detials:\n\nOrder ID:${order._id}\nTotal Amount:${totalAmount}\nShipping address:${address}\n\n we will notify you once your is shipped. \n\nBest regards.\nShopnest Team`;  

            await sendEmail(req.user.email, 'Order created', message);
            res.status(201).json({message:'Order created successfully', order});
         }
    }catch(error){
        res.status(500).json({message: 'Error creating order', error});
    }
};


const myorders =async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user._id}).populate('items','productId','name price');
        res.json(orders);
    }
    catch(error){
        res.status(500).json({message:'Error fetching orders',error});
    }
};

const getOrders=async(req,res)=>{
    try{
        const orders =await Order.find({}).populate('user','Id name'); 
        res.json(orders);
    }catch(error){
        res.status(500).json({message:'Error fetching orders',error});
    }
}; 

const updateOrderStatus = async (req,res)=>{
    try{
        const {status}=req.body;
        const order=await Order.findById(req.params.id);
        if(order){
            order.status=status;
            await order.save();
            res.json({message:'order status update', order});
        }else{
          res.status(404).json({message: 'order not found'});
        }
    }catch(error){
        res.status(500).json({message: 'Error updating order status',error});
    }
};
module.exports={
    createOrder,
    myorders,
    getOrders,
    updateOrderStatus
};