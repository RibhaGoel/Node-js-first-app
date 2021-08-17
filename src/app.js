const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define path for express config
const publicDirPath = path.join(__dirname, "../public");

//This read .hbs file from specific folder know as views
// So we need to create a folder with the name views
// View is a default path . We can create our customizing path by :-

const viewPath = path.join(__dirname, "/templates/views");

//Partial path
const partialPath = path.join(__dirname, "/templates/partials");

//Set up view location
app.set("views", viewPath);

//Set handlebars engine
app.set("view engine", "hbs");

// set partial
hbs.registerPartials(partialPath);

//Set up static directory to server
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ribha Goel",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "This is my about page",
  });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "This is my help page" });
});

// Env variable for HEroku
const port = process.env.PORT || 3000;

app.get("/weather", (req, res) => {
  if (!req.query.place) {
    return res.send({ error: "Please specify a place" });
  }
  console.log(req.query.place);

  geocode(req.query.place, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: "Error in fetching data" });
    }
    forecast(location, (error, resForecast) => {
      console.log(resForecast);
      res.send({
        location,
        longitude,
        latitude,
        curentTemp: resForecast,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404.hbs", {
    message: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404.hbs", {
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Web server is running ");
});
