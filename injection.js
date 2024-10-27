const fs = require('fs');
const path = require('path');

// تابعی برای خواندن محتوای فایل و نوشتن آن در index.html
function appendContentToHTML(filePath, outputFilePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}: ${err}`);
            return;
        }

        // محتوای فایل را به index.html اضافه کنید
        const content = `<div><h2>${path.basename(filePath)}</h2><p>${data}</p></div>\n`;
        fs.appendFile(outputFilePath, content, (err) => {
            if (err) {
                console.error(`Error writing to file ${outputFilePath}: ${err}`);
            }
        });
    });
}

// تابعی برای خواندن پوشه و پردازش فایل‌ها
function processFilesInDirectory(directoryPath, outputFilePath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err}`);
            return;
        }

        // فیلتر کردن فقط فایل‌ها
        const filePaths = files.map(file => path.join(directoryPath, file))
            .filter(filePath => fs.statSync(filePath).isFile());

        // برای هر فایل، محتوای آن را به index.html اضافه کنید
        filePaths.forEach(filePath => appendContentToHTML(filePath, outputFilePath));
    });
}

// مسیر پوشه و فایل خروجی را مشخص کنید