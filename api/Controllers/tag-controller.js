'use strict';

const tagService = require('../Services/tag');

module.exports.createTag = (request, reply) => {
    const p = request.payload;
    return tagService.create(p.name);
    try {
        tagService.create(p.name)
        .then((tag) => {
            return { data: tag };
        })
        .catch((error) => {
            return error;
        });
    } catch (error) {
        console.error(error);
        return reply({
            request: request.payload
        }).code(400);
    }
};

module.exports.getOne = (request, reply) => {
    return tagService.getOne(request.params.id);
};

module.exports.getAll = (request) => {
    let isAuth = request.state.session;
    if (!isAuth){
        return "false";
    }
    return tagService.getAll();
}

module.exports.update = (request, reply) => {
    const p = request.payload;
    //const editTag = new TagClass(p.name, p.prefix, p.rules);
    const editTag = request.params.id;
    return tagService.update(editTag, p);
}