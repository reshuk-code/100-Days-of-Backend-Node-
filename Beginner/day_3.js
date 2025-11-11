const express = require("express");
const app = express();
const PORT = 3000;

let students = []; // store student info here

// Homepage
app.get('/', (req, res) => {
    res.send(`Use '/add-student?name={name}&age={age}&grade={grade}' to add a student  
            or go to '/students' to view all students.`);
});

// Add student (via query parameters)
app.get('/add-student', (req, res) => {
    const { name, age, grade } = req.query;

    if (!name || !age || !grade) {
        return res.send("Please provide name, age, and grade in the query. Example: /add-student?name=Reshuk&age=18&grade=12");
    }

    const newStudent = {
        id: students.length + 1,
        name,
        age: parseInt(age),
        grade
    };

    students.push(newStudent);
    res.send(`Student '${name}' added successfully!`);
});

// View all students (in JSON)
app.get('/students', (req, res) => {
    res.json({
        total: students.length,
        students
    });
});

// View specific student by name
app.get('/student/:name', (req, res) => {
    const student = students.find(s => s.name.toLowerCase() === req.params.name.toLowerCase());
    if (!student) {
        return res.status(404).send("Student not found");
    }
    res.json(student);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
