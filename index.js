const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
// constants
const DB_PATH = path.resolve("db.json");
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
// routes
app.get("/", async (req, res) => {
  fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
    if (err) return console.log("Error in reading from db");
    let values = JSON.parse(jsonString);
    res.status(200).json({
      totalValues: values.length,
      values,
    });
  });
});

app.get("/welcome", async (req, res) => {
  res.send("Welcome To SmartHinga");
});

app.post("/", async (req, res) => {
  fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
    if (err) return console.log("Error in reading from db");
    let body = req.body;
    let valuesArr = JSON.parse(jsonString);
    let obj = {
      temperature: body.temperature,
      humidity: body.humidity,
      timestamp: new Date(),
    };

    let _id = Object.keys(valuesArr).length + 1
    
    // var temperature = body.temperature;
    // var humidity = body.humidity;
    // var timestamp = new Date();
    
    // let obje = [temperature, humidity, timestamp];

    //valuesArr.push(obj);

    valuesArr[_id] = obj;
    fs.writeFile(DB_PATH, JSON.stringify(valuesArr), (err) => {
      if (err) return console.log("Error in updating db");
      res.status(200).json({
        message: "Values saved",
        value: valuesArr[valuesArr.length - 1],
      });
    });
  });
});

app.listen(PORT, () => console.log("Listening on port", PORT));
