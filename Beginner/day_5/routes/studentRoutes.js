// routes/studentRoutes.js
const express = require("express");
const fs = require("fs");
const router = express.Router();

const DATA_FILE = "./data/students.json";

// helper: read data
function readStudents() {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(data);
    } catch (err) {
        return []; // if file missing or invalid
    }
}

// helper: write data
function saveStudents(students) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
}

// GET all students
router.get("/", (req, res) => {
    const students = readStudents();
    res.json(students);
});

// POST add student
router.post("/", (req, res) => {
    const { name, age, grade } = req.body;
    if (!name || !age || !grade) {
        return res.status(400).json({ error: "name, age, and grade required" });
    }

    const students = readStudents();
    const newStudent = { id: Date.now(), name, age, grade };
    students.push(newStudent);
    saveStudents(students);

    res.status(201).json({ message: "Student added", student: newStudent });
});

// DELETE student by id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let students = readStudents();
    const index = students.findIndex(s => s.id === id);

    if (index === -1) return res.status(404).json({ error: "Not found" });

    const removed = students.splice(index, 1);
    saveStudents(students);

    res.json({ message: "Student deleted", student: removed[0] });
});

module.exports = router;
