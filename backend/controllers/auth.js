const User = require('../models/user')
const bcrypt = require("bcrypt");
const mailgun = require('mailgun-js');
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
const jwt = require("jsonwebtoken");

// signup function.
exports.signup = async (req, res) => {

        //console.log(req.body);

        const { lastname, firstname, username, email, password, gender } = req.body;

        // Search the database to see if the email and username is already existed.
        User.findOne({ username, email }).exec((err, user) => {
            if (user) {
                return res.status(400).send(err.message);
            }
        });
        
    try {
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
    } catch (err) {
        res.status(400).send(err.message);
    }
        // For debugging
        //console.log(newUser);

        // Generate activation email with mailgun.
         activate_link= process.env.CLIENT_URL + "/activateAccount/" + newUser._id
         const data = {
                from: 'noreply@urge.org',
                to: email ,
                subject: "Account activiation",
                template: "testing",
                "h:X-Mailgun-Variables": '{"test": "test",  "firstname":"John"}',
                "v:act":activate_link,
                "v:fname":newUser.firstname.charAt(0).toUpperCase() + newUser.firstname.slice(1),
                inline: "../frontend/src/assets/Logo/urge.gif"
         }

         mg.messages().send(data, (err, body) => {
             //console.log(data);
             //console.log(process.env.MAILGUN_API_KEY)
              //  console.log(process.env.MAILGUN_DOMAIN)
             /*if (err) {
                 console.log(res.status)
             }*/
         });

         // Generate and sign a token
        const accessToken = jwt.sign({
            user_id: newUser._id },
            process.env.JWT_ACC_SECRET,
            { expiresIn: '24h'});

        // Return json with user info when user is created successfully.
        res.status(201).json({
            accessToken: accessToken,
            user_id: newUser._id,
            lastname: newUser.lastname,
            firstname: newUser.firstname,
            username: newUser.username,
            email: newUser.email,
            gender: newUser.gender,
            activation: newUser.activation,
            following: newUser.following,
            profileImage: newUser.profileImage,
            message: "Registered successfully"
        });
};

// Signin function.
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    // Search db to  see if the user with this email exists.
    const user = await User.findOne({ email }).populate({ path:'following', 
        select: '_id'
      }).lean();

    // If not exist, handle the error.
    if (!user) {
        return res.status(400).send(err.message);
    }

    else {

        // If user exists, check password.
        if (await bcrypt.compare(password, user.password)) {

            // Generate a token if password is matched.
            const accessToken = jwt.sign({
                user_id: user._id
                },
                process.env.JWT_ACC_SECRET,
                {expiresIn: '24h'});

            res.status(200).send({
                accessToken: accessToken,
                user_id: user._id,
                lastname: user.lastname,
                firstname: user.firstname,
                username: user.username,
                email: user.email,
                gender: user.gender,
                activation: user.activation,
                following: user.following,
                profileImage: user.profileImage
            });
        }
    else
        // If password is not matched, handle the error.
        res.status(400).send(err.message);
    }
};

// activateAccount function.
exports.activateAccount = async (req, res) => {
    const user_id  = req.params['user_id'];
    //console.log(user_id);

    // if user_id is not null.
    if (user_id) {

        // Search db for the user with this user_id and update its status.
        const user = await User.findByIdAndUpdate({ _id: user_id } , {  activation: true }, { new: true, lean: true});

        //console.log(user);

        // Generate a token.
        const accessToken = jwt.sign({
            user_id: user._id },
            process.env.JWT_ACC_SECRET,
            { expiresIn: '24h'});

        // Return the new data of the user.
        res.status(200).json({
            accessToken: accessToken,
            user_id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            username: user.username,
            email: user.email,
            gender: user.gender,
            activation: user.activation,
            following: user.following,
            profileImage: user.profileImage
         });
    }
    else {
        // If userId is null, handle the error.
        return res.status(400).send(err.message);
    }
};

exports.generateEmail = async (req, res) => {
    const user = await User.findOne({ _id: req.params['user_id'] });
    activate_link= process.env.CLIENT_URL + "/activateAccount/" + user._id
     const data = {
            from: 'noreply@urge.org',
            to: user.email ,
            subject: "Account activiation",
            template: "testing",
            "h:X-Mailgun-Variables": '{"test": "test",  "firstname":"John"}',
            "v:act":activate_link,
            "v:fname":user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1),
            inline: "../frontend/src/assets/Logo/urge.gif"
     }
     mg.messages().send(data, (err, body) => {
        // console.log(data);
        // console.log(process.env.MAILGUN_API_KEY)
        //    console.log(process.env.MAILGUN_DOMAIN)
         /*if (err) {
             console.log(res.status)
         }*/
     });
};

