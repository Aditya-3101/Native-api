const express = require("express");
const router = express.Router();
const database = require("../database/data");
const { route } = require("../Desktops/laptops");
const db = database();

router.get("/", (req, res) => {
  db.query("SELECT * FROM wmachine", (err, rows, fields) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/get", (req, res) => {
  db.query(
    `SELECT * FROM wmachine WHERE ProductId=${req.query.id}`,
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
    `SELECT SmPhotos FROM wmachine WHERE ProductId=${req.query.get}`,
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
  db.query("SELECT DISTINCT Sbrand from wmachine", (err, rows, fields) => {
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
    `SELECT * FROM wmachine WHERE Sbrand=${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/capacity", (req, res) => {
  let names = String(req.query.storage).replace(/,/g, " or WavgCapacity<");

  db.query(
    `SELECT * FROM wmachine Where WavgCapacity <${names.replace(/Kg/g, "")}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/functionality", (req, res) => {
  let types = String(req.query.types).split(",");
  //   select * from wmachine where Wmtech REGEXP 'Fully AutoMatic' or Wmtech REGEXP 'Semi Automatic';
  if (types.length === 2) {
    db.query(
      `SELECT * FROM wmachine where Wmtech REGEXP '${types[0]}' or Wmtech REGEXP '${types[1]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else if (types.length === 1) {
    db.query(
      `SELECT * FROM wmachine where Wmtech REGEXP '${types[0]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  }
});

router.get("/sort/Brands/Price", (req, res) => {
  let names = String(req.query.price).replace(/,/g, " or Wprice<");

  db.query(
    `SELECT * FROM wmachine Where Wprice<${names}`,
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
    `SELECT * FROM wmachine WHERE Sbrand!='${sName}' and Sbrand='${rName}'`,
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
    `SELECT * FROM wmachine WHERE Sbrand!='${seName}' and Sbrand='${result[1]}' or Sbrand='${newReName}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/func/sName/rNames", (req, res) => {
  let sName = req.query.sName;
  let rName = req.query.rName.replace(",", "");

  db.query(
    `SELECT * FROM wmachine WHERE Wmtech NOT REGEXP '${sName}' and Wmtech REGEXP '${rName}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/Storage/sName/rNames", (req, res) => {
  const rName = String(req.query.rName).replace(/,/g, "");

  const sName = req.query.sName.replace(/Kg/g, "");

  if (sName > parseInt(rName.replace(/Kg/g, ""))) {
    db.query(
      `SELECT * FROM wmachine WHERE WavgCapacity > ${sName} or WavgCapacity < ${rName.replace(
        /Kg/g,
        ""
      )}`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else {
    db.query(
      `SELECT * FROM wmachine WHERE WavgCapacity > ${req.query.sName.replace(
        /Kg/g,
        ""
      )} and WavgCapacity < ${rName.replace(/Kg/g, "")}`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  }
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
    if (
      parseInt(seName.replace(/Kg/g, "")) > newData[0] &&
      parseInt(seName.replace(/Kg/g, "")) > newData[1]
    ) {
      db.query(
        `SELECT * FROM wmachine WHERE WavgCapacity > ${seName.replace(
          /Kg/g,
          ""
        )} or WavgCapacity Between ${String(newData[0]).replace(
          /Kg/g,
          ""
        )} and ${String(newData[1].replace(/Kg/g, ""))}`,
        (err, rows, fields) => {
          if (err) {
            res.status(400).sendFile(err);
          } else {
            res.status(200).json(rows);
          }
        }
      );
    }
    db.query(
      `SELECT * FROM wmachine WHERE WavgCapacity > '${seName.replace(
        /Kg/g,
        ""
      )}' and WavgCapacity < '${String(newData[0]).replace(
        /Kg/g,
        ""
      )}' or WavgCapacity='${String(newData[1]).replace(/Kg/g, "")}'`,
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
      `SELECT * FROM wmachine WHERE WavgCapacity > '${seName}' and WavgCapacity < '${newData[1]}' or WavgCapacity < '${newData[2]}'`,
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
      `SELECT * FROM wmachine WHERE WavgCapacity > '${seName}' and WavgCapacity < '${newData[0]}' or WavgCapacity < '${newData[2]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else {
  }
});

router.get("/sort/Brands/names/func", (req, res) => {
  db.query(
    `SELECT * FROM wmachine WHERE Wname REGEXP '${req.query.names}' and Wmtech REGEXP '${req.query.func}' `,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/names/func/capacity", (req, res) => {
  db.query(
    `SELECT * FROM wmachine WHERE Wname REGEXP '${req.query.names}' and Wmtech REGEXP '${req.query.func}' and WavgCapacity <${req.query.cap}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

module.exports = router;
