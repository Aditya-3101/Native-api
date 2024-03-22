const express = require("express");
const router = express.Router();
const database = require("../database/data");
const db = database();

router.get("/", (req, res) => {
  db.query("SELECT * FROM smartphones", (err, rows, fields) => {
    if (err) {
      res.status(201);
      res.json(err);
    } else {
      res.status(200);
      res.json(rows);
    }
  });
});

router.get("/cards", (req, res) => {
  db.query(
    "Select distinct ProductId,Sname,Sram,Sstorage,Sprocessor,S_rating, Simg,Sprice,Product_type,min_info from smartphones where ProductId=1004 or ProductId=1008 or ProductId=1010",
    (err, rows, fields) => {
      if (err) {
        res.status(201);
        res.json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

// router.get("/:id", (req, res) => {
//   console.log("line 33");
//   db.query(
//     `SELECT * FROM smartphones WHERE ProductId=${req.query.id}`,
//     (err, rows, fields) => {
//       if (err) {
//         res.status(400).json(err);
//       } else {
//         res.status(200).json(rows);
//       }
//     }
//   );
// });

router.get("/get", (req, res) => {
  db.query(
    `SELECT * FROM smartphones WHERE ProductId=${req.query.id}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send("in get method");
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/allPhotos", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  console.log(req.body);
  console.log("line 66");
  db.query(
    `SELECT SmPhotos FROM smartphones where ProductId=${
      req.query.get ? req.query.get : req.params.get
    }`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/search", (req, res) => {
  console.log(" in search");
  db.query(
    `SELECT * FROM smartphones WHERE ProductId=${req.query.id}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands", (req, res) => {
  db.query("SELECT Sbrand FROM smartphones;", (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/sort/Brands/names", (req, res) => {
  let names = String(req.query.brand).replace(/,/g, " or Sbrand=").replace(/"/g, "'");
  db.query(
    `SELECT * FROM smartphones WHERE Sbrand=${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/RAM", (req, res) => {
  let names = String(req.query.ram).replace(/,/g, " or Sram=");
  db.query(
    `SELECT * FROM smartphones Where Sram=${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/storage", (req, res) => {
  let names = String(req.query.storage).replace(/,/g, " or Sstorage=");

  db.query(
    `SELECT * FROM smartphones Where Sstorage=${names}`,
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
  let names = String(req.query.price).replace(/,/g, " or Sprice<");

  db.query(
    `SELECT * FROM smartphones Where Sprice<${names}`,
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
    `SELECT * FROM smartphones where Sbrand='${req.query.names}' and Sram=${req.query.rams}`,
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
    `SELECT * FROM smartphones where Sbrand='${req.query.name}' and Sram=${req.query.ram} and Sstorage=${req.query.storage}`,
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
    `SELECT * FROM smartphones WHERE Sbrand!='${sName}' and Sbrand='${rName}'`,
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
  let newReName = String(news.replace(result[1], "")).replace(/[^a-zA-Z]/g, "");
  //let reName = req.query.reName.replace(/[^a-zA-Z ]/g, "");
  db.query(
    `SELECT * FROM smartphones WHERE Sbrand!='${seName}' and Sbrand='${result[1]}' or Sbrand='${newReName}'`,
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
  //let sName = req.query.sName.replace(/[^a-zA-Z ]/g, "");
  //let rName = req.query.rName.replace(/[^a-zA-Z ]/g, "");
  let sName = req.query.sName;
  let rName = req.query.rName.replace(",", "");
  db.query(
    `SELECT * FROM smartphones WHERE Sram!='${sName}' and Sram='${rName}'`,
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
      `SELECT * FROM smartphones WHERE Sram='${newData[0]}' or Sbrand='${newData[2]}'`,
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
      `SELECT * FROM smartphones WHERE Sram!='${seName}' and Sram='${newData[1]}' or Sram='${newData[2]}'`,
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
      `SELECT * FROM smartphones WHERE Sram!='${seName}' and Sram='${newData[0]}' or Sram='${newData[1]}'`,
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

router.get("/sort/Brands/Storage/sName/rNames", (req, res) => {
  const rName = String(req.query.rName).replace(/,/g, "");
  db.query(
    `SELECT * FROM smartphones WHERE Sstorage!=${req.query.sName} and Sstorage=${rName}`,
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
      `SELECT * FROM smartphones WHERE Sstorage!='${seName}' and Sstorage='${newData[0]}' or Sstorage='${newData[1]}'`,
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
      `SELECT * FROM smartphones WHERE Sstorage!='${seName}' and Sstorage='${newData[1]}' or Sstorage='${newData[2]}'`,
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
      `SELECT * FROM smartphones WHERE Sstorage!='${seName}' and Sstorage='${newData[0]}' or Sstorage='${newData[2]}'`,
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

module.exports = router;
