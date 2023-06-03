const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        // login function from passport to log user in after registering
        req.login(registerUser, err => {
            if (err) return next(err);
            req.flash('success', 'welcometo yelp camp')
            res.redirect('/japango');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }

}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back');
    const redirectUrl = req.session.returnTo || '/japango'
    // we don't want this returnTo to just sit in the session
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/japango');
}