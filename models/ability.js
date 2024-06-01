'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User,{ 
        through: 'user_ability',
        foreignKey: 'ability_id',
        otherKey: 'user_id',
        constraints: true,     //To add foreign_key
        // timestamps: true, //user_ability table generated without default timetamp
      });
    }
  }
  Ability.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {        
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    label: {        
      type: DataTypes.STRING(50),
      allowNull: true
    },  
    created_at: {        
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    }, 
    updated_at: {        
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      allowNull: true
    }, 
  }, 
  {
    sequelize,
    modelName: 'Ability',
    tableName: 'abilities', // Explicitly set the table name if needed
    timestamps:false,
    underscored:true, // Auto genetared timestamp (user_role table ) will be changed to created_at & updated_at by default createdAt & updatedAt.  
  });
  return Ability;
};
