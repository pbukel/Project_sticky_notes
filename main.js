"use strict";

const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton); //prepending notes on display
});

addNoteButton.addEventListener("click", () => addNote());

// Local storage functon to get notes
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}
//Local storage function to save notes
function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// creating notes element on display and adding click event
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";
  //click function to update
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  // dbl click fucntion to delete note
  element.addEventListener("dblclick", () => {
    const dodelete = confirm("Are You sure Ypu want to delete note?");

    if (dodelete) {
      deleteNote(id, element);
    }
  });
  return element;
}

// add notes
function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}
//Updating content of note
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

// finding and deleting note from LocalStorage and dispplay
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  notesContainer.removeChild(element);
}
