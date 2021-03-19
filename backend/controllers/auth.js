const User = require('../models/user')
const bcrypt = require("bcrypt");
const mailgun = require('mailgun-js');
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
const jwt = require("jsonwebtoken");

// signup function.
exports.signup = async (req, res) => {
        console.log(req.body);

        const { lastname, firstname, username, email, password, gender } = req.body;

        // Search the database to see if the email and username is already existed.
        User.findOne({ username, email }).exec((err, user) => {
            if (user) {
                return res.status(400).json({
                    error: "User with this username/email already existed."
                })
            }
        });

        // If no error, hashed the password and create a new user.
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
       
        // For debugging
        console.log(newUser);

        // Generate activation email with mailgun.
         activate_link= process.env.DOMAIN_URL + "/auth/activateAccount/" + newUser._id
         const data = {
                //from: "Mailgun Sandbox <postmaster@sandboxa6113ec32ac246bf99819221de84c22f.mailgun.org>",
                from: 'noreply@urge.org',
                to: email ,
                subject: "Account activiation",
                template: "testing",
                "h:X-Mailgun-Variables": '{"test": "test",  "firstname":"John"}',
                "v:act":activate_link,
                "v:fname":newUser.firstname,
                inline: "../frontend/src/assets/Logo/urge.gif"
         }

         mg.messages().send(data, (err, body) => {
             console.log(data);
             console.log(process.env.MAILGUN_API_KEY)
                console.log(process.env.MAILGUN_DOMAIN)
             /*if (err) {
                 console(res.status)
                 return res.json({
                     message: err.message
                 });
             }*/
         });

         // Generate and sign a token
        const token = jwt.sign({
                uid: newUser._id },
            process.env.JWT_ACC_ACTIVATE,
            { expiresIn: '20m'});

        // Return json with user info when user is created successfully.
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

// Signin function.
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    // Search db to  see if the user with this email exists.
    const user = await User.findOne({ email }).lean();

    // If not exist, handle the error.
    if (!user) {
        return res.status(400).send({ status: 'error', error: 'Invalid email'});
    }

    else {

        // If user exists, check password.
        if (await bcrypt.compare(password, user.password)) {

            // Generate a token if password is matched.
            const token = jwt.sign({
                    uid: user._id
                },
                process.env.JWT_ACC_ACTIVATE,
                {expiresIn: '20m'});

            res.status(200).send({
                accessToken: token,
                uid: user._id,
                lastname: user.lastname,
                firstname: user.firstname,
                username: user.username,
                email: user.email,
                gender: user.gender,
                activation: user.activation
            });
        }
    else
        // If password is not matched, handle the error.
        res.status(400).send({status: 'error', error: 'Invalid password'});
    }
};

// activateAccount function.
exports.activateAccount = async (req, res) => {
    const uid  = req.params['uid'];
    console.log(uid);

    // if uid is not null.
    if (uid) {

        // Search db for the user with this uid and update its status.
        const user = await User.findByIdAndUpdate({ _id: uid } , {  activation: true }, { new: true, lean: true});

        console.log(user);

        // Generate a token.
        const token = jwt.sign({
                uid: user._id },
            process.env.JWT_ACC_ACTIVATE,
            { expiresIn: '20m'});

        // Return the new data of the user.
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
        // If userId is null, handle the error.
        return res.status(400).json({ status: 'error', message: 'UserId is not existed.'});
    }
};

