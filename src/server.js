const express = require("express");
const cors = require("cors");
const modules = require("./moduls/app.module.js");
require("dotenv/config");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("uploads"));

app.use("/", modules.router);


const PORT = process.env.PORT || 3030

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});