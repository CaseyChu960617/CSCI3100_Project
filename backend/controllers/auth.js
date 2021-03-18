const User = require('../models/user')
const bcrypt = require("bcrypt");
const mailgun = require('mailgun-js');
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
        console.log(req.body);

        const { lastname, firstname, username, email, password, gender } = req.body;

        User.findOne({ username, email }).exec((err, user) => {
            if (user) {
                return res.status(400).json({
                    error: "User with this username/email already existed."
                })
            }
        });

        hashedPassword = await bcrypt.hash(password, 10)
        var newUser = await User.create({
            lastname: lastname,
            firstname: firstname,
            username: username,
            email: email,
            password: hashedPassword,
            gender: gender,
            profileImage: "",
        });

        console.log(newUser);

         const data = {
             
                    //from: "Mailgun Sandbox <postmaster@sandboxa6113ec32ac246bf99819221de84c22f.mailgun.org>",
                    from: 'noreply@urge.org',
                    to: email ,
                    subject: "Account activiation",
                    template: "testing",
                    "v:firstname":"John"
         }

         mg.messages().send(data, (err, body) => {
             console.log(data);
             console.log(process.env.MAILGUN_API_KEY)
                console.log(process.env.MAILGUN_DOMAIN)
             if (err) {
                 console(res.status)
                 return res.json({
                     message: err.message
                 });
             }
         });

        const token = jwt.sign({
                uid: newUser._id },
            process.env.JWT_ACC_ACTIVATE,
            { expiresIn: '20m'});

        res.status(201).json({
            status: "success",
            message: "Email has been sent. Please activate your account.",
            accessToken: token,
            uid: newUser._id,
            lastname: newUser.lastname,
            firstname: newUser.firstname,
            username: newUser.username,
            email: newUser.email,
            gender: newUser.gender,
            activation: newUser.activation
        });
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (!user) {
        return res.status(400).send({ status: 'error', error: 'Invalid email'});
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
                uid: user._id },
            process.env.JWT_ACC_ACTIVATE,
            { expiresIn: '20m'});

        res.status(200).send({ accessToken: token,
            uid: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            username: user.username,
            email: user.email,
            gender: user.gender,
            activation: user.activation
        });
    }

        res.status(400).send({ status: 'error', error:'Invalid password'});
};

exports.activateAccount = async (req, res) => {
    const uid  = req.params['uid'];
    console.log(uid);

    if (uid) {
        const user = await User.findByIdAndUpdate({ _id: uid } , {  activation: true }, { new: true, lean: true});

        console.log(user);
        const token = jwt.sign({
                uid: user._id },
            process.env.JWT_ACC_ACTIVATE,
            { expiresIn: '20m'});

        res.status(200).json({
            message: "Account is activated",
            accessToken: token,
            uid: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            username: user.username,
            email: user.email,
            gender: user.gender });
    }
    else {
        return res.status(400).json({ status: 'error', message: 'token is not existed.'});
    }
};

