const express = require("express");
const router = express.Router();
const database = require("../database/data");
const db = database();

let hotkey;
let mlist = [];

router.get("/", (req, res) => {
  db.query(
    `SELECT * FROM smartphones Where Sname REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/min/:search", (req, res) => {
  console.log(req.params);
  db.query(
    `  (SELECT ProductId, Sname, Sprice, Sram, Simg, Scolor, Sstorage, S_rating, S_reviews, Product_type FROM smartphones WHERE Sname REGEXP '${req.params.search}')
UNION
(SELECT ProductId, Sname, Sprice, Sram, Simg, Scolor, Sstorage, S_rating, S_reviews, Product_type FROM old_laptops WHERE Sname REGEXP '${req.params.search}');`,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/getBrands", (req, res) => {
  console.log(req.query.get);
  db.query(
    `SELECT Sbrand FROM smartphones Where Sname REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/lp", (req, res) => {
  console.log(req.query.get);
  db.query(
    `SELECT * FROM laptops Where LPname REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/lp/getBrands", (req, res) => {
  console.log(req.query.get);
  db.query(
    `SELECT Sbrand FROM laptops Where LPname REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/wm", (req, res) => {
  console.log(req.query.get);
  db.query(
    `SELECT * FROM wmachine Where Wname REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/wm/getBrands", (req, res) => {
  db.query(
    `SELECT Sbrand FROM wmachine Where Wname REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/Rf", (req, res) => {
  console.log(req.query.get);
  db.query(
    `SELECT * FROM refrigerators Where RfName REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/Rf/getBrands", (req, res) => {
  db.query(
    `SELECT Sbrand FROM refrigerators Where RfName REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/Tv", (req, res) => {
  console.log(req.query.get);
  db.query(
    `SELECT * FROM televisions Where Tvname REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/Tv/getBrands", (req, res) => {
  db.query(
    `SELECT Sbrand FROM televisions Where Tvname REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/Tb", (req, res) => {
  console.log(req.query.get);
  db.query(
    `SELECT * FROM tablets Where TbRealName REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/Tb/getBrands", (req, res) => {
  db.query(
    `SELECT Sbrand FROM tablets Where Tbname REGEXP '${req.query.get}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

module.exports = router;
