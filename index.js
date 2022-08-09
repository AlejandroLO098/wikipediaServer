const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "database-1.cjh1mxtqlxdy.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "MrMime098*",
  database: "Contact",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //   const sqlInsert =
  //     "INSERT INTO info (firstname, email, phone, comments) VALUES ('Alejandro L', 'test@gmail.com', '555-500', 'This is my second comment')";
  //   db.query(sqlInsert, (err, result) => {
  //     res.send("hello world");
  //   });
});

app.post("/api/contactinfo", (req, res) => {
  const firstname = req.body.firstname;
  const email = req.body.email;
  const phone = req.body.phone;
  const comments = req.body.comments;

  const sqlInsert =
    "INSERT INTO info (firstname, email, phone, comments) VALUES (?, ?, ?, ?)";
  db.query(sqlInsert, [firstname, email, phone, comments], (err, result) => {
    console.log(err);
  });
});
app.listen(3001, () => {
  console.log("running on port 3001...");
});
