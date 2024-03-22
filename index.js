const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.use("/api/main/smartphones", require("./routes/smartphones/smartphones"));

app.use("/api/main/laptops", require("./routes/Desktops/laptops"));

app.use("/api/main/wmachines", require("./routes/Wmachines/Wmachine"));

app.use("/api/main/search", require("./routes/Search/Search"));

app.use("/api/main/data", require("./routes/Search/Names"));

app.use("/api/main/Refrigerators", require("./routes/Refrigerators/Fridge"));

app.use("/api/main/televisions", require("./routes/Televisions/Televisions"));

app.use("/api/main/Tablets", require("./routes/Tablets/Tablets"));

app.use("/api/main/users", require("./routes/users/users"));

app.use("/api/main/orders", require("./routes/users/Orders"));

app.use("/api/main/carts", require("./routes/users/addCart"));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
