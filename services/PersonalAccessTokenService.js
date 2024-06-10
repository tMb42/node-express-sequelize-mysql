const crypto = require('crypto');
const { PersonalAccessToken } = require('../models'); 

const generatePersonalAccessToken = async (user, deviceName, expiresInMinutes) => {
  const tokenValue = crypto.randomBytes(32).toString('hex'); // Generates a 64-character string compatible with Larave-Sactum. If required 128 charecter then use 64 in place of 
  const expiresAt = new Date();

  // expiresAt.setSeconds(expiresAt.getSeconds() + expiresInSeconds); // Set the expiration date to 5 Seconds from now
  expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes); // Set the expiration date to 5 minutes from now
  // expiresAt.setDate(expiresAt.getDate() + expiresInDays); // Set the expiration date
  console.log('expiresAt',expiresAt)
  
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
