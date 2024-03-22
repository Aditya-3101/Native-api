const express = require("express");
const router = express.Router();
const database = require("../database/data");
const db = database();

router.get("/", (req, res) => {
  db.query("SELECT * FROM laptops", (err, rows, fields) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/old/", (req, res) => {
  db.query("SELECT * FROM old_laptops", (err, rows, fields) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/old/:id", (req, res) => {
  db.query(
    `SELECT * FROM old_laptops WHERE ProductId=${req.params.id}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/get", (req, res) => {
  db.query(
    `SELECT * FROM laptops WHERE ProductId=${req.query.id}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/allPhotos", (req, res) => {
  db.query(
    `SELECT SmPhotos FROM laptops WHERE ProductId=${req.query.get}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands", (req, res) => {
  db.query("SELECT DISTINCT Sbrand from laptops", (err, rows, fields) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/sort/Brands/names", (req, res) => {
  let names = String(req.query.brand).replace(/,/g, " or Sbrand=").replace(/"/g, "'");
  db.query(
    `SELECT * FROM laptops WHERE Sbrand=${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/RAM", (req, res) => {
  let names = String(req.query.ram).replace(/,/g, " or LPram=");
  db.query(
    `SELECT * FROM laptops Where LPram=${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/storage", (req, res) => {
  let names = String(req.query.storage).replace(/,/g, " or LPstorage=");

  db.query(
    `SELECT * FROM laptops Where LPstorage=${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/Price", (req, res) => {
  let names = String(req.query.price).replace(/,/g, " or LPprice<");

  db.query(
    `SELECT * FROM laptops Where LPprice<${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/names/rams", (req, res) => {
  db.query(
    `SELECT * FROM laptops where Sbrand='${req.query.names}' and LPram=${req.query.rams}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/names/ram/storage", (req, res) => {
  db.query(
    `SELECT * FROM laptops where Sbrand='${req.query.name}' and LPram=${req.query.ram} and LPstorage=${req.query.storage}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/sName/rNames", (req, res) => {
  let sName = req.query.sName.replace(/[^a-zA-Z ]/g, "");
  let rName = req.query.rName.replace(/[^a-zA-Z ]/g, "");
  db.query(
    `SELECT * FROM laptops WHERE Sbrand!='${sName}' and Sbrand='${rName}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/seName/reNames", (req, res) => {
  let seName = req.query.seName.replace(/[^a-zA-Z ]/g, "");
  let reName = req.query.reName.split("");
  let news = String(reName).replace(/,/g, "");
  var result = [];
  result = news.split(`"`);
  let newReName = String(news.replace(result[1], "")).replace(/[^a-zA-Z]/g, "");

  db.query(
    `SELECT * FROM laptops WHERE Sbrand!='${seName}' and Sbrand='${result[1]}' or Sbrand='${newReName}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/RAM/sName/rNames", (req, res) => {
  let sName = req.query.sName;
  let rName = req.query.rName.replace(",", "");
  db.query(
    `SELECT * FROM laptops WHERE LPram!='${sName}' and LPram='${rName}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/RAM/seName/reNames", (req, res) => {
  var result = String(req.query.reName).split(",");

  const seName = req.query.seName;

  let newData = [
    ...result.reduce((map, obj) => map.set(obj, obj), new Map()).values(),
  ];

  var numberPattern = /\d+/g;

  if ((newData[2] > 0) & (newData[0] > 0)) {
    db.query(
      `SELECT * FROM laptops WHERE LPram='${newData[0]}' or Sbrand='${newData[2]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else if ((newData[1] > 0) & (newData[2] > 0)) {
    db.query(
      `SELECT * FROM laptops WHERE LPram!='${seName}' and LPram='${newData[1]}' or LPram='${newData[2]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else if ((newData[0] > 0) & (newData[1] > 0)) {
    db.query(
      `SELECT * FROM laptops WHERE LPram!='${seName}' and LPram='${newData[0]}' or LPram='${newData[1]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else {
    console.log("error is here");
  }
});
router.get("/sort/Brands/Storage/sName/rNames", (req, res) => {
  const rName = String(req.query.rName).replace(/,/g, "");
  db.query(
    `SELECT * FROM laptops WHERE LPstorage!=${req.query.sName} and LPstorage=${rName}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/Storage/seName/reNames", (req, res) => {
  var result = String(req.query.reName).split(",");

  let reName = req.query.reName;

  reName = Array.from(new Set(reName.split(","))).toString();

  const seName = req.query.seName;

  let newData = [
    ...result.reduce((map, obj) => map.set(obj, obj), new Map()).values(),
  ];

  var numberPattern = /\d+/g;

  if ((newData[0] > 0) & (newData[1] > 0)) {
    db.query(
      `SELECT * FROM laptops WHERE LPstorage!='${seName}' and LPstorage='${newData[0]}' or LPstorage='${newData[1]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else if ((newData[1] > 0) & (newData[2] > 0)) {
    db.query(
      `SELECT * FROM laptops WHERE LPstorage!='${seName}' and LPstorage='${newData[1]}' or LPstorage='${newData[2]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else if ((newData[0] > 0) & (newData[2] > 0)) {
    db.query(
      `SELECT * FROM laptops WHERE LPstorage!='${seName}' and LPstorage='${newData[0]}' or LPstorage='${newData[2]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else {
    console.error(result);
  }
});

module.exports = router;
