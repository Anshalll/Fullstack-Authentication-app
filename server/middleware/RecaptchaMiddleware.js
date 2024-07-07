import axios from 'axios';

async function verifyRecaptcha(recaptchaResponse) {
    try {
        const response = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            null,
            {
                params: {

                    secret: process.env.RECAPTCHA_SECRET,
                    response: recaptchaResponse,

                },
            }
        );

        return response.data.success;
    } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);
        return false;
    }
}

export const Recaptcha = async (req, res, next) => {
    const { recaptchaToken } = req.body;

    try {
        const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    
        if (!isRecaptchaValid) {
            return res.status(400).json({ error: "reCAPTCHA verification failed" });
        } else {
           
            next()
        }
    } catch (error) {
        res.json({ error: "An error occured" })
    }
};