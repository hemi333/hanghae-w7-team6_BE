// const passport = require('passport');
// const jwt = require('jsonwebtoken');

// const kakaoCallback = (req, res, next) => {
//     passport.authenticate('kakao', { failureRedirect: '/user/login' }, (err, user) => {
//         if (err) return next(err);
//         const token = jwt.sign({ snsId: user.snsId }, process.env.MYSECRET_KEY);

//         res.json({ token, userId: user.userId, snsId: user.snsId });
//     })(req, res, next);
// };

// module.exports = { kakaoCallback };