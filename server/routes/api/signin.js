


const User = require('../../models/User');
const UserSession = require('../../models/UserSession');




module.exports = (app) => {



  app.post('/api/account/signup', (req,res,next) => {
    const {body} = req;
    const {
      password
    } = body;
    let {
      email
    } = body;
    if (!email){
        return res.send({
        success: false,
        message: 'Erreur : le champ email ne peut être vide'});
      }
      if (!password){
        return res.send({
          success: false,
          message: 'Erreur : le champ password ne peut être vide'});
        }


        email = email.toLowerCase();




        User.find({
          email: email
        }, (err,previousUsers) => {
          if(err){
            return res.send({
              success: false,
              message: 'Erreur : Erreur Serveur'});


          } else if(previousUsers.length > 0){
            return  res.send({
              success: false,
              message: 'Erreur : compte déja existant'});

          }

          const newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.save((err,user) => {
            if (err){
              return res.send({
                success: false,
                message: 'Erreur : Erreur Serveur'});

            }
              return res.send({
              success: true,
              message: 'Inscription Effectuée'});


          });
        });









});


app.post('/api/account/signin', (req,res,next) => {
  const {body} = req;
  const {
    password
  } = body;
  let {
    email
  } = body;

  if (!email){
      return res.send({
      success: false,
      message: 'Erreur : le champ email ne peut être vide'});
    }
    if (!password){
      return res.send({
        success: false,
        message: 'Erreur : le champ password ne peut être vide'});
      }


      email = email.toLowerCase();

      User.find({
        email: email
      }, (err,users) => {
        if (err){
          return res.send({

            success: false,
            message: 'Error: Erreur Serveur'
          });

        }
        if (users.length != 1){
          return res.send({

            success: false,
            message: 'Error: Invalide'
          });
        }


        // console.log('Break Point ici')
       const user = users[0];


          if (!user.validPassword(password)){
            return res.send({

              success: false,
              message: 'Erreur : Invalide'
            });
          }

          const userSession = new UserSession();
          userSession.userId = user._id;
          userSession.save((err,doc) => {
            if(err){
              return res.send({

                success: false,
                message: 'Error: Erreur Serveur'
              });
            }

             return res.send({
               success: true,
               message: 'Connexion avec succès',
               token: doc._id

             });



          });

        });

        });



app.get('/api/account/verify', (req,res,next) => {

  const { query } = req;
  const { token } = query;




  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions) => {
    if(err){
      return res.send({
        success: false,
        message: 'Erreur: Serveur Erreur '
      });
    }
    if(sessions.length != 1){
        return res.send({

          success: false,
          message: 'Erreur : Invalide'
        });

    }else{

      return res.send({
        success: true,
        message: 'Session verifié par token'
      });
    }
    });

  });


  app.get('/api/account/logout', (req,res,next) => {

    const { query } = req;
    const { token } = query;




    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    },  {
      $set:
      {
        isDeleted:true
      }


  },null,(err, sessions) => {
      if(err){
        return res.send({
          success: false,
          message: 'Erreur: Serveur Erreur '
        });
      }


        return res.send({
          success: true,
          message: 'Logout Good'
        });

      });

    });


};
