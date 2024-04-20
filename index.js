const express = require("express");
const colors = require("colors");
const dbConnection = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user-routes");
const notesRoutes = require("./routes/note-routes");
const bodyParser = require("body-parser");
const app = express();
app.use(cors({ origin: "*" }));
// Increase the maximum request size limit to handle larger file uploads
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const PORT = process.env.PORT || 8080;
dotenv.config();
dbConnection();

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("its working");
});

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`.bgRed.white);
});
