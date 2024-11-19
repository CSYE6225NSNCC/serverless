// sendVerificationEmail.js
const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Store your API key in environment variables

// Function to send a verification email
const sendVerificationEmail = async ({ email, token }) => {
    const verificationLink = `http://demo.webapp-csye.me/v1/verify?user=${encodeURIComponent(email)}&token=${token}`;

    const emailBody = `
        <p>Thank you for signing up! Please verify your email address by clicking the link below:</p>
        <p><a href="${verificationLink}">Verify Email</a></p>
        <p>This link will expire in 2 minutes.</p>
    `;

    const msg = {
        to: email, // Recipient's email
        from: process.env.EMAIL_FROM, // Must be a verified sender in SendGrid
        subject: 'Verify Your Email',
        html: emailBody,
    };

    try {
        await sgMail.send(msg);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
        if (error.response) {
            console.error('SendGrid response error:', error.response.body);
        }
        throw error;
    }
};

module.exports = sendVerificationEmail;
