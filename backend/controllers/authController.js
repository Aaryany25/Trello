const jwt = require('jsonwebtoken');
const { users, counters, JWT_SECRET } = require('../models/data');

const signup = (req, res) => {
    const { username, password, name } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(403).json({
            message: "User with this username already exists"
        });
    }

    const newUser = {
        id: counters.userId++,
        name: name || username,
        username: username,
        password: password
    };
    users.push(newUser);

    res.status(201).json({
        message: "Signed up successfully",
        userId: newUser.id
    });
};

const signin = (req, res) => {
    const { username, password } = req.body;

    const userExists = users.find(user => user.username === username && String(user.password) === String(password));

    if (!userExists) {
        return res.status(403).json({
            message: "Incorrect credentials"
        });
    }

    const token = jwt.sign({
        id: userExists.id,
        username: username
    }, JWT_SECRET);

    res.json({
        message: "Signed in successfully",
        token: token,
        user: {
            id: userExists.id,
            name: userExists.name,
            username: userExists.username
        }
    });
};

module.exports = {
    signup,
    signin
};
