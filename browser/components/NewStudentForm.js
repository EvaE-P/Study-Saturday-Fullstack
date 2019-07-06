import React from "react";

const NewStudent = props => {
  const newStudent = props.newStudent;
  return (
    <form>
      {/* <label htmlFor="taskName">Task Name:</label> */}
      <input type="text" name="FirstName" value={newStudent.first} />
      <input type="text" name="LastName" value={newStudent.last} />
      <input type="text" name="Email" value={newStudent.email} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default NewStudent;
