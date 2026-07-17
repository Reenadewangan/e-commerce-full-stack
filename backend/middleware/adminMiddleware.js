const admin = (req,res,next)=>{
    if(!req.user){
        return res.status(401).json({message:'Not authorized, no user found'});
    }

    if(req.user.role?.toLowerCase() !== 'admin'){
        return res.status(403).json({
            message:'Not authorized as admin',
            role:req.user.role
        });
    }

    next();
};

module.exports= {admin};
