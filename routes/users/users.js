const express = require("express");
const router = express.Router();
const database = require("../database/data");
const db = database();

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, rows, fields) => {
    if (err) {
      res.send(400).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.post("/post", (req, res) => {
  db.query(
    `INSERT INTO users (userName,Age,Pnumber,Mail,userPassword,userGender,userAdress) VALUES ('${req.body.name}',${req.body.age},${req.body.number},
        '${req.body.mail}','${req.body.psw}','${req.body.gen}','${req.body.add}')`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.post("/post/min", (req, res) => {
  db.query(
    `INSERT INTO users (userName,Age,Pnumber,Mail,userPassword,userGender,userAdress) VALUES ('${req.body.name}',${req.body.age},${req.body.number},
        '${req.body.mail}','${req.body.psw}','${req.body.gen}','${req.body.add}')`,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/validate", (req, res) => {
  //select * from users where userName='Aditya Dattatray Dhayfule' and userPassword='31J@n2001';
  console.log(req.query)
  db.query(
    `SELECT * FROM users WHERE Pnumber = ${req.query.name} and userPassword='${req.query.pass}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.post("/validate/min", (req, res) => {
  //select * from users where userName='Aditya Dattatray Dhayfule' and userPassword='31J@n2001';
  db.query(
    `SELECT * FROM users WHERE Pnumber = ${req.body.num} and userPassword='${req.body.pass}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/validate/user", (req, res) => {
  //select * from users where userName='Aditya Dattatray Dhayfule' and userPassword='31J@n2001';
  db.query(
    `SELECT * FROM users WHERE Pnumber = ${req.query.name} and userPassword='${req.query.pass}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/validate/name", (req, res) => {
  //select * from users where userName='Aditya Dattatray Dhayfule' and userPassword='31J@n2001';
  db.query(
    `SELECT * FROM users WHERE Pnumber = ${req.query.name}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/checkuser", (req, res) => {
  //select * from users where userName='Aditya Dattatray Dhayfule' and userPassword='31J@n2001';
  //select * from users where Pnumber = 9890640477;
  db.query(
    `SELECT * FROM users WHERE Pnumber = ${req.query.no}`,
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
