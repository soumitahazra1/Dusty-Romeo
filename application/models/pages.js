module.exports = (sequelize, Sequelize) => {
    const Page = sequelize.define("pages", {
        title:{
            type: Sequelize.STRING,
            allowNull: false,   
        },
        slug:{
            type: Sequelize.STRING,
            allowNull: false,   
        },
        description:{
            type: Sequelize.TEXT('long'),
            allowNull: false,   
        },
        meta_title:{
            type: Sequelize.STRING,
            allowNull: false,   
        },
        meta_keywords:{
            type: Sequelize.TEXT('long'),
            allowNull: false,   
        },
        meta_description:{
            type: Sequelize.TEXT('medium'),
            allowNull: false,   
        },
        status: {
            type: Sequelize.ENUM('1', '0'),
            allowNull: false,
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        },
        deletedAt: {
            field: 'deleted_at',
            type: Sequelize.DATE,
        }
    })
  
    return Page;
  };