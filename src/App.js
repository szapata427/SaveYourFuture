import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import LoginHomePageRoutes from "./Components/HomeLoginRoutes";
import actionCreator from "./Store/Actions/UserAction";
import { connect } from "react-redux";
import { currentUser } from "../src/Store/Actions/UserAction";
import { ReactRouter, Switch, Route, withRouter } from "react-router-dom";
import HomePageAccountMaster from "./Components/HomePageAccountMasterComponent";
import SavingsHomePageMaster from "./Components/SavingsHomePageMaster";
import TransactionMasterComponent from "./Components/TransactionsMasterComponent";

firebase.initializeApp({
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_DOMAIN}`
});

class App extends Component {
  state = {
    isSignedIn: false,
    userDatabaseId: null,
    loadingFireBaseInfo: true
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
    // monitor changes for the user
    let userid = null;
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user,
        loadingFireBaseInfo: false
      });
      console.log("user", user);
      if (this.state.isSignedIn == true) {
        let userEmail = user.email;
        let emailsearchurl = `http://localhost:5000/saveyourfuture/api/v1.0/SearchUserEmail?email=${userEmail}`;
        console.log(emailsearchurl);

        fetch(emailsearchurl)
          .then(response => response.json())
          .then(data => {
            console.log(data.result);

            if (data.result == null) {
              
              console.log(data);
              console.log(
                "user is signed in but user not saved in database, need to save"
              );
              this.saveUserToDatabase(user, result => {
                console.log(result);
                if (result.Id) {
                  this.props.currentUser(result);
                  userid = result.Id;
                  this.setState({
                    userDatabaseId: userid
                  });
                } else {
                  console.log(result);
                }
              });
            } 
            else if (data.result.Email) {
              console.log("user is signed in and in database");
              this.props.currentUser(data.result);
              userid = data.result.Id;
              console.log(userid);
              this.setState({
                userDatabaseId: userid
              });
            } else {
              console.log("error in searching email user on server side");

            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  saveUserToDatabase = (userInfo, callback) => {
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
      .then(resp => callback(resp));
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        {this.state.loadingFireBaseInfo ? (
          <div id="loading-sign-home-page-wrapper">
            <div className="loader">Loading</div>
          </div>
        ) : this.state.isSignedIn ? (
          <span>
            <LoginHomePageRoutes signedIn={this.state.isSignedIn} />
            <h1>{firebase.auth().currentUser.displayName}</h1>
            <Switch>
              <Route
                path="/AccountHome"
                render={() => <HomePageAccountMaster user={this.state.user} />}
              />
              <Route
                path="/Goals"
                render={() => <SavingsHomePageMaster user={this.state.user} />}
              />
              <Route
                path="/Savings"
                render={() => <SavingsHomePageMaster user={this.state.user} />}
              />
              <Route
                path="/PersonInformation"
                render={() => <SavingsHomePageMaster user={this.state.user} />}
              />
              <Route
                path="/Transactions"
                render={() => <TransactionMasterComponent />}
              />
            </Switch>
          </span>
        ) : (
          <React.Fragment>
            <div className="login-homepage-options-main-container">
              <div className="homepage-div-title-main-container">
                Welcome To Save Your Future
              </div>
              <div className="home-login-title-parent-container">
                <div className="home-login-title">Please Log-In or Sign Up</div>
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

const mapDispatchToProps = dispatch => {
  console.log("hit the distpach in app.js");
  return {
    currentUser: theuser => {
      dispatch({ type: "CURRENT_USER", value: theuser });
    }
  };
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App));
