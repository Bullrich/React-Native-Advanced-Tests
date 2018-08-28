const admin = require('firebase-admin');

module.exports = function (req, res) {
  // Verify the user provided a phone
  if (!req.body.phone)
    return res.status(422).send({error: 'Bad Input'});

  if (!req.body.email || !validateEmail(req.body.email))
    return res.status(422).send({error: 'Email should be valid'});

  const email = req.body.email.replace('@','-').replace('.', '-');

  // Format the phone number to remove dashes and parens
  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  console.log('User is ' + email);

  // Create a new user account using that phone number
  admin.auth().createUser({uid: email})
    .then(user => {
      res.send(user);
    })
    .catch(err => res.status(422).send({error: err}));

  // Respond to the user request, saying the account was made
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}