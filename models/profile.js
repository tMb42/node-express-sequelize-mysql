'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { 
        foreignKey: 'user_id',
        constraints: true,
      });
    }
  }
  Profile.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },  
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: {
          tableName: 'users', // name of Target Table
          key: 'id', // key in Target table that we're referencing
        },
      },
      onDelete: 'CASCADE'
    },  
    photo: {        
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: 'storage/images/no_image.png',
    },  
    created_at: {        
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    }, 
    updated_at: {        
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
  }, 
  {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles', // Explicitly set the table name if needed
    timestamps:false,
    underscored:true, 
    // Add a getter method for the photo URL
    getterMethods: {
      photoUrl() {
        return `${process.env.APP_URL}/${this.photo}`;
      },
    },
  });
  return Profile;
};
