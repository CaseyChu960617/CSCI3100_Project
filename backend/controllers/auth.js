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
            from: 'noreply@urge.org',
            to: email,
            subject: "Account activiation",
            html:`  <div class="email-wrapper" style="width: 800px;">
                    <div class="header" style="background-color: #1f5a98; height: 100px;"><img src="../../frontend/src/assets/Logo/URGE%20GIF.gif" style="height: 50px;"></div>
                    <div class="content-wrapper" style="display: flex;">
                    <div style="width: 25%;">&nbsp;</div>
                    <div><br /><br /><br />
                    <div><strong style="color: #333333;">Email Activation </strong></div>
                    <br />
                    <p><span style="color: #808080; font-size: 12px;">Howdy,</span></p>
                    <p style="text-align: justify;"><span style="color: #808080; font-size: 12px;">Thank you for choosing Urge. Please click the link below to activate your account. You can only view all the discussions and tutorials with unactivated account.<br /></span></p>
                    <p style="text-align: justify;">&nbsp;</p>
                    <div style="display: flex; justify-content: center;"><a style="display: block; width: 200px; height: 25px; background: #1F5A98; padding: 10px; text-align: center; border-radius: 5px; color: white; font-weight: bold; font-size: 15px; fon    line-height: 25px; text-decoration: none;" href="&#96;${process.env.DOMAIN_URL}/auth/activateAccount/${newUser._id}&#96;"> Activate your account </a></div>
                    <div style="width: 25%;">&nbsp;</div>
 
                    </div>
                    <div class="footer">
                    </div>>
                    </div>`

        }

        mg.messages().send(data, (err, body) => {
            console.log(data);
            if (err) {
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
            gender: newUser.gender
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
            gender: user.gender });
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

