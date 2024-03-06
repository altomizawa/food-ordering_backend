const User = require("../models/user");

// CREATE USER
module.exports.createUser = async (req, res) => {
    try{
        //GET INFO FROM BODY
        const { email, password } = req.body;

        //CREATE USER
        const user = await User.create( { email: email, password: password} )

        //Check if user has been created
        if (!user) {
            return res.status(400).send('User could not be created')
        }

        //User created. Return user info
        return res.status(200).json(user);
    } catch (err) {res.status(500).send(`Error: ${err}`)}
}