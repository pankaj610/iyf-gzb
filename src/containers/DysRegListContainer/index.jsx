import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { dovotees, setDevotees } from "../DysRegListContainer";
import { fetchDysRegList } from "../../services/UmangService";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import { Form, Button } from "react-bootstrap";

function DysRegListContainer() {
  const [devotees, setDevotees] = useState([]);

  const fetchDysRegList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/devotee/list"
      );
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
      name: "Ticket ID",
      selector: (row) => row.tickets.tickets_id,
    },
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

    {
      name: "Attendence",
      selector: (row) => row.attendence,
    },
  ];

  const csvLink = {
    filename: "dysDevoteesList.csv",
    columns: columns,
    data: devotees,
  };

  useEffect(() => {
    fetchDysRegList();
  }, []);

  return (
    <>
      <div className="container card =-4 ">
        <h1 className="card text-center">DYS Devotees</h1>

        <div className="row">
          <div className="col">
            <button type="submit ">
              <CSVLink {...csvLink}>Download List</CSVLink>
            </button>
          </div>
          <div className="col">
            <button type="submit">
              <h1>Scan QR Code</h1>
            </button>
          </div>
          <div className="col sm">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </div>
        </div>
      </div>

      <div className="container">
        <DataTable columns={columns} data={devotees} pagination />;
      </div>
    </>
  );

  
}

export default DysRegListContainer;
