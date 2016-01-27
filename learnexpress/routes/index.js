var home = function(req, res){
  res.render("home", {"classes": [
  "Olin.js",
  "Data Science",
  "Circuits",
  "UOCD"]
});
};

module.exports.home = home;