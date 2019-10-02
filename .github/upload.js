const fs = require('fs');
const path = require('path');

const Client = require('ssh2-sftp-client');

const privateKey = Buffer.from(process.env.SFTP_KEY, 'base64').toString('utf8');
const sftpPort = process.env.SFTP_PORT;
const sftpUser = process.env.SFTP_USER;
const sftpHost = process.env.SFTP_HOST;
const sftpPath = process.env.SFTP_PATH;

const sftp = new Client();
console.log('Connecting to sftp server ...');

sftp.connect({
    host: sftpHost,
    port: parseInt(sftpPort),
    username: sftpUser,
    privateKey: privateKey,
}).then(async () => {
    console.log('Successfully connected!');

    const rootDir = path.resolve(__dirname, '../dist');
    console.log(`Root directory for uploads: ${rootDir}`);

    const files = await getFilesRecursive(rootDir);
    console.log(`Found a total of ${files.length} files in the root-dir to upload!`);

    for (let i = 0; i < files.length; i++) {
        const sourceFile = path.resolve(rootDir, files[i]);
        const destFile = path.resolve(sftpPath, files[i]);
        console.log(`Uploading "${files[i]}" to remote "${destFile}"`);
        await sftp.put(fs.createReadStream(sourceFile), destFile);
        console.log('File successfully uploaded!');
    }
}).then(() => {
    console.log('All files successfully uploaded!');
    process.exit(0);
}).catch(error => {
    console.error('Error while uploading files!', error);
    process.exit(1);
});

async function getFilesRecursive(rootDirectoy, directoy) {
    if (directory == null) {
        directory = rootDirectoy;
    }
    const distFiles = fs.readdirSync(directory, { withFileTypes: true });

    const outFiles = [];
    for (let i = 0; i < distFiles.length; i++) {
        const file = distFiles[i];
        if (file.isFile()) {
            outFiles.push(path.relative(rootDirectoy, outFiles));
        } else if (file.isDirectory()) {
            outFiles.push(... await getFilesRecursive(rootDirectoy, file.name));
        }
    }

    return outFiles;
}