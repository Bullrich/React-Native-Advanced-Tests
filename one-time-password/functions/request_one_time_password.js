const admin = require('firebase-admin');
// const nodemailer = require('nodemailer');

module.exports = function (req, res) {
  if (!req.body.email)
    return res.status(422).send({error: 'You must provide a email'});

  const email = req.body.email.replace('@','-').replace('.', '-');

  admin.auth().getUser(email)
    .then(userRecord => {
      const code = Math.floor((Math.random() * 8999 + 1000));
      console.log(email + "'s code is " + code);

      admin.database().ref('users/' + email)
        .update({code: code, codeValid: true}, () => {

          res.status(200).send({success: true});
        }).then(() => {
        console.log('Added to database!');
        res.status(200).send({success: 'very true'})
      });
      // sendEmail(req.body.email, code);
    });
};

// // It's pretty bad written. But I just needed to test the mail system
// function sendEmail(email, code, res) {
//   console.log(email);
//   // const transporter = nodemailer.createTransport(userEmail);
//
//   const mailOptions = {
//     from: 'tragosconjavifesser@gmail.com',
//     to: email,
//     subject: 'Sending Email using Node.js',
//     text: "Your code is " + code
//   };
//
//
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//         res.status(422).send({error: "Couldn't send email"});
//       } else
//         console.log('Email sent: ' + info.response);
//     });
// }