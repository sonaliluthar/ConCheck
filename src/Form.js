import React, { Component } from "react";
import firebase from "./firebase.js";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: []
    };
  }

  componentDidMount() {
    const conRef = firebase.database().ref("contracts");
    conRef.on("value", snapshot => {
      let contracts = snapshot.val();
      console.log(contracts);
      let newState = [];
      for (let con in contracts) {
        newState.push({
          id: con,
          name: contracts[con].name,
          company: contracts[con].company,
          details: contracts[con].details,
          sigs: contracts[con].sigs
        });
      }
      this.setState({
        contracts: newState
      });
    });
  }

  removeCon = ID => {
    const conRef = firebase.database().ref(`/contracts/${ID}`);
    conRef.remove();
  };

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>ADD CONTRACTS HERE</h1>
          </div>
        </header>
        <div className="container">
          <section className="add-item">
            <form onSubmit={this.props.handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.props.handleChange}
                value={this.props.name}
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                onChange={this.props.handleChange}
                value={this.props.company}
              />
              <input
                type="text"
                name="details"
                placeholder="Contract Details"
                onChange={this.props.handleChange}
                value={this.props.details}
              />
              <button>Add Contract</button>
            </form>
          </section>
          <section className="display-item">
            <div className="wrapper">
              <ul>
                {console.log(this.state.contracts)}
                {this.state.contracts.map(con => {
                  return (
                    <form key={con.id}>
                      <li> {con.name} </li>
                      <li> {con.company} </li>
                      <li> {con.details} </li>
                      <form onSubmit={this.props.handleSubmit}>
                        <input
                          type="text"
                          name="sigs"
                          placeholder="Sign Here"
                          onChange={this.props.addSign}
                          value={this.props.sigs}
                          // {/* value={con.sigs.map(sig => {
                          // <li> {sig} </li>;
                          // })} */}
                        />
                      </form>
                      <button>Add Signature</button>
                      <button onClick={() => this.removeCon(con.id)}>
                        Remove Contract
                      </button>
                    </form>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
