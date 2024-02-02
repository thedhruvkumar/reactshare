const express = require("express");
const app = express();
const connectDB = require("./db");
const fs = require("fs");
const cors = require("cors")
require("dotenv").config();
connectDB();
app.use(cors({ origin: ["http://localhost:5173","http://localhost:3000", "https://www.adityakr.com","https://adityakr.com"] }))
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
fs.readdir("./routes", async (err, files) => {
  if (err) return false;
  files.forEach((file) => {
    app.use(
      `/api/${file.split(".")[0].toLowerCase()}/`,
      require(`./routes/${file}`)
    );
  });
});

app.listen( 3001, () => {
  console.log("Server is live on port 3001");
});
