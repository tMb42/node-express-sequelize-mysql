const User = require('../models/user');

const getAllUsers = async(req, res) => {
    
    const data = await User.findAll({
        // attributes:[
        //     ['id', 'id'], 
        //     ['name', 'name'], 
        //     ['email', 'email'], 
        //     ['email_verified_at', 'email_verified_at'], 
        //     ['created_at', 'created_at'], 
        //     ['updated_at', 'updated_at'], 
        // ]
    });
    res.status(200).json(data);
}

module.exports = { getAllUsers }; 