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
      for (let contract in contracts) {
        newState.push({
          id: contract,
          name: contracts[contract].name,
          company: contracts[contract].company,
          details: contracts[contract].details
        });
      }
      this.setState({
        contracts: newState
      });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const conRef = firebase.database().ref("contracts");
    const contract = {
      name: this.props.name,
      company: this.props.company,
      details: this.props.details
    };
    conRef.push(contract);
    this.setState({
      name: "",
      company: "",
      details: ""
    });
  };

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
            <form onSubmit={this.handleSubmit}>
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
                {this.state.contracts.map(con => {
                  return (
                    <div key={con.id}>
                      <li>
                        {con.name}
                        <br />
                        {con.company}
                        <br />
                        {con.details}
                        <br />
                        <button onClick={() => this.removeCon(con.id)}>
                          Remove Contract
                        </button>
                      </li>
                    </div>
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
