#!/bin/bash

echo "Creating SFTP Key ..."
echo "${SFTP_KEY}" | base64 --decode > /tmp/sftp_rsa
chmod 600 /tmp/sftp_rsa
echo "Uploading docs to Server ..."
scp -i /tmp/sftp_rsa -o stricthostkeychecking=no ./dist/**/* ${SFTP_USER}@${SFTP_HOST}:${SFTP_PATH}