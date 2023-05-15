var testoviParser = require('./TestoviParser.js');
const fs = require('fs');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static('./'));


const studenti = require("./app/controllers/studentController.js");

app.post('/student', studenti.create)  
    
app.put('/student/:index', studenti.update)

app.post('/batch/student', studenti.createCSV)

app.post('/vjezbe', studenti.createVjezbe)

app.post('/student/:index/vjezba/:vjezba', studenti.updateVjezbe)

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
app.listen(5000);
console.log('Server is running');