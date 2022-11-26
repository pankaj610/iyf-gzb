import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import {
  fetchDysRegistrations,
  markDysAttendance,
} from "../../services/UmangService";

function DysRegListContainer() {
  const [dysRegistrations, setDysRegistrations] = useState([]);

  const fetchDysRegList = async () => {
    fetchDysRegistrations()
      .then((response) => {
        const data = response.data;
        setDysRegistrations(data?.dysList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.devoteeInfo?.[0]?.name,
    },

    {
      name: "Email",
      selector: (row) => row.devoteeInfo?.[0]?.email,
    },

    {
      name: "Contact",
      selector: (row) => row.devoteeInfo?.[0]?.contact,
    },
    {
      name: "Ticket Id",
      selector: (row) => row.ticket_id,
    },

    {
      name: "Batch",
      selector: (row) => row.dys_batch,
    },

    {
      name: "Attendance",
      selector: (row) => {
        const sessions = Object.keys(row.present);
        const labels = sessions.map((session) => { 
          if(session.indexOf("session") < 0 ) return null; // hide extra id key

          const isPresent = row.present?.[session];
          return (
            <div>
              <label>{session?.split("_").join(" ").toLocaleUpperCase()}</label>
              <label style={{
                      color: "white",
                      background: isPresent ?  "#050" : "#666" ,
                      border: "1px solid black",
                      margin: "2px 8px",
                      borderRadius: "4px",
                      padding: "1px 4px",
                    }} onClick={()=> markDysAttendance(row.ticket_id,session,!isPresent).then(response=> {
                      const data = response.data;
                      setDysRegistrations(data.dysList);
                    })}>{ isPresent ? 'Mark Absent': 'Mark Present'}</label>
            </div>
          );
        });
        return labels;
      },
    },
  ];

  useEffect(() => {
    fetchDysRegList();
  }, []);

  return (
    <div>
      <DataTable
        title={`All DYS Registrations | Total (${dysRegistrations?.length}) `}
        columns={columns}
        data={dysRegistrations} 
        search={true}
        pagination
      />
    </div>
  );
}

export default DysRegListContainer;
