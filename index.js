const express = require("express");
const colors = require("colors");
const dbConnection = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user-routes");
const notesRoutes = require("./routes/note-routes");
const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();
dbConnection();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("its working");
});

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`.bgRed.white);
});
