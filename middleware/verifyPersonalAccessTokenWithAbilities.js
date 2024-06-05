const jwt = require('jsonwebtoken');
const { User, PersonalAccessToken } = require('../models');

module.exports =  async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: 0,
            message: "Access Denied! Unauthorized User"
        });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(verified.id);    
        if (!user) {
            return res.status(401).json({
                success: 0,
                message: "Access Denied! No user found!" 
            });
        }
        
        // Verify the personal access token in the database
        const personalAccessToken = await PersonalAccessToken.findOne({
            where: {
                tokenable_type: 'User',
                tokenable_id: user.dataValues.id
            }
        });
        if (!personalAccessToken) {
            return res.status(401).json({
                success: 0,
                message: "Invalid User!"
            });
        }
        if (new Date() > personalAccessToken.expires_at) {
            return res.status(402).json({
                success: 0,
                message: "Expired Access Period!"
            });
        }

        // Define the required abilities for this route
        const requiredAbilities = ['profile_registration']; // Replace with actual required abilities

        const tokenAbilities = JSON.parse(personalAccessToken.abilities);
        const hasRequiredAbilities = requiredAbilities.every(ability => tokenAbilities.includes(ability) || tokenAbilities.includes('*'));
        console.log('hasRequiredAbilities', hasRequiredAbilities);
        if (!hasRequiredAbilities) {
            return res.status(403).json({
                success: 0,
                message: "Access Denied! Insufficient abilities"
            });
        }
        // Update the last_used_at field
        await personalAccessToken.update({ last_used_at: new Date() });
        
        req.user = verified;
        req.paToken = personalAccessToken;
        next();

    } catch (err) {
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
}

