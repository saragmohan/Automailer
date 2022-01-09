const express = require("express");
const path = require('path');
const nodemailer = require("nodemailer")


const app = express();

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public/home.html'));
});

app.get('/mailer', (req, res) => {
    const mail = req.query.email;
    console.log(mail);


    async function main() {

        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false, // true for 465, false for other ports
            auth: {
                user: "saragmohtesting@gmail.com",
                pass: "sarag12345",
            },
        });


        let info = await transporter.sendMail({
            from: 'saragmohtesting@gmail.com', // sender address
            to: mail, // list of receivers
            subject: "Automailer", // Subject line
            text: "You have recieved a confirmation email from automailer", // plain text body
            html: "<b>You have recieved a confirmation email from automailer</b>", // html body
        }, function (err, info) {
            if (err) {
                res.sendFile(path.join(__dirname, 'Public/error.html'))
            }
            else {
                res.sendFile(path.join(__dirname, 'Public/success.html'))
            }
        });
    }
    main().catch(console.error);
})



app.listen(3334, function () {
    console.log('Server started...');
});