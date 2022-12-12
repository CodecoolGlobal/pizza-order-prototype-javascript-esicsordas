//const { readFileSync, readFile } = require("fs");
const { readFile } = require("fs/promises");

const readPackages = async (filePath, word) => {
    const data = await readFile(filePath);
    const dataObj = JSON.parse(data);
    return dataObj[word];
};

module.exports = readPackages;