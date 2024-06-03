require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { 
  User,
  Profile, 
  UserProfile, 
  Role,
  Ability,
  Department,
  Designation
} = require('../models');

const UserResource = require('../resources/UserResource');
const { sendEmailVerificationNotification } = require('../services/EmailVerificationService');

exports.signUp = async (req, res) => {
  try { 
    const {name, email, password, password_confirmation} = req.body;    
    await User.findOne({
      where: {email: req.body.email}
    }).then(async isAvailable =>{      
      if(isAvailable){
        return res.status(400).send({
          success: false,
          message: "Email is already Registered!"
        }); 

      }else{
        if(req.body.password !== req.body.password_confirmation){
          return res.status(400).send({
            success: false,
            message: "Password doesn't matched!"
          });  
    
        }else{
          const registeredData = {
            name: req.body.name, 
            email: req.body.email, 
            password: bcrypt.hashSync(req.body.password,10) //rounds = 15: ~3 sec/hash. The module will use the value you enter and go through 2^rounds hashing iterations.
          };
          await User.create(registeredData).then(async data => {            
            await UserProfile.create({
              user_id: data.dataValues.id,
              department_id: 1,
              designation_id: 1,
              gender: " ",
            });
            await Profile.create({
              user_id: data.dataValues.id
            });

            const role = await Role.findOne({ where: { label: 'Visitor' } });
            const ability = await Ability.findOne({ where: { label: 'Profile Registration' } });
        
            await data.addRole(role);
            await data.addAbility(ability);

            //Send Email for verification!
            await sendEmailVerificationNotification(data.dataValues, res);
            
          }).catch(err => {
            res.status(500).json({
              success: 0,
              message: err.message || "Some error occurred when you are trying to register"
            });
          });  
          
        }
        
      }
    }).catch((err)=>{
      res.status(500).json({
        success: 0,
        message: err,
      });
    });
        
  } catch (error) {
    res.status(501).json({
      success: 0,
      message: error,
    });   
  }
    
}

exports.signIn = async (req, res) => {
  console.log('dsgsdga req',req);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: 0,
        message: "Please Provide your registered Email-Id and password!"
      })
    }
 
    await User.findOne({ 
      where: { email } 
    }).then(async isAvailable =>{ 
      if(!isAvailable){
        return res.status(400).send({
          success: 0,
          message: 'The provided registered email is incorrect!'
        });
         
      }else{
        if(!isAvailable.email_verified_at){
          res.status(401).json({
            success: false,
            message: 'Your E-mail verification is not Completed!'
          })

        }else{
          
          if(!await bcrypt.compare(password, isAvailable.password)){
            return res.status(400).send({
              success: 0,
              message: 'The provided password credentials is incorrect!'
            });

          }else{
            const jwtGenerate = jwt.sign({id: isAvailable.id, emailId: isAvailable.email}, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN
            });
            return res.status(200).json({
              success: 1,
              message: "login successfully",
              userData: new UserResource(isAvailable).toJSON(),
              token: jwtGenerate
            });
          }
        }
      }
    })

  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};

exports.signOut = async(req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
   
    res.status(200).send({ message: 'Logout successful'});
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(verified.id);
    
    if (!user) {
      return res.status(404).json({
        success: 0,  
        message: "Unauthorized Access!" 
      });
    }

    if (user.email_verified_at) {
      return res.status(201).json({  
        success: 0, 
        message: "Registered E-mail already verified! You can Login Now"
      });
    }

    user.email_verified_at = new Date();
    await user.save();

    res.status(200).json({
      success: 1, 
      message: 'Your account is activated. You can login now' 
    });
  } catch (error) {
    res.status(400).json({ 
      success: 0, 
      error: 'Invalid or expired token' 
    });
  }
};

exports.getAuthUserDetails = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: 0,
      message: "Unauthorized - No user information available"
    });
  }
  // const user = await User.findByPk(req.user.id);
  const user = await User.findByPk(req.user.id, {
    include: [
      {
        model: Role,
      },
      {
        model: Ability,
      },
      {
        model: UserProfile,
        include:[
          {
            model: Department // Include the Department model
          },
          {
            model: Designation,
          },
        ]
      },
      {
        model: Profile
      }
    ],    
  });
  
  res.json({
    success: 1,
    data: new UserResource(user) // Format user details using UserResource
    
  });
};
