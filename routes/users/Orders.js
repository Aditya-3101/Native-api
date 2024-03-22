const express = require("express");
const router = express.Router();
const database = require("../database/data");
const db = database();

router.get("/", (req, res) => {
  db.query("SELECT * FROM orders", (err, rows, fields) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.post("/add", (req, res) => {
  db.query(
    `Insert into orders (userName,userNumber,orderProduct,OrderProductType,orderAmount,transType,orderDate)
     values ('${req.body.name}',${req.body.Pnumber},${req.body.productid},'${req.body.producttype}',${req.body.price},
     '${req.body.trans}','${req.body.date}')`,
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

router.post("/add/min", (req, res) => {
  db.query(
    `Insert into orders (userName,userNumber,orderProduct,OrderProductType,orderAmount,transType,orderDate)
     values ('${req.body.name}',${req.body.Pnumber},${req.body.productid},'${req.body.producttype}',${req.body.price},
     '${req.body.trans}','${req.body.date}')`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/records", (req, res) => {
  db.query(
    `SELECT * FROM nativecart.orders
    LEFT JOIN laptops ON orders.orderProduct=laptops.ProductId
    LEFT JOIN smartphones ON orders.orderProduct = smartphones.ProductId
    LEFT JOIN tablets ON orders.orderProduct= tablets.ProductId
    LEFT JOIN wmachine ON orders.orderProduct = wmachine.ProductId
    LEFT JOIN televisions ON orders.orderProduct = televisions.ProductId
    LEFT JOIN refrigerators ON orders.orderProduct = refrigerators.ProductId
     where orders.userNumber=${req.query.number} and  orders.ordersStatus='Delivered';`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/get/data", (req, res) => {
  //let name = req.query.userName;
  //select * from orders where userName="Aditya Dattatray Dhayfule";
  db.query(
    `SELECT * FROM orders WHERE userNumber = ${req.query.num}`,
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

router.post("/get/data/min", (req, res) => {
  //let name = req.query.userName;
  //select * from orders where userName="Aditya Dattatray Dhayfule";
  db.query(
    `select * from orders where userNumber=${req.body.num} && OrderProductType="laptops" || OrderProductType="Mobile";`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/get", (req, res) => {
  db.query(
    `SELECT * FROM orders
    LEFT JOIN laptops ON orders.orderProduct=laptops.ProductId
    LEFT JOIN smartphones ON orders.orderProduct = smartphones.ProductId
    LEFT JOIN tablets ON orders.orderProduct= tablets.ProductId
    LEFT JOIN wmachine ON orders.orderProduct = wmachine.ProductId
    LEFT JOIN televisions ON orders.orderProduct = televisions.ProductId
    LEFT JOIN refrigerators ON orders.orderProduct = refrigerators.ProductId
     where orders.userNumber=${req.query.number};`,
    (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.post("/get/min", (req, res) => {
  db.query(
    `
    SELECT 
        o.ProductId, o.Sname, o.Sprice, o.Simg, 
        orders.userNumber, orders.orderProduct, orders.orderDate,orders.ordersStatus,transType,orderId,OrderProductType
    FROM (
        SELECT ProductId, Sname, Sprice, Simg
        FROM old_laptops
        UNION ALL
        SELECT ProductId, Sname, Sprice, Simg
        FROM smartphones
    ) AS o
    JOIN orders ON o.ProductId = orders.orderProduct
    WHERE orders.userNumber = ${req.body.num};`,
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

router.get("/remove", (req, res) => {
  db.query(
    `DELETE from orders where orderProduct=${req.query.id}`,
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

router.get("/remove/min", (req, res) => {
  console.log(req.query);
  db.query(
    `DELETE from orders where orderID=${req.query.id}`,
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

module.exports = router;
