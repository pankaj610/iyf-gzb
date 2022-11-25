import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { dovotees, setDevotees } from "../DysRegListContainer";
import { fetchDysRegList } from "../../services/UmangService";
import axios from "axios";

function DysRegListContainer() {
  const [devotees, setDevotees] = useState([]);

  const fetchDysRegList = async() => {
    try {
      const response = await axios.get('http://localhost:8000/api/devotee/list')
      setDevotees(response.data);
      // const fetchDysRegList = () => {
      //   fetch("http://localhost:8000/api/devotee/list");
      //   setDevotees(response.data);
      //  };
      
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },

    {
      name: "Email",
      selector: (row) => row.email,
    },

    {
      name: "Contact",
      selector: (row) => row.contact,
    },

    {
      name: "Dob",
      selector: (row) => row.dob,
    },

    {
      name: "Area",
      selector: (row) => row.area,
    },

    {
      name: "Occupation",
      selector: (row) => row.occupation,
    },

    {
      name: "Connected By",
      selector: (row) => row.connectedBy,
    },
  ];

  useEffect(() => {
    fetchDysRegList();
  }, []);

  return <DataTable columns={columns} data={devotees} pagination/>;
}

export default DysRegListContainer;
