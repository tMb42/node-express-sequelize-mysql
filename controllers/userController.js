const User = require('../models');

const getAllUsers = async(req, res) => {
    
    let data = await User.findAll({
        attributes:[
            ['id', 'id'], 
            ['name', 'name'], 
            ['email', 'email'], 
            ['email_verified_at', 'email_verified_at'], 
            ['created_at', 'created_at'], 
            ['updated_at', 'updated_at'], 
        ]
    });
    // let response = {
    //     users: data
    // }
    res.status(200).json(data);
}

module.exports = { getAllUsers }; 