const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');

const port = 8080;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'automatedemailwaffleed@gmail.com',
      pass: ''
    }
});

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

    const mailOptions = {
        from: 'automatedemailwaffleed@gmail.com',
        to: 'waleedmalik027@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email sent using Nodemailer.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error('Error:', error);
        }
        console.log('Email sent:', info.response);
    });

});

app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
});