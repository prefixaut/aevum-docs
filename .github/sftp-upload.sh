#!/bin/bash

# Options
KEY_FILE=/tmp/sftp_rsa

echo "Decoding private key ..."
echo "${SFTP_KEY}" | base64 --decode > $KEY_FILE
chmod 600 "${KEY_FILE}"
echo "Created key-file at: $KEY_FILE"
echo "Importing key ..."
ssh-add "${KEY_FILE}"
echo "Key successfully added."
echo "Uploading docs to Server ..."
scp -o "stricthostkeychecking=no" -r -P ${SFTP_PORT} ./dist/**/* ${SFTP_USER}@${SFTP_HOST}:${SFTP_PATH}
echo "Successfully uploaded Files."
