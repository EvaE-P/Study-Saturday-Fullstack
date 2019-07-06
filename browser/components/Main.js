import React, { Component } from "react";
import axios from "axios";
import NewStudent from "./NewStudentForm";
import StudentList from "./StudentList.js";
import SingleStudent from "./SingleStudent.js";
import { getall } from "../store";
import { connect } from "react-redux";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      formDisplay: false
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.props.getStudents();
  }

  async getStudents() {
    console.log("fetching");
    try {
      const { data } = await axios.get("/student");
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student
    });
  }
  toggleForm() {
    return this.setState({
      formDisplay: !this.state.formDisplay
    });
  }
  updateState(studentArr) {
    return this.setState({
      students: studentArr
    });
  }
  render() {
    const { students } = this.props;
    return (
      <div>
        <h1>Students</h1>
        <button
          onClick={() => {
            this.toggleForm();
          }}
        >
          Add New Student
        </button>
        {this.state.formDisplay ? (
          <NewStudent studentArr={students} updateState={this.updateState} />
        ) : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList students={students} selectStudent={this.selectStudent} />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}

//state in mapStateTOProps is our "store" passed down from the Provider-allows you to access fields from the store
const mapStateToProps = state => {
  return { students: state.students };
};
const mapdispatch = dispatch => {
  return {
    getStudents: () => {
      dispatch(getall());
    }
  };
};

const Connected = connect(
  mapStateToProps,
  mapdispatch
)(Main);

export default Connected;
