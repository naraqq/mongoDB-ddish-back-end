const express = require("express");
require('dotenv').config();
const app = express();
const cors = require("cors");
const PORT = 5000
const bodyParser = require("body-parser");


const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'test'
let db



//! MONGOOSE SECTION

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db(dbName)
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)
})

//! MONGOOSE SECTION


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// GET REQUEST
app.get("/", async (req, res) => {
    return res.json({ message: "Node server ажиллаж байна. ✌️" });
});

app.get("/list", async (req, res) => {
    const allList = await MyList.find();
    return res.status(200).json(allList);
});
// GET REQUEST

// POST REQUEST
app.post("/list", async (req, res) => {
    const newList = new MyList({ ...req.body });
    const insertedList = await newList.save();
    return res.status(201).json(insertedList);
  });

// POST REQUEST

//DELETE REQUEST
app.delete("/list/:id", async (req, res) => {
  const { id } = req.params;
  const deleteList = await MyList.findByIdAndDelete(id);
  return res.status(200).json(deleteList);
});
//DELETE REQUEST

//UPDATE REQUEST
app.put("/list/:id", async (req, res) => {
  const { id } = req.params;
  MyList.findByIdAndUpdate(
    id, req.body, (err, result) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      res.send(result)
    }
  });
});

//UPDATE REQUEST