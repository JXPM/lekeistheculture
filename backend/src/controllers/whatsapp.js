const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendInvite = async (req, res) => {
  try {
    const { phone, country } = req.body;
    const allowedCountries = process.env.ALLOWED_COUNTRIES.split(',');

    // Validation
    if (!allowedCountries.includes(country)) {
      return res.status(403).json({ 
        success: false,
        error: "Pays non autorisé"
      });
    }

    // Formatage spécial pour le Sandbox WhatsApp
    const formattedPhone = `whatsapp:+${country}${phone}`;
    const sandboxNumber = 'whatsapp:+14155238886'; // Numéro Sandbox Twilio

    // Envoi via Twilio Sandbox
    const message = await client.messages.create({
      body: `Lien d'invitation: ${process.env.WHATSAPP_GROUP_LINK}\n\nRejoignez notre communauté !`,
      from: sandboxNumber,
      to: formattedPhone
    });

    console.log("Message SID:", message.sid);
    res.json({ success: true });
    
  } catch (error) {
    console.error("Détails de l'erreur Twilio:", {
      code: error.code,
      message: error.message,
      moreInfo: error.moreInfo
    });
    
    res.status(500).json({ 
      success: false,
      error: "Échec de l'envoi",
      details: error.message
    });
  }
};