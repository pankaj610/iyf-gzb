import "./styles.scss";
import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import {
  fetchDysRegistrations,
  markDysAttendance,
  updateRegistration,
} from "../../services/UmangService";
import { DYS_COLUMNS } from "./constants";

function DysRegListContainer() {
  const [dysRegistrations, setDysRegistrations] = useState([]);
  const [{ editPopup, viewPopup }, setState] = useState({
    editPopup: null,
    viewPopup: null,
  });

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

  const handleRowActions = (type, row) => {
    console.log(JSON.stringify(row, null, 2));
    switch (type) {
      case "mark_attendance":
        markDysAttendance(
          row.row?.ticket_id,
          row?.session,
          !row?.isPresent
        ).then((response) => {
          const data = response.data;
          setDysRegistrations(data.dysList);
        });
        break;
      case "edit": {
        setState({ editPopup: {...row} });
        break;
      }
      case "view": {
        setState({ viewPopup: {...row} });
        break;
      }
      default:
        break;
    }
  };

  const sendUpdateRequest = () => { 
    const { devoteeInfo } = editPopup;
    const { _id, email, contact} = devoteeInfo?.[0] || {};
    updateRegistration({
      _id,
      email,
      contact,
    })
      .then(() => {
        const updatedData = dysRegistrations.map((participant) => {
          if (participant._id === _id) {
            return {
              ...participant,
              email: email,
              contact: contact,
            };
          }
          return participant;
        });
        setState({
          dysRegistrations: updatedData,
          editPopup: null,
        });
      })
      .catch((err) => { 
        alert(err.message);
        fetchDysRegList();
        setState({
          editPopup: null,
        });
      });
  };

  useEffect(() => {
    fetchDysRegList();
  }, []);

  return (
    <div className="reg-list-container">
      <DataTable
        title={`All DYS Registrations | Total (${dysRegistrations?.length}) `}
        columns={DYS_COLUMNS(handleRowActions, false)}
        data={dysRegistrations}
        search={true}
        selectableRows
        pagination
      />

      {editPopup && (
        <div
          className="popup-outer"
          onClick={() => {
            setState({ editPopup: null });
          }}
        >
          <div
            className="popup-inner"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ul className="edit-sheet">
              <li>
                Email
                <br />
                <b>
                  <input
                    autoComplete="off"
                    value={editPopup?.devoteeInfo?.[0]?.email}
                    onChange={(e) => {
                      if(editPopup.devoteeInfo?.[0]) {
                        editPopup.devoteeInfo[0].email = e.target.value;
                        setState({
                          editPopup: { ...editPopup, devoteeInfo: [editPopup?.devoteeInfo?.[0]] },
                        });
                      }
                    }}
                  />
                </b>
              </li>
              <li>
                Contact
                <br />
                <b>
                  <input
                    autoComplete="off"
                    value={editPopup?.devoteeInfo?.[0]?.contact}
                    onChange={(e) => {
                      editPopup.devoteeInfo[0].contact = e.target.value;
                        setState({
                          editPopup: { ...editPopup, devoteeInfo: [editPopup?.devoteeInfo?.[0]] },
                        });
                    }}
                  />
                </b>
              </li>
            </ul>
            <button onClick={sendUpdateRequest}>UPDATE</button>
          </div>
        </div>
      )}
      {viewPopup && (
        <div
          className="popup-outer"
          onClick={() => setState({ viewPopup: null })}
        >
          <div
            className="popup-inner"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ul className="view-sheet">
              <li>
                Ticket ID: <b>{viewPopup.ticket_id}</b>
              </li>
              <li>
                Name: <b>{viewPopup?.devoteeInfo?.[0]?.name}</b>
              </li>
              <li>
                Batch: <b>{viewPopup.dys_batch}</b>
              </li>
              <li>
                Contact: <b>{viewPopup?.devoteeInfo?.[0]?.contact}</b>
              </li>
              <li>
                Registered by: <b>{viewPopup.registeredBy}</b>
              </li>
              <li>
                Remarks: <b>{viewPopup.remarks}</b>
              </li>
              <li>
                Registered on:{" "}
                <b>{new Date(viewPopup.registeredOn).toLocaleString()}</b>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DysRegListContainer;
