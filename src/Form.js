import React, { Component } from "react";
import firebase from "./firebase.js";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: []
    };
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

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>Fun Food Friends</h1>
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
              <ul />
            </div>
          </section>
        </div>
      </div>
    );
  }
}
