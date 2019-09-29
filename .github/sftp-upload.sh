#!/bin/bash

$KEY_FILE=/tmp/sftp_rsa
echo "Creating SFTP Key ..."
echo cat $SFTP_KEY | base64 --decode > $KEY_FILE
echo "Created SFTP Key-File at: $KEY_FILE"
chmod 600 $KEY_FILE
echo "Uploading docs to Server ..."
scp -i "${KEY_FILE}" -o stricthostkeychecking=no ./dist/**/* ${SFTP_USER}@${SFTP_HOST}:${SFTP_PATH}