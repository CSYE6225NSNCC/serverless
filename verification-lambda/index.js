// lambda/index.js
const sendVerificationEmail = require('./sendVerificationEmail'); // Import the email function

exports.handler = async (event) => {
    try {
        // Parse SNS message
        const message = JSON.parse(event.Records[0].Sns.Message);
        const { email, token } = message;

        // Call the email function
        await sendVerificationEmail({ email, token });

        console.log('Lambda execution completed successfully');
    } catch (error) {
        console.error('Error in Lambda function:', error);
        throw error; // Ensure Lambda logs the error for debugging
    }
};