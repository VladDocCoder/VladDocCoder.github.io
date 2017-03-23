aws iam upload-server-certificate \
--server-certificate-name server-certificate-name \
--certificate-body file:///path-to-your-certificate/your-certificate.pem \
--private-key file:///path-to-private-key/private-key.pem \
--certificate-chain file://path-to-chain-certificate/chain-certificate.pem \
--path /cloudfront/