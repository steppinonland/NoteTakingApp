// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information about the notes.
// ===============================================================================

var notesData = require("./db/notesData");

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

  // API POST Requests
  // Below code handles when a user submits a note and thus submits data to the server.
  // In each of the below cases, when a user submits a note (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the notesArray)
  // ---------------------------------------------------------------------------
  app.post("/api/notes", function(req, res) {
    const newNote = {
        id: parseInt(newNote[i]),
        title: req.body.title,
        message: req.body.message
    }
    if(!newNote.title || !newNote.message) {
        return res.status(400).json({ msg: 'Must include a title and note message. Try again.'})
    }
    notesData.push(newNote);
    res.json(notesData);
  });
  // delete request:
  app.delete("/api/notes/:id", function(req, res) {
    const avail = notesData.some(notesData => notesData.id === parseInt(req.params.id));
    
    if (avail) {
      res.json({
          msg:'Note deleted',
          notesData: notesData.filter(notesData => notesData.id !== parseInt(req.params.id))
      });
    } else {
        res.status(400).json({msg: `No note found with the id of ${req.params.id}`});
    }
});
};