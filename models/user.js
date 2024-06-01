'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { 
        through: 'user_role',
        foreignKey: 'user_id',
        otherKey: 'role_id',  
        constraints: true,
        timestamps: false
      });
      this.belongsToMany(models.Ability, { 
        through: 'user_ability',
        foreignKey: 'user_id',
        otherKey: 'ability_id',  
        constraints: true,
        timestamps: false
      });
      // A user has one profile
      this.hasOne(models.UserProfile, {
        foreignKey: 'user_id',
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      isUppercase: true,  
      validate: {
        max: 150,                  // only allow values <= 150
        min: 6,                  // only allow values => 6                
        notNull: {
          msg: 'Please enter your name',
        },
      }, 
    },
    email: {        
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      // validate: {
      //     isEmail: true,
      //     max: 320, //According to email standards (RFC 5321 and RFC 5322).
      //     is:{
      //         // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
      //         match: [ /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
      //         msg: "Please enter a valid email!"
      //     }
      // }       
    
    },
    email_verified_at: {        
      type: 'TIMESTAMP',
      allowNull: true
    },
    password: {        
      type: DataTypes.STRING(255),
      allowNull: false,            
    },
    remember_token: {        
      type: DataTypes.STRING(100),
      allowNull: true,
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
    modelName: 'User',
    tableName: 'users', // Explicitly set the table name if needed. By default, Sequelize uses the pluralized form of the model name for table names
    timestamps: false,
    underscored:true, // Auto genetared timestamp (user_role table ) will be changed to created_at & updated_at by default createdAt & updatedAt.  
  });
  return User;
};
