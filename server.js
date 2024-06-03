const qr = require("qrcode");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
let image;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  image = '<img src="img/default-img.svg" alt="QR Code" width="90%"> ';
  res.render("index", { image });
});

app.post("/qr", (req, res) => {
  const url = req.body.url;
  const qrCode = qr.toString(url, { type: "svg" }, function (err, code) {
    if (err) return console.log("error occurred");
    else return code;
  });
  res.render("index", { image: qrCode });
});
app.listen(3000, () => console.log("server is running on port 3000"));
