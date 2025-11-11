// day_5.js
const express = require("express");
const app = express();
const studentRoutes = require("./routes/studentRoutes"); // import routes
const PORT = 3000;

app.use(express.json());
app.use("/students", studentRoutes); // mount routes

app.get("/", (req, res) => {
    res.send("Day 5 - Working with files and modular routes");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
