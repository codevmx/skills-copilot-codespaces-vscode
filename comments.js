// Create web server using Express.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Use CORS
app.use(cors());
app.use(bodyParser.json());

// Read the file
function readData() {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data);
}

// Get request to get comments
app.get('/comments', (req, res) => {
    const data = readData();
    res.json(data);
});

// Post request to add comments
app.post('/comments', (req, res) => {
    const data = readData();
    data.push(req.body);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json(data);
});

// Delete request to delete comments
app.delete('/comments/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const newData = data.filter(item => item.id !== id);
    fs.writeFileSync('data.json', JSON.stringify(newData, null, 2));
    res.json(newData);
});

// Put request to update comments
app.put('/comments/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const newData = data.map(item => {
        if (item.id === id) {
            return req.body;
        }
        return item;
    });
    fs.writeFileSync('data.json', JSON.stringify(newData, null, 2));
    res.json(newData);
});

// Listen to the port
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});