//const { readFileSync, readFile } = require("fs");
const { readFile } = require("fs/promises");
const fs = require("fs/promises");

const readPackages = async (filePath, word) => {
    const data = await readFile(filePath);
    const dataObj = JSON.parse(data);
    return dataObj[word];
};

const overWritePkgsJson = async (data) => {
    try {
      await fs.writeFile('./backend//orders.json', data);
    } catch (err) {
      console.log(err);
    }
}

module.exports = {readPackages, overWritePkgsJson};