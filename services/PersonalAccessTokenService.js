const crypto = require('crypto');
const { PersonalAccessToken } = require('../models'); 

const generatePersonalAccessToken = async (user, deviceName, expiresInDays) => {
  const tokenValue = crypto.randomBytes(32).toString('hex'); // Generates a 64-character string compatible with Larave-Sactum. If required 128 charecter then use 64 in place of 
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays); // Set the expiration date
  
  // Fetch abilities for the user
  const abilities = await user.getAbilities();
  const abilitiesArray = abilities.map(ability => ability.name);

  await PersonalAccessToken.create({
    tokenable_type: 'User',
    tokenable_id: user.id,
    name: deviceName,
    token: tokenValue,
    abilities: JSON.stringify(abilitiesArray),
    last_used_at: new Date(),
    expires_at: expiresAt
  });
  return tokenValue;
};

module.exports = { generatePersonalAccessToken };
