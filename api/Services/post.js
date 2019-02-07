'use strict';

const Model = require('../../models');

const findByTag = (identifier) => {
    return Model.Post.findAll({
        include: [
            {
                model: Model.PostTag,
                attributes: {
                    exclude: ['createdAt','updatedAt']
                    
                },
                where: {
                    tagId: identifier
                },
                include: [
                    {
                        model: Model.Tag,
                        attributes: {
                            exclude: ['createdAt','updatedAt']
                        },
                        
                    }
                ]
            }, {
                model: Model.User,
                attributes: {
                    exclude: ['email','password','createdAt', 'updatedAt']
                },
            },
        ],
        attributes: {
            exclude: ['updatedAt']
        }
    }).then(post => {
        return post;
    });
}

module.exports.create = (newPost, userId, response) => {
    return Model.Post.create({
        postedBy: userId,
        title: newPost.title,
        description: newPost.description,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }).then((newPostCreated) => {
        var temp = new Array();
        var tags = newPost.tag.toLowerCase();
        if(tags !== null){
            temp = newPost.tag.split(',');
            //console.log(temp);
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
                                tagId: newTag.id
                            });
                        });
                    }
                    else {
                        Model.PostTag.create({
                            postId: newPostCreated.get('id'),
                            tagId: tag.id
                        });
                    }
                })
            }
        }

        return "Post Created!";
    }).catch(error => {
        console.log(error);
        return "falsed";
    });
};

module.exports.getAll = () => {
    return Model.Post.findAll({
        include: [
            {
                model: Model.PostTag,
                attributes: {
                    exclude: ['createdAt','updatedAt']
                },
                include: [
                    {
                        model: Model.Tag,
                        attributes: {
                            exclude: ['createdAt','updatedAt']
                        }   
                    }
                ]
            }, {
                model: Model.User,
                attributes: {
                    exclude: ['email','password','createdAt', 'updatedAt']
                },
                
            },
        ],
        attributes: {
            exclude: ['updatedAt']
        }
    }).then(post => {
        //console.log(post);
        return post;
    });
};

module.exports.getPostByTag = (identifier) => {
    return Model.Tag.findOne({
        where: {
            name: identifier
        }
    }).then((tag) => {
        var tagId = tag.id;
        console.log(findByTag(tagId));
        return findByTag(tagId);
    }).catch(error => {
        console.log(error);
        return "falsed";
    });
    
};

module.exports.updatePost = (newData, identifier) => {
    return Model.Post.findOne({
        where: {
            id: identifier
        }
    })
    .then((post) => {
        return post.update({
            title: newData.title,
            description: newData.description,
            updatedAt: new Date()
        }).then(() => {
            return post.id;
        });
        
    })
    .then((post) => { 
        console.log(identifier);
        return Model.PostTag.destroy({
            where: {
                postId: identifier
            }
        });
    })
    .then(() => {
        let tags = newData.tag.toLowerCase();
        if(tags){
            const temp = newData.tag.split(',') || [];
            //bisa pake map series promise bluebird
            for (let a in temp) {
                Model.Tag.findOne({ 
                    where: {
                        name: temp[a].toLowerCase() 
                    }
                }).then((tag) => {
                    if (!tag) {
                        Model.Tag.create({ name: temp[a] })
                        .then((newTag) => {
                            Model.PostTag.create({
                                postId: identifier,
                                tagId: newTag.id
                            });
                        });
                    }
                    else {
                        Model.PostTag.create({
                            postId: identifier,
                            tagId: tag.id
                        });
                    }
                })
            }
        }
        return "updated";
    })
    .catch(error => {
        return error;
    })
};

module.exports.deletePost = (identifier, userId) => {
    return Model.Post.findOne({
        where: {
            id: identifier
        }
    }).then((post) => {
        //console.log(post);
        if(!post) {
            return "not found";
        }
        if(post.postedBy !== userId){
            return "cannot delete someone post";
        }
        return Model.PostTag.destroy({
            where: {
                postId: identifier
            }
        }).then(() => {
            return Model.Post.destroy({
                where: {
                    id: identifier
                }
            });
        })
        
    }).then(() => {
        return "deleted";
    }).catch(error => {
        return error;
    });
};