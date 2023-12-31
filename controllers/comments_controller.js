const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){//.then() return a promise or error so no need to use if(post) but in async await we dont use .then() so we have to use if(post)
    try{
        let post = await Post.findById(req.body.post);
        
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
        
            post.comments.push(comment);
            post.save();

            if(req.xhr){
                comment = await comment.populate('user','name');

                return res.status(200).json({
                    data: {
                        post: comment
                    },
                    message: "Comment posted"
                });
            }  
        }       
        
        req.flash('success', 'Comment published!');

        return res.redirect('/');
    }catch(err){
        console.log('Error',err);
        return;
    }
};  

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
                
            let post_id = comment.post;
    
            comment.deleteOne();
    
            let post = await Post.findByIdAndUpdate(post_id, {$pull: {comments: req.params.id}});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id: req.params.id
                    },
                    message: "Comment removed"
                });
            }
            req.flash('success', 'Comment deleted!');
        }

        return res.redirect('back');
    }catch(err){
        console.log('Error',err);
        return;
    }
}