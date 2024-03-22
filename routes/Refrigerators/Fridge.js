const express = require("express");
const router = express.Router();
const database = require("../database/data");
const db = database();

router.get("/", (req, res) => {
  db.query("SELECT * FROM refrigerators;", (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/get", (req, res) => {
  db.query(
    `SELECT * FROM refrigerators WHERE ProductId=${req.query.id}`,
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
    `SELECT SmPhotos FROM refrigerators WHERE ProductId=${req.query.get}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/brands", (req, res) => {
  db.query(`SELECT Sbrand FROM refrigerators;`, (err, rows, fields) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/sort/Brands/names", (req, res) => {
  let names = String(req.query.brand).replace(/,/g, " or Sbrand=").replace(/"/g, "'");
  console.log(names);
  db.query(
    `SELECT * FROM refrigerators WHERE Sbrand=${names}`,
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
  let names = String(req.query.storage).replace(/,/g, " or Rfstorage<");
  //console.log(names.replace(/L/g, ""));

  db.query(
    `SELECT * FROM refrigerators Where Rfstorage <${names.replace(/L/g, "")}`,
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
  //console.log(types[0]);
  console.log(types.length);
  //   select * from wmachine where Wmtech REGEXP 'Fully AutoMatic' or Wmtech REGEXP 'Semi Automatic';
  //   select * from refrigerators where Rfcool Regexp "frost free";
  if (types.length === 2) {
    db.query(
      `SELECT * FROM refrigerators where Rfcool REGEXP '${types[0]}' or Rfcool REGEXP '${types[1]}'`,
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
      `SELECT * FROM refrigerators where Rfcool REGEXP '${types[0]}'`,
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
  //console.log(req.query.price);
  let names = String(req.query.price).replace(/,/g, " or Rfprice<");

  db.query(
    `SELECT * FROM refrigerators Where Rfprice<${names}`,
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
  //console.log(req.query.rName);
  let sName = req.query.sName.replace(/[^a-zA-Z ]/g, "");
  let rName = req.query.rName.replace(/[^a-zA-Z ]/g, "");
  db.query(
    `SELECT * FROM refrigerators WHERE Sbrand!='${sName}' and Sbrand='${rName}'`,
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
  //let id = reName.substring(_ids.lastIndexOf((_id + ',') + 1), _ids.lastIndexOf(','));

  let news = String(reName).replace(/,/g, "");

  //var part = news.substring(news.lastIndexOf('"') + 1, news.lastIndexOf('"'));
  var result = [];
  result = news.split(`"`);
  console.log(result[1]);
  let newReName = String(news.replace(result[1], "")).replace(/[^a-zA-Z]/g, "");
  //console.log(newReName);
  //console.log(part);
  //let reName = req.query.reName.replace(/[^a-zA-Z ]/g, "");
  db.query(
    `SELECT * FROM refrigerators WHERE Sbrand!='${seName}' and Sbrand='${result[1]}' or Sbrand='${newReName}'`,
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
  //console.log(req.query.rName);
  //let sName = req.query.sName.replace(/[^a-zA-Z ]/g, "");
  //let rName = req.query.rName.replace(/[^a-zA-Z ]/g, "");
  let sName = req.query.sName;
  let rName = req.query.rName.replace(",", "");

  //console.log(sName);

  db.query(
    `SELECT * FROM refrigerators WHERE Rfcool NOT REGEXP '${sName}' and Rfcool REGEXP '${rName}'`,
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
  //console.log(req.query.sName);
  const rName = String(req.query.rName).replace(/,/g, "");
  //select * from wmachine where WavgCapacity > 8 and WavgCapacity < 10;

  //console.log(req.query.sName.replace(/Kg/g, ""));

  const sName = req.query.sName.replace(/L/g, "");

  if (sName > parseInt(rName.replace(/L/g, ""))) {
    db.query(
      `SELECT * FROM refrigerators WHERE Rfstorage > ${sName} or Rfstorage < ${rName.replace(
        /L/g,
        ""
      )}`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
          console.log(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else {
    db.query(
      `SELECT * FROM refrigerators WHERE Rfstorage > ${req.query.sName.replace(
        /L/g,
        ""
      )} and Rfstorage < ${rName.replace(/L/g, "")}`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
          console.log(err);
        } else {
          res.status(200).json(rows);
          console.log(rows);
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

  //console.log(seName);

  let newData = [
    ...result.reduce((map, obj) => map.set(obj, obj), new Map()).values(),
  ];
  console.log(result);
  console.log("newData[0]", result[0]);
  console.log("newData[1]", newData[1]);
  console.log("newData[2]", newData[2]);

  //console.log(typeof +newData[0]);

  var numberPattern = /\d+/g;

  //select * from wmachine where WavgCapacity > 10 or WavgCapacity Between 6 and 8;

  if ((newData[0] > 0) & (newData[1] > 0)) {
    if (
      parseInt(seName.replace(/L/g, "")) > newData[0] &&
      parseInt(seName.replace(/L/g, "")) > newData[1]
    ) {
      db.query(
        `SELECT * FROM refrigerators WHERE Rfstorage > ${seName.replace(
          /L/g,
          ""
        )} or Rfstorage Between ${String(newData[0]).replace(
          /L/g,
          ""
        )} and ${String(newData[1].replace(/L/g, ""))}`,
        (err, rows, fields) => {
          if (err) {
            res.status(400).sendFile(err);
          } else {
            res.status(200).json(rows);
            //console.log(rows);
          }
        }
      );
    }
    db.query(
      `SELECT * FROM refrigerators WHERE Rfstorage > '${seName.replace(
        /L/g,
        ""
      )}' and Rfstorage < '${String(newData[0]).replace(
        /L/g,
        ""
      )}' or Rfstorage='${String(newData[1]).replace(/L/g, "")}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).json(err);
          console.log(err);
        } else {
          res.status(200).json(rows);
          console.log(rows);
        }
      }
    );
  } else if ((newData[1] > 0) & (newData[2] > 0)) {
    db.query(
      `SELECT * FROM refrigerators WHERE Rfstorage > '${seName}' and Rfstorage < '${newData[1]}' or Rfstorage < '${newData[2]}'`,
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
      `SELECT * FROM refrigerators WHERE Rfstorage > '${seName}' and Rfstorage < '${newData[0]}' or Rfstorage < '${newData[2]}'`,
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
    console.log(String(newData[0].match(numberPattern)));
  }
});

router.get("/sort/Brands/names/func", (req, res) => {
  console.log(req.query.names + "\n");
  console.log(req.query.func);
  db.query(
    `SELECT * FROM refrigerators WHERE Rfname REGEXP '${req.query.names}' and Rfcool REGEXP '${req.query.func}' `,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
        console.log(rows);
      }
    }
  );
});

router.get("/sort/Brands/names/func/capacity", (req, res) => {
  //console.log(req.query.names + "\n");
  //console.log(req.query.func);
  //console.log(req.query.cap);
  db.query(
    `SELECT * FROM refrigerators WHERE Rfname REGEXP '${req.query.names}' and Rfcool REGEXP '${req.query.func}' and Rfstorage <${req.query.cap}`,
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
