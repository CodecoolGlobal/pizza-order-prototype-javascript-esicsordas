const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { readFile } = require("fs/promises");
const app = express();

const readPackages = require("./model.js"); 
const potionPath = path.join(__dirname, '..', './backend/potions.json');
const orderPath = path.join(__dirname, '..', './backend//orders.json');


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

app.get("/api/order",  async (req, res) => {
    const orders = await readPackages(orderPath, "orders");
    res.send(JSON.stringify(orders, null, '\t'));
})

app.post("/api/order",  async (req, res) => {
    const data = await readFile(orderPath);
    const dataObj = JSON.parse(data);
    let rbody = req.body;
    console.log(rbody);
    dataObj.orders.push(rbody);    
    overWritePkgsJson(JSON.stringify(dataObj, null, '\t'))
    res.end();
})

app.listen(3000);


async function overWritePkgsJson(data) {
    try {
      await fs.writeFile('./backend//orders.json', data);
    } catch (err) {
      console.log(err);
    }
  }

