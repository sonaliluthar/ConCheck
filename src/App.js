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
      details: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return <Form {...this.state} handleChange={e => this.handleChange(e)} />;
  }
}

export default App;
