import axios from "axios";
import {
  CREATE_NEW_REGISTRATION,
  FETCH_ALL_USERS,
  FETCH_VOLUNTEER_LIST,
  MARK_ATTENDANCE,
  UPDATE_USER,
} from "../constants";

// const BASE_URL = 'https://iyfapi.herokuapp.com';
// const BASE_URL = "http://localhost:59635";
// const BASE_URL = "https://arcane-fjord-22981.herokuapp.com";
const BASE_URL = "https://iyfghaziabad.com/api/devotee";

export const createNewRegistration = (userDetails) => {
  return axios.post(BASE_URL + "/create", userDetails);
};

export const updateRegistration = ({_id, email, contact}) => {
  return axios.put(BASE_URL + `/update/${_id}`, {email, contact});
};

export const fetchVolunteerList = () => {
  return axios.get(BASE_URL + FETCH_VOLUNTEER_LIST);
};

export const fetchAllRegistrations = () => {
  return axios.get(BASE_URL + "/list");
};

export const markAttendance = (id, isPresent) => {
  return axios.put(BASE_URL + "/users/attendance", {
    id,
    isPresent,
  });
};