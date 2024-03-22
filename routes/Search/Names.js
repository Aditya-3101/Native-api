const express = require("express");
const router = express.Router();
const database = require("../database/data");
const db = database();

router.get("/sm", (req, res) => {
  db.query("SELECT Sname FROM smartphones", (err, rows, fields) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/lp", (req, res) => {
  db.query("SELECT LPname FROM laptops", (err, rows, fields) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/wm", (req, res) => {
  db.query("SELECT Wname FROM wmachine", (err, rows, fields) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/Rf", (req, res) => {
  db.query("SELECT RfName FROM refrigerators;", (err, rows, fields) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/Tv", (req, res) => {
  db.query("SELECT Tvname FROM televisions", (err, rows, fields) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/Tb", (req, res) => {
  db.query("SELECT TbRealName FROM tablets", (err, rows, fields) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;
