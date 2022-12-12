const express = require("express");
const path = require("path");
const app = express();

const readPackages = require("./model.js"); 
const potionPath = path.join(`${__dirname}/potions.json`);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/api/potions", async (req, res) => {
    const potions = await readPackages(potionPath, "potions");
    res.send(JSON.stringify(potions, null, '\t'));
})

app.get("/api/allergens",  async (req, res) => {
    const allergens = await readPackages(potionPath, "allergens");
    res.send(JSON.stringify(allergens, null, '\t'));
})

app.listen(3000);

