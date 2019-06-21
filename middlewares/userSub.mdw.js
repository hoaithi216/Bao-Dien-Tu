var userModel = require('../models/user.model')
module.exports = (req, res, next) => {
    // console.log(req.user);
    if(req.user){
        var id = req.user;
        var idauth = id.IDuser;
        userModel.authblog(idauth).then(rows =>{
            var thithi = rows[0].IDuser
          
            if(thithi != 0){
                console.log("dap an la true")
                res.locals.userOke = true;
            }   
            else 
            {   console.log("dap an la false")
                res.locals.userOke= false;
            }
            
        })
     
    }
    else{
        console.log("chua dang nhap");
    }
    



	next();
}