'use strict';

const Model = require('../../models');

module.exports.create = (newPost, userId, response) => {
    return Model.Post.create({
        postedBy: userId,
        title: newPost.title,
        description: newPost.description,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }).then((newPostCreated) => {
        var temp = new Array();
        //console.log(newPost.tag);
        Model.Post.find
        var tags = newPost.tag.toLowerCase();
        
        if(tags !== null){
            temp = newPost.tag.split(',');
            console.log(temp);
            for (var a in temp) {
                Model.Tag.findOne({ 
                    where: {
                        name: temp[a].toLowerCase() 
                    }
                }).then((tag) => {
                    if (tag === null) {
                        Model.Tag.create({ name: temp[a] })
                        .then((newTag) => {
                            Model.PostTag.create({
                                postId: newPostCreated.get('id'),
                                tagId: tag.id
                            });
                        });
                        //Model.Tag.save();
                        
                    }
                    else {
                        Model.PostTag.create({
                            postId: newPostCreated.get('id'),
                            tagId: tag.id
                        });
                    }
                    //Model.PostTag.save();
                })
            }
        }

        return "Post Created!";
    }).catch(error => {
        console.log(error);
        return "falsed";
    });
};
