import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";
import Form from "./Form.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      company: "",
      details: "",
      sigs: {},
      index: 0
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const conRef = firebase.database().ref("contracts");
    const contract = {
      name: this.state.name,
      company: this.state.company,
      details: this.state.details,
      sigs: this.state.sigs
    };
    conRef.push(contract);
    this.setState({
      name: "",
      company: "",
      details: ""
    });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  addSign = e => {
    e.preventDefault();
    this.state.sigs[[this.state.index]] = e.target.value;
  };

  signSubmit = e => {
    let newIn = this.state.index + 1;
    this.setState({ index: newIn });
  };

  render() {
    return (
      <Form
        {...this.state}
        handleChange={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
        addSign={e => this.addSign(e)}
      />
    );
  }
}

export default App;
