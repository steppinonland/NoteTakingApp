// the path package

var path = require("path");

module.exports = function(app) {
    // HTML GET requests

    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
      });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      });
}