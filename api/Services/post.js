'use strict';

const Model = require('../../models');

const findByTag = (identifier) => {
    return Model.Post.findAll({
        include: [{
            model: Model.Tag,
            where: identifier
        },
        {
            model: Model.User
        }],
        attributes: {
            exclude: ['updatedAt']
        }
    }).then(post => {
        return post;
    });
}

module.exports.create = (newPost, userId, response) => {
    return Model.Post.create({
        postedBy: newPost.postedBy,
        title: newPost.title,
        description: newPost.description,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }).then((newPostCreated) => {
        let tags = newPost.tag.toLowerCase();
        if(tags){
            const temp = newPost.tag.split(',') || [];
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
                                PostId: newPostCreated.id,
                                TagId: newTag.id
                            });
                        });
                    }
                    else {
                        Model.PostTag.create({
                            PostId: newPostCreated.id,
                            TagId: tag.id
                        });
                    }
                })
            }
        }
        return newPostCreated;
    }).catch(error => {
        console.log(error);
        return "falsed";
    });
};

module.exports.getAll = () => {
    return Model.Post.findAll({
        include: [{
            model: Model.Tag
        },
        {
            model: Model.User
        }]

    }).then(post => {
        console.log(post);
        return post;
    }).catch(error => {
        console.log(error);
        return error;
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

module.exports.getPostById = (identifier) => {
    return Model.Post.findOne({
        include: [{
            model: Model.Tag
        },
        {
            model: Model.User
        }],
        attributes: {
            exclude: ['updatedAt']
        },
        where: {
            id: identifier
        }
    })
    .then((post) => {
        if(!post) return "post not found";
        return post;
    })
    .catch(error => {
        console.log(error);
        return error;
    });
}

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
                PostId: identifier
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
                                PostId: identifier,
                                TagId: newTag.id
                            });
                        });
                    }
                    else {
                        Model.PostTag.create({
                            PostId: identifier,
                            TagId: tag.id
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
                PostId: identifier
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