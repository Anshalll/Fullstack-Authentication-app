import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
export default function Recaptcha({ recaptchaRef, setrecaptchaToken, setRecaptchaVal }) {



    const HandleRecaptcha = (value) => {

        if (value) {

            setrecaptchaToken(value)
            setRecaptchaVal(true)

        }
        else {

            setrecaptchaToken("")
            setRecaptchaVal(false)

        }
    }

    const HandleError  = (error) => {
        console.error('Error loading ReCAPTCHA:', error);
    }

    return (
        <>

            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={HandleRecaptcha}
                onError={HandleError}
            />

        </>
    )
}
