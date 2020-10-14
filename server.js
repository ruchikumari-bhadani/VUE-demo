const express = require("express");
const path = require("path");
const app = express();
const tls = require("tls");  // eslint-disable-line no-unused-vars
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, (req, res)=>{      // eslint-disable-line no-unused-vars
    console.log(`node server running on ${port}`);
});