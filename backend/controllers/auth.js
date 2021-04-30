const User = require('../models/user')
const bcrypt = require("bcrypt");
const mailgun = require('mailgun-js');
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
const jwt = require("jsonwebtoken");

// signup function.
exports.signUp = async (req, res) => {

    const { lastname, firstname, username, email, password, gender } = req.body;

    try {

        if (email == "" || password == "")
            return res.status(400).send({ message: "Email or password cannot be emptied."});

        if (username == "")
            return res.status(400).send({ message: "Username cannot be emptied."});
        
        if (gender < 1 || gender > 3)
            return res.status(400).send({ message: "Invalid gender."});

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
        
         // Send email with predefined content and template。.
         mg.messages().send(data);

         // Generate and sign a token
        const accessToken = jwt.sign({
            user_id: newUser._id },
            process.env.JWT_ACC_SECRET,
            { expiresIn: '300m'});

        // Return json with user info when user is created successfully.
        return res.status(201).json({
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
    } catch (err) {
        res.status(400).send({ message: "User with this email/username has already existed." });
    }
};

// signIn function.
exports.signIn = async (req, res) => {

    const { email, password } = req.body;

    // Search db to  see if the user with this email exists.
    const user = await User.findOne({ email }).populate({ path:'following', 
        select: '_id'
      }).lean();

    // If not exist, handle the error.
    if (!user) {
        res.status(400).send({ message: "User with this email is not found." });
    }

    else {

        // If user exists, check password.
        if (await bcrypt.compare(password, user.password)) {

            // Generate a token if password is matched.
            const accessToken = jwt.sign({
                user_id: user._id
                },
                process.env.JWT_ACC_SECRET,
                {expiresIn: '300m'});

            return res.status(200).send({
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
        res.status(400).send({ message: "Incorrect password." });
    }
};

// activateAccount function.
exports.activateAccount = async (req, res) => {
   
    try {
            // Search db for the user with this user_id and update its status.
            const user = await User.findByIdAndUpdate({ _id: req.params['user_id'] } , 
                {  activation: true }, 
                { new: true, lean: true});
        
            // Generate a token.
            const accessToken = jwt.sign({
                user_id: user._id },
                process.env.JWT_ACC_SECRET,
                { expiresIn: '300m'});

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
    
    } catch(err) {
        return res.status(400).send({ message: "User not found." });
    }
};

exports.generateEmail = async (req, res) => {
    
    try {
        const user = await User.findOne({ _id: req.params['user_id'] });

        // Email data
        activate_link= process.env.CLIENT_URL + "/activateAccount/" + user._id
        const data = {
                from: 'noreply@urge.org',
                to: user.email,
                subject: "Account activiation",
                template: "testing",
                "h:X-Mailgun-Variables": '{"test": "test",  "firstname":"John"}',
                "v:act":activate_link,
                "v:fname":user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1),
                inline: "../frontend/src/assets/Logo/urge.gif"
        }

        // Send Email.
        mg.messages().send(data);

        res.status(200).send({ message: "Activation email has been generated."});
    
    } catch(err) {
        res.status(400).send({ message: "User not found."});
    }
};

