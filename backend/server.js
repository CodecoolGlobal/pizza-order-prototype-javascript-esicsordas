const express = require("express");
const { readFileSync } = require("fs");
const path = require("path");
const readPackages = require("./model.js"); 
const potionPath = path.join(`${__dirname}/potions.json`);
const app = express(); 

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/api/potions", (req, res) => {
    const potions = readPackages(potionPath, "potions");
    res.send(JSON.stringify(potions, null, '\t'));
})

app.get("/api/allergens",  (req, res) => {
    const allergens = readPackages(potionPath, "allergens");
    res.send(JSON.stringify(allergens, null, '\t'));
})

app.listen(3000);

