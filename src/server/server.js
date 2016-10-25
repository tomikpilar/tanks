const express = require("express");
const expressHandlebars = require("express-handlebars");
const serverApp = require("./serverApp.aio.js");

const expressApp = express();
const SERVER_PORT = 8080;

expressApp.engine(".hbs", expressHandlebars({extname: ".hbs", defaultLayout: "main"}));
expressApp.set("view engine", ".hbs");

expressApp.use(express.static('static'));

expressApp.get("/", (req, res) => {
  res.render("index");
});

expressApp.listen(SERVER_PORT, (error) => {
  if(error) {
    return console.log("Fuck, server is not listening. Something went wrong", error);
  }

  console.log("Server is listening at " + SERVER_PORT);
});