'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Department.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    department_name: {        
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    department_short_name: {        
      type: DataTypes.STRING(50),
      allowNull: true
    },  
    alias_name: {        
      type: DataTypes.STRING(20),
      allowNull: true
    },  
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    display: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: 1
    },
    inforce: {
      type: DataTypes.TINYINT(4),
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
    modelName: 'Department',
    tableName: 'departments', // Explicitly set the table name if needed
    timestamps:false,
    underscored:true, // Auto genetared timestamp (user_role table ) will be changed to created_at & updated_at by default createdAt & updatedAt.  
  });
  return Department;
};
