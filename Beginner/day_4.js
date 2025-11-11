// day_4.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware: log each request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware: parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory student data
let students = [];

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Day 4 - Express Middleware, Body Parsing & CRUD API");
});

// POST: Add new student (via JSON body)
app.post("/students", (req, res) => {
    const { name, age, grade } = req.body;
    if (!name || !age || !grade) {
        return res.status(400).json({ error: "Please include name, age, and grade" });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        age: parseInt(age),
        grade,
    };

    students.push(newStudent);
    res.status(201).json({ message: "Student added successfully", student: newStudent });
});

// GET: All students
app.get("/students", (req, res) => {
    res.json({ total: students.length, students });
});

// GET: Single student by ID
app.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
});

// DELETE: Remove student by ID
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }
    const removed = students.splice(index, 1);
    res.json({ message: "Student deleted", student: removed[0] });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
