// ```javascript
const fs = require('fs');
const path = require('path');

function readFilesRecursively(directory, outputFile) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    readFilesRecursively(filePath, outputFile);
                } else {
                    fs.appendFileSync(outputFile, filePath + '\n');
                }
            });
        });
    });
}

const outputFilePath = 'output.txt';
const directoryPath = './path/to/your/directory';

readFilesRecursively(directoryPath, outputFilePath);

