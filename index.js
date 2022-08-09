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

app.get("/api/viewcomments", async (req, res) => {
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  db.getConnection((err, conn) => {
    if (err) throw err;

    try {
      const qry = `SELECT * FROM info`;
      conn.query(qry, (err, result) => {
        conn.release();
        if (err) throw err;
        res.send(JSON.stringify(result));
      });
    } catch (err) {
      console.log(err);
      res.end;
    }
  });
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
app.listen(process.env.PORT || 3001, () => {
  console.log("running on port 3001...");
});
