#!/bin/bash

echo "Creating SFTP Key ..."
echo "${SFTP_KEY}" | base64 --decode /tmp/sftp_rsa
echo "Uploading docs to Server ..."
scp -i ./dist/**/* ${SFTP_USER}@${SFTP_HOST}:${SFTP_PATH}