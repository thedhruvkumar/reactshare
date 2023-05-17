const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("../db");
const fs = require("fs");
require("dotenv").config();
connectDB();
app.use(express.json());
const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);
fs.readdir("../routes", async (err, files) => {
  if (err) return false;
  files.forEach((file) => {
    app.use(
      `/api/${file.split(".")[0].toLowerCase()}/`,
      require(`../routes/${file}`)
    );
  });
});

app.listen( 3001, () => {
  console.log("Server is live on port 3001");
});
