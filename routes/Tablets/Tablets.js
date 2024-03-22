const express = require("express");
const Router = express.Router();
const database = require("../database/data");
const db = database();

Router.get("/", (req, res) => {
  db.query("SELECT * FROM tablets", (err, rows, fields) => {
    if (err) {
      res.status(404);
      throw err;
    } else {
      res.status(200);
      res.json(rows);
    }
  });
});

Router.get("/get", (req, res) => {
  db.query(
    `SELECT * FROM tablets WHERE ProductId=${req.query.id}`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/allPhotos", (req, res) => {
  db.query(
    `SELECT SmPhotos FROM tablets where ProductId=${req.query.get}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/sort/Brands", (req, res) => {
  db.query("SELECT DISTINCT Sbrand FROM tablets", (err, rows, fields) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

Router.get("/sort/Brands/names", (req, res) => {
  let names = String(req.query.brand).replace(/,/g, " or Sbrand=").replace(/"/g, "'");

  db.query(
    `SELECT * FROM tablets WHERE Sbrand=${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/sort/Brands/storage", (req, res) => {
  let names = String(req.query.storage).replace(/,/g, " or Tbstorage=");

  db.query(
    `SELECT * FROM tablets Where Tbstorage=${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/sort/Brands/Price", (req, res) => {
  let names = String(req.query.price).replace(/,/g, " or Tbprice<");

  db.query(
    `SELECT * FROM tablets Where Tbprice<${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/sort/Brands/Size", (req, res) => {
  let names = req.query.Size.replace(/-/g, " and ").replace(
    /,/g,
    " or TbdisplaySize Between "
  );

  db.query(
    `SELECT * FROM tablets Where TbdisplaySize Between ${names}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/sort/Brands/sName/rNames", (req, res) => {
  let sName = req.query.sName.replace(/[^a-zA-Z ]/g, "");
  let rName = req.query.rName.replace(/[^a-zA-Z ]/g, "");
  db.query(
    `SELECT * FROM tablets WHERE Sbrand!='${sName}' and Sbrand='${rName}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/sort/Brands/seName/reNames", (req, res) => {
  let seName = req.query.seName.replace(/[^a-zA-Z ]/g, "");
  let reName = req.query.reName.split("");
  //let id = reName.substring(_ids.lastIndexOf((_id + ',') + 1), _ids.lastIndexOf(','));

  let news = String(reName).replace(/,/g, "");
  var result = [];
  result = news.split(`"`);
  let newReName = String(news.replace(result[1], "")).replace(/[^a-zA-Z]/g, "");

  db.query(
    `SELECT * FROM tablets WHERE Sbrand!='${seName}' and Sbrand='${result[1]}' or Sbrand='${newReName}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/sort/Brands/Size/sName/rNames", (req, res) => {
  let sName = req.query.sName.replace(/-/g, " and ");
  let rName = req.query.rName.replace(/-/g, " and ");
  //select * from televisions where TvdisplaySize NOT between 24 and 32 and TvdisplaySize between 52 and 76;

  db.query(
    `SELECT * FROM tablets where TbdisplaySize Not Between ${sName} and TbdisplaySize Between ${rName}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/sort/Brands/Storage/sName/rNames", (req, res) => {
  const rName = String(req.query.rName).replace(/,/g, "");
  db.query(
    `SELECT * FROM tablets WHERE Tbstorage!=${req.query.sName} and Tbstorage=${rName}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/sort/Brands/Storage/seName/reNames", (req, res) => {
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
      `SELECT * FROM tablets WHERE Tbstorage!='${seName}' and Tbstorage='${newData[0]}' or Tbstorage='${newData[1]}'`,
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
      `SELECT * FROM tablets WHERE Tbstorage!='${seName}' and Tbstorage='${newData[1]}' or Tbstorage='${newData[2]}'`,
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
      `SELECT * FROM tablets WHERE Tbstorage!='${seName}' and Tbstorage='${newData[0]}' or Tbstorage='${newData[2]}'`,
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
Router.get("/sort/Brands/names/size", (req, res) => {
  //SELECT * FROM televisions where sbrand="LG" and tvdisplayType='UHD' and tvdisplaySize Between 52 and 58;

  db.query(
    `SELECT * FROM tablets WHERE Sbrand='${
      req.query.names
    }' and TbdisplaySize Between ${req.query.rams.replace(/-/g, " and ")}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

Router.get("/sort/Brands/names/ram/storage", (req, res) => {
  db.query(
    `SELECT * FROM tablets where Sbrand='${
      req.query.name
    }' and TbdisplaySize Between ${req.query.ram.replace(
      /-/g,
      " and "
    )} and Tbstorage=${req.query.storage}`,
    (err, rows, fields) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

module.exports = Router;
