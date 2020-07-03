// ===============================================================================
// DATA
// Below data will hold all of the notes.
// ===============================================================================
var notesArray = [
    {
        title: "title1",
        id: "343434",
        message: "This is an example of a note that would be saved to the server."
    },
    {
        title: "title2",
        id: "353535",
        message: "New note! Let's go!"
    }
];


// Note how we export the array. This makes it accessible to other files using require.
module.exports = notesArray;
