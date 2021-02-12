/*
 Authors: Alex & Sean
 Your name and student #: Alex A01247177
 Your Partner's Name and student #: Sean
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs');

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let movieListBack = ["Inception", "Spiderman", "The Dark Knight", "Tenet"];

app.get("/", (req, res) => res.render("pages/index", {movieListFront: movieListBack}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => { 
  movieListBack = req.body.movies.split(",");
  res.redirect(302, "/");
  console.log(req.body);
});


app.get("/myListQueryString", (req, res) => {
  console.log(req.query);
  const queryArray = req.query;
  const movies = Object.values(queryArray);
  console.log(movies);
  res.render("./pages/index", {movies});
  console.log(req.body);
});

app.get("/search/:movieNameBack", (req, res) => { //CHANGE MADE TO MOVIENAME
  console.log(req.params);
  const searchKeyword = req.params.movieListBack;
  fs.readFile(`${__dirname}/movieDescriptions.txt`,
  function(err, data) {
    if (err) {
      console.log(err);
    } else {
      const descriptions = data.split('\n').data.map("/movieDescriptions.txt")
      const searchDescriptions = descriptions.find(descriptions => searchKeyword);
      console.log(res.descriptions);
      res.render("./pages/searchResult", { movieListBack, searchDescriptions})
    }
  });

});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});