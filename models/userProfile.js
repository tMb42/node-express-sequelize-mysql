'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
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
      this.belongsTo(models.Department, { 
        foreignKey: 'department_id',
        constraints: true,
      });
      this.belongsTo(models.Designation, { 
        foreignKey: 'designation_id',
        constraints: true,
      });
    }
  }

  UserProfile.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
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
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    mobileNo: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: true
    },
    is_departmental: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: 1
    },
    is_pwd_engineer: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: 0
    },
    department_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: {
          tableName: 'departments', // name of Target Table
          key: 'id', // key in Target table that we're referencing
        },
      },
      onDelete: 'CASCADE'
    },
    designation_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: {
          tableName: 'designations', // name of Target Table
          key: 'id', // key in Target table that we're referencing
        },
      },
      onDelete: 'CASCADE'
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
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    modelName: 'UserProfile',
    tableName: 'user_profiles', 
    timestamps: false,
    underscored:true, 
  });
  return UserProfile;
};
