const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const UserResource = require('../resources/UserResource');


exports.register = async (req, res) => {
  try {  
    console.log("body",req.body);
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
          await User.create(registeredData).then(data => {
            res.status(200).json({
              success: 1,
              message: "Registered Successfully",
              users: new UserResource(User).toJSON(),
              users: data.dataValues
            }); 
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid login credentials.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(201).send({ user: new UserResource(user).toJSON(), token });
  } catch (error) {
    res.status(400).send(error);
  }
};
