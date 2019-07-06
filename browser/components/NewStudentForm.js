import React, { Component } from "react";
import axios from "axios";
import { runInNewContext } from "vm";

export default class NewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post("/student", this.state);
      const studentArr = this.props.studentArr;
      console.log(studentArr);
      studentArr.push(res.data);
      const updateState = this.props.updateState;
      updateState(studentArr);
    } catch (err) {
      console.log("it didn't work");
    }
    this.setState({
      firstName: "",
      lastName: "",
      email: ""
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}
