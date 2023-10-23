const Post = require('../models/post');
const User = require('../models/user');

module.exports.home= function(req,res){

    // Post.find({}).then((posts)=>{

    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // }).catch((Error)=>{console.log('error')});
    Post.find({})
    .populate('user')
    .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
    })
    .then((posts)=>{

        User.find({}).then((users)=>{
            return res.render('home',{
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
        });
        
    }).catch((Error)=>{console.log('error')});
    
}