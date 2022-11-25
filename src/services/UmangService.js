import axios from "axios";
import { 
  FETCH_VOLUNTEER_LIST, 
} from "../constants";

import {
  DYS_LIST
} from '../constants'

// const BASE_URL = 'https://iyfapi.herokuapp.com';
// const BASE_URL = "http://localhost:59635";
// const BASE_URL = "https://arcane-fjord-22981.herokuapp.com";
// const BASE_URL = "https://iyfghaziabad.com/api/devotee";
const BASE_URL = "http://localhost:8000/api/devotee";

export const createNewRegistration = (userDetails) => {
  return axios.post(BASE_URL + "/create", userDetails);
};

export const createNewDysRegistration=(userDetails) => {
  return axios.post(BASE_URL+ "/registerfordys", userDetails);
};

export const updateRegistration = ({_id, email, contact}) => {
  return axios.put(BASE_URL + `/update/${_id}`, {email, contact});
};

export const fetchVolunteerList = () => {
  return axios.get(BASE_URL + FETCH_VOLUNTEER_LIST);
};
export const fetchDysRegList = () =>{
  return axios.get('http://localhost:8000/api/devotee/list');
}


export const fetchAllRegistrations = () => {
  return axios.get(BASE_URL + "/list");
};


export const markAttendance = (id, present) => {
  return axios.post(BASE_URL + "/attendance", {
    ticket_id: id,
    present: present,
  });
};
