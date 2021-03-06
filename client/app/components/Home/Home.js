import React, { Component } from 'react';
import 'whatwg-fetch';



import {
  getFromStorage,
  setInStorage,


} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',

    };

    this.onTextboxChangeSignInEmail= this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail= this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  //  this.logout = this.logout.bind(this);

  }

  componentDidMount() {

    const obj = getFromStorage('the_main_app');

    if (obj && obj.token){
     const { token } = obj;

     fetch('/api/account/verify?token='+token)
        .then(res => res.json())
        .then(json => {
          if (json.success){
            this.setState({
              token,
              isLoading: false,
                  });



            }else{
              this.setState({
              isLoading: false,
                });
              }
            });
          }else{

            this.setState({
              isLoading: false,
            });
          }
        }

    onTextboxChangeSignInEmail(event){

      this.setState({
        signInEmail: event.target.value,

      });
    }

    onTextboxChangeSignInPassword(event){

      this.setState({
        signInPassword: event.target.value,

      });
    }

    onTextboxChangeSignUpEmail(event){

      this.setState({
        signUpEmail: event.target.value,

      });
    }

    onTextboxChangeSignUpPassword(event){

      this.setState({
        signUpPassword: event.target.value,

      });
    }

    onSignUp(){

      const {
        signUpEmail,
        signUpPassword,
      } = this.state;

      this.setState({
        isLoading: true,
      });
      fetch('/api/account/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signUpEmail,
          password: signUpPassword,


        }),
      }).then(res => res.json())
        .then(json => {
          if (json.sucess){
                this.setState({
                signUpError: json.message,
                isLoading: false,
                signUpEmail: '',
                signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });


        }


        });


    }

    onSignIn(){


      const {
        signInEmail,
        signInPassword,
      } = this.state;

      this.setState({
        isLoading: true,
      });
      fetch('/api/account/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,


        }),
      }).then(res => res.json())
        .then(json => {
          if (json.sucess){
              setInStorage('the_main_app',{ token: json.token});
              this.setState({
                signInError: json.message,
                isLoading: false,
                signInEmail: '',
                signInPassword: '',
                token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });


        }


        });

    }




   logout(){
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');

    if (obj && obj.token){
     const { token } = obj;

     fetch('/api/account/logout?token='+token)
        .then(res => res.json())
        .then(json => {
          if (json.success){
            this.setState({
              token: '',
              isLoading: false,
                  });



            }else{
              this.setState({
              isLoading: false,
                });
              }
            });
          }else{

            this.setState({
              isLoading: false,
            });
          }



  }


  render() {

    const{
      isLoading,
      token,
      signInEmail,
      signInPassword,
      signInError,
      signUpEmail,
      signUpPassword,
    } = this.state;

    if(isLoading){
      return (<div><p>Loading..</p></div>);
    }

    if (!token){
      return (
        <div>
          <div>
             {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
             }
            <p>Connexion</p>
            <input type="email" placeholder="Email" id="Email" value={signInEmail} onChange={this.onTextboxChangeSignInEmail}/><br />
            <input type="password" placeholder="Password" id="Password" value={signInPassword} onChange={this.onTextboxChangeSignInPassword}/><br />
            <button onClick={this.onSignIn}>Connexion</button>

        </div>
        <br />
        <br />
        <div>

          <p>Inscription</p>
          <input type="email" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail}/><br />
          <input type="password" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword}/><br />
          <button onClick={this.onSignUp}>Inscription</button>
        </div>
        </div>
      );
    }



    return (<div>
            <p>
            Success
            </p>
            <button onClick={this.logout}>
            Se deconnecter
            </button>
            </div>);





    }
  }








export default Home;
