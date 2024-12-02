# serverless

This is required for running the lambda function within terraform. Zip the contents of the verification-lambda file after adding the node module and enter the path of local directory.



#Import certificate command:

aws acm import-certificate `    --certificate file://"C:\Users\Amruta\OneDrive\Documents\Northeastern University\Semester 2\Cloud\Assignments\Assignment 9\demo_webapp-csye_me\certificate-base64.pem.crt" `    --private-key file://"C:\Users\Amruta\OneDrive\Documents\Northeastern University\Semester 2\Cloud\Assignments\Assignment 9\webapp-base64.key" `    --certificate-chain file://"C:\Users\Amruta\OneDrive\Documents\Northeastern University\Semester 2\Cloud\Assignments\Assignment 9\demo_webapp-csye_me\certificate_chain-base64.pem" `    --region us-east-1 --profile demo