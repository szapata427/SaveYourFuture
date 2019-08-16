import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import LogInHomePage from "./Components/HomeLogin";

firebase.initializeApp({
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_DOMAIN}`
});

class App extends Component {
  state = {
    isSignedIn: false,
    userDatabase: null
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);

      let userEmail = user.email;
      let emailsearchurl = `http://localhost:5000/saveyourfuture/api/v1.0/SearchUserEmail?email=${userEmail}`;
      console.log(emailsearchurl);
      fetch(emailsearchurl)
        .then(response => response.json())
        .then(data => {
          if (data.result == null) {
            console.log("user not saved in database, need to save");
            this.saveUserToDatabase(user);
          } else {
            console.log("user is signed in");
          }
        });
    });
  };

  saveUserToDatabase = userInfo => {
    let namearray = userInfo.displayName.split(" ");
    let arraylength = namearray.length;
    let firstname = namearray[0];
    let lastname = namearray[arraylength - 1];
    let email = userInfo.email;

    let newUserData = {
      FirstName: firstname,
      LastName: lastname,
      Email: email
    };
    fetch(`http://localhost:5000/saveyourfuture/api/v1.0/NewUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newUserData)
    })
      .then(response => response.json())
      .then(resp => console.log(resp));
  };

  render() {
    console.log(this.state.isSignedIn);
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <LogInHomePage signedIn={this.state.isSignedIn} />
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
          </span>
        ) : (
          <React.Fragment>
            <div className="login-homepage-options-main-container">
              <div className="homepage-div-title-main-container">
                Welcome To Save Your Future
              </div>
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
