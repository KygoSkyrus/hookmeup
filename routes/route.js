const express = require('express');
const router = express('router');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const cookieParser = require('cookie-parser');
router.use(cookieParser());

const User = require('../modals/user');

const dotenv = require('dotenv');
dotenv.config({ path: '../env/config.env' });
const pswrd = process.env.PSWRD;
const emailAdd = process.env.EMAIL;


//multer things
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' +file.originalname)
    }
  })
  const upload = multer({ storage: storage }).single('file')



//smtp seerver
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailAdd,
        pass: pswrd
    }
});
var user, mailOptions, host, link, token;


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

        user = new User({ firstName, lastName, email, password });

        token = await user.generateAuthToken();
        console.log(user);

        //sending veriication email 
        host = req.get('host');
        console.log("host:" + host);
        link = "http://" + req.get('host') + "/verify?id=" + token;
        console.log("link:" + link);

        mailOptions = {
            from: emailAdd,
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

    } catch (err) {
        console.log(err);
    }
})


//verify(will run when the user clicks on verification link)
router.get('/verify', async function (req, res) {


    console.log(req.protocol + ":/" + req.get('host'));

    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched.");

        //console.log(req.query.id);

        if (req.query.id == token) {
            //res.status(200).json({message:"verified"});

            console.log("Email " + mailOptions.to + " is been Successfully verified");
            user.active = true;
            console.log(user);
            await user.save();

            //cookie
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });
            res.cookie('email', user.email, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });

            res.redirect('http://localhost:3000/verification');

        } else {
            res.status(201).json({ message: "not verified" })
            console.log("email is not verified");
        }

    } else {
        res.status(201).json({ message: "unknown source" })
        res.send("Request is from unknown source");
    }

});



//account active
router.post('/active', async (req, res) => {

    try {
        // const act = await User.findOne({ email: user.email });
        const act = await User.findOne({ email: "gupta.divya1116@gmail.com" });
        console.log("this is active api")
        console.log("act - " + act);
        console.log("act.active - " + act.active);
        
        if (act) {
            if (act.active === true) {
                return res.status(201).json({ message: act })
                //set cookies here maybe
            } else {
                return res.status(201).json({ message: "not active" })
            }
        } else {
            return res.status(201).json({ message: "user not found" })
        }

    } catch (err) {
        console.log(err);
    }

});


//secondaryDetails      
router.post('/secondarydetails', async (req, res) => {

    try {
        const {gender, interests,file, email } = req.body;

        // if (!email || !password) {
        //     return res.status(400).json({ error: "fill all details" });
        // }
        console.log(gender,email,interests,file);


        const userLogin = await User.findOne({ email: email });

        //console.log(userLogin);
/*
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);


            if (!isMatch) {
                res.status(400).json({ error: "invalid credentials" });
            } else {
                res.status(400).json({ message: "user logged in successfully" });
            }
        } else {
            res.status(200).json({ error: "account doesn't exists" });
        }
        */

    } catch (err) {
        console.log(err);
    }
})




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

            //try implementing that if there is already token then dont generte the token or replace the token with new one
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