// Basic imports
import { useCallback, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';

// Styles
import styles from '../styles/App.module.scss'

// API imports
import { APIContext } from '../context/APIContext.js'

// Libraries
import ReCAPTCHA from "react-google-recaptcha";

// Project Components & Hooks
import ModalFail from '../components/ModalFail/index.js'
import ModalSuccess from '../components/ModalSuccess/index.js'
import { StormButton, PinkButton } from '../styles/mui.js';

export default function SignUp() {
    // Basic variables
    const navigate = useNavigate();

    // Get API class for work
    const api = useContext(APIContext)!.api

    // Captcha
    const captchaSiteKey: string = '6LeKRR4nAAAAAFsP7Qr_dCWczScuENUI1P7d4pf6';
    const [captchaValue, setCaptchaValue] = useState("");

    // Login / Password
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Error modal window
    const [isOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState('')

    // Success modal window
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)
    const [modalSuccessContent, setModalSuccessContent] = useState('')

    // Function to close modal window
    function onClose() {
        setIsOpen(false)
        setIsSuccessOpen(false)
    }

    // Function for user registration (Activated when clicking "Register" button)
    const onSignUp = useCallback(async () => {
        // Check for completed captcha
        if (!captchaValue) {
            // Show error through modal window
            setModalContent("Please complete the captcha");
            setIsOpen(true);

            return;

        }

        // Send request to backend 
        const resultRaw = await api!.signUp({
            username: username,
            password: password,
            recaptchaToken: captchaValue
        });

        // Get server response
        const result = resultRaw.data;

        // If error occurred
        if (result.success === false || result.succeed === false) {
            // Show error through modal window
            setModalContent(result.error);
            setIsOpen(true);
        }

        // If everything is good
        else {
            // Show success modal window
            setModalSuccessContent('Successful registration!')
            setIsSuccessOpen(true)
        }
    }, [api, captchaValue, password, username]);

    return (
        <>

            {/* Setting tags for page description and SEO */}

            <Helmet>
                <title>StormShop: Registration</title>
                <meta name="description" content="Registration page for NitroStorm store website" />
                <meta name="keywords" content='registration nitro discord nitrostorm buy nitro login' />
                <meta httpEquiv="Content-Language" content="en" />
                <meta name="author" content="FLEY" />
            </Helmet>

            .

            {/* Error modal window */}
            <ModalFail isOpen={isOpen} onClose={onClose}>
                {modalContent}
            </ModalFail>

            {/* Success modal window */}
            <ModalSuccess styles={{
                content: {
                    fontSize: '24px'
                }
            }} isOpen={isSuccessOpen} onClose={onClose}>
                {modalSuccessContent}
                <StormButton variant='outlined' onClick={() => navigate('/')} sx={{
                    marginTop: '16px',
                    background: 'none',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: 'none'
                    }
                }}>Return to home</StormButton>
            </ModalSuccess>

            {/* Main content */}
            <div className={styles.signup_container}>

                {/* Header */}
                <div className={styles.signup_title}>Register on Nitro Storm!</div>

                {/* Subheader */}
                <div className={styles.signup_subtitle}><b>Why?</b> - We will be able to calculate your statistics, track purchases and pay you profit!</div>

                {/* Registration form */}
                <div className={styles.signup_form}>

                    {/* Username */}
                    <label htmlFor='username'>NICKNAME:</label>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} id='username' />

                    {/* Note */}
                    <span style={{ fontSize: '16px' }}>Only Latin letters [a-z,A-Z], numbers and "_" are allowed </span>

                    {/* Password */}
                    <label htmlFor='password'>PASSWORD: </label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} id='password' />

                    {/* Notes */}
                    <span style={{ fontSize: '16px' }}>Password must be at least 16 characters and no more than 32! </span>
                    <span style={{ fontSize: '16px', color: 'red' }}>Password cannot be recovered! Save it somewhere!</span>

                    {/* Captcha */}
                    <div>
                        <ReCAPTCHA
                            sitekey={captchaSiteKey}
                            onChange={(value: string | null) => {
                                if (value) {
                                    setCaptchaValue(value);
                                }
                            }}
                        />
                    </div>

                    <br></br>

                    {/* Registration button */}
                    <PinkButton sx={{pl: 8, pr: 8}} onClick={onSignUp}>Register</PinkButton>
                </div>
            </div>
        </>
    )
}