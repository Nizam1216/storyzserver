const notesModel = require("../models/Notes");
const userModel = require("../models/Users");
exports.allNotesControllers = async (req, res) => {
  try {
    const allnotes = await notesModel
      .find({ user: req.user.id })
      .sort({ date: -1 });
    res.json(allnotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.populateNotesControllers = async (req, res) => {
  try {
    const popilatenotes = await notesModel.find().sort({ date: -1 });
    res.json(popilatenotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.addNoteControllers = async (req, res) => {
  try {
    const { name, description, tag } = req.body;
    // Fetch user details to get the email
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const note = new notesModel({
      name,
      description,
      tag,
      user: req.user.id,
      userEmail: user.email,
    });
    await note.save();
    res.send(note);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateNoteControllers = async (req, res) => {
  try {
    const { name, description, tag } = req.body;
    const id = req.params.id;

    const newNote = {};
    if (name) {
      newNote.name = name;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await notesModel.findById(id);
    if (!note) {
      return res.status(401).send({ error: "no note found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "unotherised user" });
    }
    note = await notesModel.findByIdAndUpdate(
      note,
      { $set: newNote },
      { new: true }
    );
    res.send(note);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteNoteControllers = async (req, res) => {
  try {
    const id = req.params.id;
    let note = await notesModel.findById(id);
    if (!note) {
      return res.status(401).send({ error: "no note found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "unotherised user" });
    }
    note = await notesModel.findByIdAndDelete(note);
    res.send("note deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
exports.ReadNoteControllers = async (req, res) => {
  try {
    const id = req.params.id;
    let note = await notesModel.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Increment the views count
    note.views = (note.views || 0) + 1;
    await note.save();

    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
exports.addCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, email } = req.body;
    const user = userModel.findOne({ email: email });
    // Get the user information from the request
    console.log(user);
    // Check if the note exists
    const note = await notesModel.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    // Decrement the view count by 1
    note.views -= 1;
    // Add the comment to the note
    note.comments.push({
      text,
      email,
    });

    // Save the updated note
    await note.save();

    res.json({ message: "Comment added successfully", note });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
