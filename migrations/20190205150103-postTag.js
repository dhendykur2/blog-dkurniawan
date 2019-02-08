'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostTag', {
      PostId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Post',
          key: 'id'
        }
      },
      TagId: {
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
    .then(()=> queryInterface.addIndex('PostTag', ['PostId', 'TagId']));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostTag');
  }
};
