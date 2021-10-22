const express = require('express');
const router = express('router');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
router.use(cookieParser());

const User = require('../modals/user');

const dotenv = require('dotenv');
dotenv.config({ path: './env/config.env' });


//smtp seerver
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "dgdev78@gmail.com",
        pass: "apophis2029"
    }
});
var user, random, mailOptions, host, link;


//signup
router.post('/signup', async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    console.log(firstName, lastName, email, password);



    if (!firstName || !lastName || !email || !password) {
        return res.status(422).json({ error: "fill all details" });
    } 

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "email already exists" });
        }

        //sending veriication email
        random = Math.floor((Math.random() * 100) + 54);
        host = req.get('host');
        console.log("host:" + host);
        link = "http://" + req.get('host') + "/verify?id=" + random;
        console.log("link:" + link);
   
        mailOptions = {
            from: 'dgdev78@gmail.com',
            to: email,
            subject: "Please confirm your Email account",
            html: '<p>Click <a href="' + link + '">here</a> to verify your email</p>'
        }

        console.log(mailOptions);

        smtpTransport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                //res.end("error");
            } else {
                console.log("Message sent: " + info.response);
                return res.status(422).json({ message: "email sent" })
            }
        });
        //ends here

        user = new User({ firstName, lastName, email, password });

        //hashing password

    } catch (err) {
        console.log(err);
    }
})

//verify
router.get('/verify',async function (req, res) {

   
    console.log(req.protocol + ":/" + req.get('host'));

    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
 
        if (req.query.id == random) {
            console.log("Email " + mailOptions.to + " is been Successfully verified");
            await user.save();

        const token = await user.generateAuthToken();
        //console.log(token);
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        });
        res.cookie('email', email, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        });

        res.status(201).json({ message: "user register successfully" })
        } else {
            console.log("email is not verified");
        }

    } else {
        res.send("Request is from unknown source");
    }

});



//signin
router.post('/signin', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "fill all details" });
        }

        const userLogin = await User.findOne({ email: email });

        //console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            //console.log(token);

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });
            res.cookie('email', email, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "invalid credentials" });
            } else {
                res.status(400).json({ message: "user logged in successfully" });
            }
        } else {
            res.status(200).json({ error: "account doesn't exists" });
        }

    } catch (err) {
        console.log(err);
    }
})


module.exports = router;