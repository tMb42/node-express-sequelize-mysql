'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PersonalAccessToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'tokenable_id', constraints: false });
    }
  }
  PersonalAccessToken.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    
    tokenable_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tokenable_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    name: {        
      type: DataTypes.STRING(50),
      allowNull: false
    },  
    token: {        
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false
    },  
    abilities: {        
      type: DataTypes.TEXT,
      allowNull: false
    },  
    last_used_at: {        
      type: 'TIMESTAMP',
      allowNull: true
    },  
    expires_at: {        
      type: 'TIMESTAMP',
      allowNull: true
    },  
    created_at: {        
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true
    }, 
    updated_at: {        
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true
    }, 
  },
  {
    sequelize,
    modelName: 'PersonalAccessToken',
    tableName: 'personal_access_tokens', // Explicitly set the table name if needed
    timestamps:true,
    underscored:true, // Auto genetared timestamp (user_role table ) will be changed to created_at & updated_at by default createdAt & updatedAt.  
  });
  return PersonalAccessToken;
};
