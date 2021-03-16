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

        const token = jwt.sign({ lastname, firstname, username, email, password, gender },
                      process.env.JWT_ACC_ACTIVATE,
              { expiresIn: '20m'});

        const data = {
            from: 'noreply@urge.org',
            to: email,
            subject: "Account activiation",
            html:`<h2>Please click the link to activate your account.</h2>
                  <p>${process.env.CLIENT_URL}/api/authentication/activateAccount/${token}</p>`
        }

        mg.messages().send(data, (err, body) => {
            console.log(data);
            if (err) {
                return res.json({
                    message: err.message
                });
            }
        });

        res.status(201).json({
            "status": "success",
            "message": "Email has been sent. Please activate your account."
        });
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email'});
    }

    if (await bcrypt.compare(password, user.password)) {
        res.json({ status: "success", message: "successfully log in."})

    }
    res.json({ status: 'error', error:'Invalid password'});
};

exports.activateAccount = async (req, res) => {
    const token  = req.params['token'];

    if (token) {
        jwt.verify(token, process.env.JWT_ACC_ACTIVATE, async (err, decodedToken) => {
           if (err) {
               return res.status(400).json({error: 'Incorrect or expired link.'});
           }

            const { lastname, firstname, username, email, password, gender } = decodedToken;
            console.log(decodedToken);
            console.log(password);
            hash = await bcrypt.hash(password, 10)
            User.create({
                lastname: lastname,
                firstname: firstname,
                username: username,
                email: email,
                password: hash,
                gender: gender,
                profileImage: "",
            });
            return res.send("Account is activated. Redirecting...")
        });
    } else {
        return res.json({ status: 'error', message: 'token is not existed.'})
    }
};