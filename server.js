const express = require('express');
const path = require('path');
const app = express();

const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/email', (req,res) => {
    const data = req.body;
    for (const person in data) {
        const { email, partner } = data[person];
        console.log(`Person: ${person}, Email: ${email}, Partner: ${partner}`);
    }
});

app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
});