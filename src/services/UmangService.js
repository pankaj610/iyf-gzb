import axios from "axios";
import { 
  FETCH_VOLUNTEER_LIST, 
} from "../constants";
import { atom } from "jotai";

import {
  DYS_LIST
} from '../constants'
import { userDataAtom } from "../App";

// const BASE_URL = 'https://iyfapi.herokuapp.com';
// const BASE_URL = "http://localhost:59635";
// const BASE_URL = "https://arcane-fjord-22981.herokuapp.com";
// const BASE_URL = "https://iyfghaziabad.com/api/devotee";
const BASE_URL = "http://localhost:8000/api/devotee";
 
 

export const setOrLoadUserData = (data)=> {
  if(data) { 
    localStorage.setItem('user_data', JSON.stringify(data));
  }
}

export const getToken = () => {
  const data = JSON.parse(localStorage.getItem('user_data'));
  return data?.tokenId;
}

export const createNewRegistration = (userDetails) => {
  return axios.post(BASE_URL + "/create", userDetails, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const createNewDysRegistration=(userDetails) => {
  return axios.post(BASE_URL+ "/registerfordys", userDetails, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const updateRegistration = ({_id, email, contact}) => {
  return axios.put(BASE_URL + `/update/${_id}`, {email, contact}, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const fetchVolunteerList = () => {
  return axios.get(BASE_URL + FETCH_VOLUNTEER_LIST, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const fetchDysRegList = () =>{ 
  return axios.get(BASE_URL + '/list', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
}

export const fetchDysRegistrations = () => {
  console.log({GOOGLE_TOKEN: getToken()});
  return axios.get(BASE_URL + "/dysList", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
}

export const fetchAllRegistrations = () => {
  return axios.get(BASE_URL + "/list", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};


export const markAttendance = (id, present) => {
  return axios.post(BASE_URL + "/attendance", {
    ticket_id: id,
    present: present,
  }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const markDysAttendance = (ticketId, sessionId, present) => {
  return axios.post(BASE_URL + "/dysAttendance", {
    ticket_id: ticketId,
    present: present,
    session_id: sessionId
  }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}
