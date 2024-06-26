const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const {
  allNotesControllers,
  addNoteControllers,
  updateNoteControllers,
  deleteNoteControllers,
  populateNotesControllers,
  ReadNoteControllers,
  addCommentController,
} = require("../controllers/noteControllers");
const router = express.Router();

router.post("/fetchallnotes", fetchUser, allNotesControllers);
router.post("/populatenotes", populateNotesControllers);
router.post("/addnote", fetchUser, addNoteControllers);
router.put("/updatenote/:id", fetchUser, updateNoteControllers);
router.delete("/deletenote/:id", fetchUser, deleteNoteControllers);
router.post("/readnote/:id", ReadNoteControllers);
router.post("/addcomment/:id", addCommentController);
module.exports = router;
