const admin = require('firebase-admin');

module.exports = function (req, res) {
  if (!req.body.email || !req.body.code)
    return res.status(422).send({error: 'Phone and code must be provided'});

  const code = parseInt(req.body.code);
  const email = req.body.email.replace('@','-').replace('.', '-');

  admin.auth().getUser(email)
    .then(() => {
      const ref = admin.database().ref('users/' + email);
      ref.on('value', snapshot => {
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid)
          return res.status(422).send({error: 'Code not valid'});

        ref.update({codeValid: false})
          .then(() => {
            admin.auth().createCustomToken(email)
              .then(token => res.send({token: token}));
          });
      })
    })
    .catch((err) => res.status(422).send({error: err}));
};