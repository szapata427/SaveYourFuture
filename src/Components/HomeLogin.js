import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class LogInHomePage extends Component {
  render() {
    console.log(this.props.signedIn);
    return (
      <React.Fragment>
        <div>
          <ul className="navbar-ul-container-main">
            <li>
              <a className="active" href="#home">
                Home
              </a>
            </li>
            <li>
              <a href="#news">News</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
            <a id="profile-signout-button" onClick={() => firebase.auth().signOut()}>Log out</a>
            </li>
          </ul>
          <div className="loginhomepage-info-div" />
        </div>
      </React.Fragment>
    );
  }
}

export default LogInHomePage;
