const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

const getSecrets = async () => {
    const secretName = 'email-credentials';  // Fixed secret name
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    const secrets = JSON.parse(data.SecretString);
    
    console.log('Retrieved secrets:', secrets);  // Log the retrieved secrets
    
    return secrets;
};

exports.handler = async (event) => {
    try {
        const secrets = await getSecrets();  // Fetch the secrets
        const sendgridApiKey = secrets.sendgrid_api_key;
        const emailFrom = secrets.email_from;
        
        // Log the API key and email (ensure it's correct)
        console.log('SendGrid API Key:', sendgridApiKey);
        console.log('Email From:', emailFrom);
        
        // Now use the sendgridApiKey and emailFrom in your email sending logic
        // You can proceed with sending emails using these credentials
    } catch (error) {
        console.error('Error in Lambda function:', error);
        throw error;
    }
};
