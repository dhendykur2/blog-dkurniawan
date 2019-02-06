'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostTag', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Post',
          key: 'id'
        }
      },
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tag',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
    .then(()=> queryInterface.addIndex('PostTag', ['postId', 'tagId']));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostTag');
  }
};
