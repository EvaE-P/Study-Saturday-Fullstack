import React from "react";

const StudentList = props => {
  console.log("props is this", props);
  return (
    <tbody>
      {props.students.map(student =>
        student.map(obj => (
          <tr key={obj.id}>
            <td>{obj.fullName}</td>
            {/* <td onClick= {() => props.selectStudent(student)}>
                            Details
                        </td> */}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default StudentList;
