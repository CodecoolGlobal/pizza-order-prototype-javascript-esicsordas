const { readFileSync, readFile } = require("fs");

const readPackages = (filePath, word) => {
    const data = readFileSync(filePath);
    const dataObj = JSON.parse(data);
    return dataObj[word];
};

module.exports = readPackages;