const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/send-invite', async (req, res) => {
    try {
        const { phone, country } = req.body;
        const fullNumber = `whatsapp:+${country}${phone.replace(/\D/g, '')}`;

        const message = await client.messages.create({
            body: "Rejoignez notre communauté Leke Culture : https://chat.whatsapp.com/H2mIrOnGyQX8O7euaAu6r7",
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: fullNumber
        });

        res.json({
            success: true,
            sid: message.sid
        });
    } catch (error) {
        console.error("Twilio error:", error);
        res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
});

module.exports = router;