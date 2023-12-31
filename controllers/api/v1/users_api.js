const User = require('../../../models/user')
const jwt = require('jsonwebtoken')



module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        console.log(user);
        if(!user || user.password!= req.body.password){
            return res.json(422, {
                message: "Invalid Username or Password"
            });
        }
        else{
            return res.json(200,{
                message: "Sign in successfull, here is your token, keep it safe!",
                data: {
                    token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
                }
            })
        }   
    }catch(err){ 
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}
