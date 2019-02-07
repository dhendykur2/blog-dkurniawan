'use strict'

const Model = require('../../models');

module.exports.create = (newTag) => {
    return Model.Tag.findOne({
        where: newTag.name
    })
    .then((tag) => {
        if (tag !== null) {
            //throw new Error()
        }
        return Model.Tag.create({ name: newTag});
    });
};

module.exports.findOne = (identifier) => {
    return Model.Tag.findOne({
        where: {
            name: identifier
        }
    }).then((tag) => {
        return tag.get('id');
    }).catch(error => {
        return error;
    });
};

module.exports.getOne = (id) => {
    return Model.Tag.findById(id);
};

module.exports.getAll = () => {
    return Model.Tag.findAll();
};
