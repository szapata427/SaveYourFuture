import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddTransaction from "./AddTransactionComponent";
import ShowCurrentTransactions from "./CurrentTransactionsComponent";
import { fetchUsersTransactions } from "../Store/Actions/TransactionActions";
import TransactionsTotalsDashboard from "./TransactionsTotalsDashboard";

export const url = "http://localhost:5000/";

class TransactionMasterComponent extends Component {

state = {
  dateFilterLastDays: null,
}

  componentDidMount() {
      let userId = this.props.userId
    this.props.fetchUsersTransactions(userId);
  }

lastDaysSelected = (e) => {
this.setState({
  dateFilterLastDays: e.target.value
})
}

  render() {
    return (
      <React.Fragment>
        <TransactionsTotalsDashboard lastDays={this.state.dateFilterLastDays} />
        <AddTransaction />
        <div className="select-past-days-trans-div-wrapper"> 
          <span className="past-days-select-span-transactions">Past Days</span> 
        <select className="select-past-days-transactions" onChange={this.lastDaysSelected}>
          <option value="null">All</option>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="7">7</option>
          <option value="14">14</option>
          <option value="30">30</option>
          <option value="60">60</option>
        </select>

        </div>
        <br></br>
        <div className="all-transactions-column-names-wrapper">
            <span className="transations-column-names-span">Amount</span>
            <span className="transations-column-names-span">Type</span>
            <span className="transations-column-names-span">Notes</span>
            <span className="transations-column-names-span">Date</span>
        </div>
        <div className="all-transactions-main-div-container">
          <ShowCurrentTransactions lastDays={this.state.dateFilterLastDays} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
    console.log(state)
  return {
    user: state.user,
    currentTransactions: state.currentTransactions
  };
};

const mapDispatchToProps = dispatch => {
  console.log(`hitting dispatch for all transactions`);
  return {
    fetchUsersTransactions: userInfo =>
      dispatch(fetchUsersTransactions(userInfo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionMasterComponent);
