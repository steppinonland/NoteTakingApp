// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information about the notes.
// ===============================================================================
const fs = require("fs");
var notesData = require("../db/db.json");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users view the notes.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the notes)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });
// creating the id assignment function:
var id = notesData.length + 1;


  // API POST Requests
  // Below code handles when a user submits a note and thus submits data to the server.
  // In each of the below cases, when a user submits a note (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the notesArray)
  // ---------------------------------------------------------------------------
  app.post("/api/notes", function(req, res) {
    if(!req.body.title || !req.body.text) {
      return res.status(400).json({ msg: 'Must include a title and note message. Try again.'})
    }
    // assign the ID number to the note
    req.body.id = id++;
    // push the message to the notes data
    notesData.push(req.body)
    // write the note to the JSON
    fs.writeFile("./db/db.json", JSON.stringify(notesData), function (err) {
      if (err) throw err
    })
    res.json(notesData)
  });

  // updating the note:
  // app.put("/api/notes/:id", function(req, res) {
  //   var update = req.body.id;
  //   update.save(function (err) {
  //     if (err) {
  //       return res.send('/notes'), {
  //         errors: err.errors,
  //         update: update
  //       }
  //     } else {
  //       res.json(update);
  //     }
  //   })
  // })
  // delete request:
  app.delete("/api/notes/:id", function(req, res) {
    var avail = notesData.find(notesData => notesData.id === parseInt(req.params.id));
    
    if (avail) {
      notesData = notesData.filter(notesData => notesData.id !== parseInt(req.params.id))
      res.json({
          msg:'Note deleted',
          notesData
      });
    } else {
        res.status(400).json({msg: `No note found with the id of ${req.params.id}`});
    }
});
};