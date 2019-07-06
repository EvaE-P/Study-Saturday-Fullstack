import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import axios from "axios";
import thunkMiddleware from "redux-thunk";
//Action Types
const GET_STUDENTS = "GET_STUDENTS";

//Action Creator
const gotStudents = students => {
  return {
    type: "GET_STUDENTS",
    students
  };
};
export const getall = () => {
  return async dispatch => {
    const res = await axios.get("/student");
    dispatch(gotStudents(res.data));
  };
};

//reducer

const initialState = { students: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return { ...state, students: [...state.students, action.students] };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);

export default store;
