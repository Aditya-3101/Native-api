const express = require("express");
const router = express.Router();
const database = require("../database/data");
const db = database();

router.get("/", (req, res) => {
  db.query("SELECT * FROM televisions", (err, rows, fields) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/get", (req, res) => {
  db.query(
    `SELECT * FROM televisions WHERE ProductId=${req.query.id}`,
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
    `SELECT SmPhotos FROM televisions WHERE ProductId=${req.query.get}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/search", (req, res) => {
  db.query(
    `SELECT * FROM televisions WHERE ProductId=${req.query.id}`,
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
  db.query("SELECT DISTINCT Sbrand FROM televisions", (err, rows, fields) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/sort/Brands/names", (req, res) => {
  let names = String(req.query.brand).replace(/,/g, " or Sbrand=").replace(/"/g, "'");

  db.query(
    `SELECT * FROM televisions WHERE Sbrand=${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/quality", (req, res) => {
  let arr = String(req.query.types).split(",");
  if (arr.length == 1) {
    db.query(
      `SELECT * FROM televisions Where TvdisplayType='${arr[0]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else if (arr.length == 2) {
    db.query(
      `SELECT * FROM televisions Where TvdisplayType='${arr[0]}' or TvdisplayType='${arr[1]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } else if (arr.length == 3) {
    db.query(
      `SELECT * FROM televisions Where TvdisplayType='${arr[0]}' or TvdisplayType='${arr[1]}' or TvdisplayType='${arr[2]}'`,
      (err, rows, fields) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).json(rows);
        }
      }
    );
  }
});

router.get("/sort/Brands/size", (req, res) => {
  let names = String(req.query.storage).replace(
    /,/g,
    " or TvdisplaySize Between "
  );

  db.query(
    `SELECT * FROM televisions Where TvdisplaySize between ${names.replace(
      /-/g,
      " and "
    )}`,
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
  let names = String(req.query.price).replace(/,/g, " or Tvprice<");

  db.query(
    `SELECT * FROM televisions Where Tvprice<${names}`,
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
    `SELECT * FROM televisions WHERE Sbrand!='${sName}' and Sbrand='${rName}'`,
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
  var result = [];
  result = news.split(`"`);
  let newReName = String(news.replace(result[1], "")).replace(/[^a-zA-Z]/g, "");
  db.query(
    `SELECT * FROM televisions WHERE Sbrand!='${seName}' and Sbrand='${result[1]}' or Sbrand='${newReName}'`,
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
    `SELECT * FROM televisions WHERE tvdisplayType != '${sName}' and tvdisplayType = '${rName}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/func/seName/reNames", (req, res) => {
  let sName = req.query.seName;
  let rName = req.query.reName.split(",");

  db.query(
    `SELECT * FROM televisions WHERE tvdisplayType != '${sName}' and tvdisplayType = '${rName[0]}' or tvdisplayType='${rName[1]}'`,
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
  let sName = req.query.sName.replace(/-/g, " and ");
  let rName = req.query.rName.replace(/-/g, " and ");
  //select * from televisions where TvdisplaySize NOT between 24 and 32 and TvdisplaySize between 52 and 76;

  db.query(
    `SELECT * FROM televisions where TvdisplaySize Not Between ${sName} and TvdisplaySize Between ${rName}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/names/func", (req, res) => {
  db.query(
    `SELECT * FROM televisions WHERE Sbrand='${req.query.names}' and tvdisplayType='${req.query.func}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/sort/Brands/names/func/capacity", (req, res) => {
  //SELECT * FROM televisions where sbrand="LG" and tvdisplayType='UHD' and tvdisplaySize Between 52 and 58;

  db.query(
    `SELECT * FROM televisions WHERE Sbrand='${
      req.query.names
    }' and tvdisplayType='${
      req.query.func
    }' and tvdisplaySize Between ${req.query.cap.replace(/-/g, " and ")}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
  // db.query(
  //   `SELECT * FROM wmachine WHERE Wname REGEXP '${req.query.names}' and Wmtech REGEXP '${req.query.func}' and WavgCapacity <${req.query.cap}`,
  //   (err, rows, fields) => {
  //     if (err) {
  //       res.status(400).send(err);
  //     } else {
  //       res.status(200).json(rows);
  //     }
  //   }
  // );
});

module.exports = router;
