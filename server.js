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
      pass: 'wbplrludipfdpwgk'
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/email', async (req,res) => {
    try{
        const data = req.body;
        for (const person in data) {
            const { email, partner } = data[person];

            const mailOptions = {
                from: 'automatedemailwaffleed@gmail.com',
                to: email,
                subject: 'Secret Santa Partner',
                text: `Hi! You have the following person for Secret Santa: ${partner}`,
            };

            console.log(mailOptions);
        
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        }

        res.status(200).send();
        
    }catch(error){
        console.log('Error: ', error);
        res.status(500).send();
    }
    
    
});

app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
});