const express = require("express");
const router = express.Router();
const database = require("../database/data");
const db = database();

router.post("/add/item", (req, res) => {
  db.query(
    `Insert into carts (userName,Pnumber,userCart) values ('${req.body.name}',${req.body.Pnumber},${req.body.itemid})`,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

module.exports = router;
