const validationDisplayName = (req, res, next) => {
    const { displayName } = req.body;
    const message = { message: '"displayName" length must be at least 8 characters long' };
    if (displayName.length < 8) return res.status(400).json(message);

    next();
};

const validationEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;
    
    if (email === '') {
        return res.status(400).json({ message: '"email" is not allowed to be empty' }); 
    }
    if (!email) return res.status(400).json({ message: '"email" is required' });
    if (!regex.test(email)) { 
        return res.status(400).json({ message: '"email" must be a valid email' }); 
    }

    next();
};
const validationPassword = (req, res, next) => {
    const { password } = req.body;
    const message = { message: '"password" length must be 6 characters long' };

    if (password === '') {
        return res.status(400).json({ message: '"password" is not allowed to be empty' }); 
    }
    if (!password) return res.status(400).json({ message: '"password" is required' });
    if (password.length < 6) return res.status(400).json(message);

    next();
};

module.exports = {
    validationDisplayName,
    validationEmail,
    validationPassword,
};