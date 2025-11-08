const express = require("express");
const app = express();
const PORT = 3000;


// Sample student data in JSON format
const student = [
    {
        id: 123,
        name: "Alpha Gama",
        grade: 12,
        major: "Computer Science"
    }
];

// Route for '/student' → this will send student data when visited
app.get("/student", (req, res) => {
    res.json(student);  // Sends JSON response containing student info
});



app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
