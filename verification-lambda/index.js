const AWS = require('aws-sdk');

const sendVerificationEmail = require('./sendVerificationEmail'); // Import the email function
const secretsManager = new AWS.SecretsManager();
// // const { SecretsManager } = require('@aws-sdk/client-secrets-manager');
// const secretsManager = new SecretsManager({
//     region: 'us-east-1'
// });

exports.handler = async (event) => {
    try {
        secretName='email-credentials';
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
        console.log('Secret data:', data);
        const secret = JSON.parse(data.SecretString);
        console.log(secret);
        const sendgridApiKey = secret.sendgrid_api_key;
        const emailFrom = secret.email_from;

        if (!sendgridApiKey.startsWith('SG.')) {
            throw new Error('Invalid SendGrid API Key format');
        } else {
            console.log("starts with SG");
        }
        
        // Log the API key and email (ensure it's correct)
        console.log('SendGrid API Key:', sendgridApiKey);
        console.log('Email From:', emailFrom);
        
        // Now use the sendgridApiKey and emailFrom in your email sending logic
        // You can proceed with sending emails using these credentials

        // Parse SNS message
        const message = JSON.parse(event.Records[0].Sns.Message);
        const { email, token } = message;

        // Call the email function
        await sendVerificationEmail({ email, token, sendgridApiKey, emailFrom});

        console.log('Lambda execution completed successfully');

    } catch (error) {
        console.error('Error in Lambda function:', error);
        throw error;
    }
};