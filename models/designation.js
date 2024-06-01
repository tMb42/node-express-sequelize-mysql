'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Designation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Designation.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    designation_name: {        
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    designation_alias: {        
      type: DataTypes.STRING(20),
      allowNull: true
    },  
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    display: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    inforce: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
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
    modelName: 'Designation',
    tableName: 'designations', // Explicitly set the table name if needed
    timestamps:false,
    underscored:true, // Auto genetared timestamp (user_role table ) will be changed to created_at & updated_at by default createdAt & updatedAt.  
  });
  return Designation;
};
