const User = require('../models/user');

module.exports.renderRegister = (req,res)=>{
    res.render("users/register");
}


module.exports.register = async (req, res, next) => {
    try{
    
        const {username,password,email} = req.body;
        const user = new User({email,username });
        const registeredUser = await User.register(user,password)
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Succesfully made account!!')
            res.redirect('/campgrounds')
        })
       
    }
    catch (e){
        req.flash('error', e.message);
        res.redirect('/register')
    
    }
        
    }

module.exports.renderLogin = (req,res)=>{
    res.render("users/login");
}
module.exports.login = async (req, res, next) => {
   
    req.flash('success', 'Succesfully logged in !!')
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl) 
}
module.exports.logout=(req,res)=>{
    req.logout();
    req.flash('success','Sucessfully logged out!!!')
    res.redirect('/campgrounds')
}