const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db");
const fs = require("fs");
require("dotenv").config();
connectDB();
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
fs.readdir("./routes", async (err, files) => {
  if (err) throw new err();
  files.forEach((file) => {
    app.use(
      `/api/${file.split(".")[0].toLowerCase()}/`,
      require(`./routes/${file}`)
    );
  });
});

app.listen( 5000, () => {
  console.log("Server is live on port 5000");
});
