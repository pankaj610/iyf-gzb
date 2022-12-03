import "./styles.scss";
import React, { useMemo } from "react"; 
import { useState, useEffect } from "react";
import {
  fetchDysRegistrations,
  markDysAttendance,
  updateRegistration,
} from "../../services/UmangService";
import { DYS_COLUMNS } from "./constants";
import { CSVLink } from "react-csv";
import { Form, Button,  Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function DysRegListContainer() {
  const [dysRegistrations, setDysRegistrations] = useState([]);
  const [searchText, setSearchInput] = useState("");

  const params = useParams();
  const { session_id } = params || {};

  const navigate = useNavigate();
  

  
  const [{ editPopup, viewPopup }, setState] = useState({
    editPopup: null,
    viewPopup: null,
  });
  
  
  const csvLink = useMemo(
    () => ({
      filename: "dysDevoteesList.csv",
      columns: DYS_COLUMNS,
      data: dysRegistrations,
    }),
    [dysRegistrations]
    );
  

  const dysSearchedRegistrations = useMemo(() => {
    const lowered = searchText && searchText.toLowerCase();
    if (!lowered) return dysRegistrations;
    return dysRegistrations.filter((participant) => {
      return (
        participant?.devoteeInfo?.[0]?.uuid?.toLowerCase().includes(lowered) ||
        participant?.devoteeInfo?.[0]?.name?.toLowerCase().includes(lowered) ||
        participant?.devoteeInfo?.[0]?.email?.toLowerCase().includes(lowered) ||
        participant?.devoteeInfo?.[0]?.contact
          ?.toString()
          ?.toLowerCase()
          .includes(lowered) ||
        participant?.devoteeInfo?.[0]?.registeredBy
          ?.toLowerCase()
          .includes(lowered) ||
        participant?.dys_batch
          ?.toLowerCase()
          ?.replace("_", " ")
          .includes(lowered)
      );
    });
  }, [searchText, dysRegistrations]);

  useEffect(() => {
    if(session_id) {
      fetchDysRegList();
    }
  }, [session_id]);

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
        setState({ editPopup: { ...row } });
        break;
      }
      case "view": {
        setState({ viewPopup: { ...row } });
        break;
      }
      default:
        break;
    }
  };

  const sendUpdateRequest = () => {
    const { devoteeInfo } = editPopup;
    const { _id, email, contact } = devoteeInfo?.[0] || {};
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

  const onSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  console.log({session_id});
  if(!session_id) return (<Container className="container text-center" style={{ paddingTop: "30vh" }} fluid>
    <h1 className="text-center">Please select DYS session</h1>
      <Row>
        <Col>
          <Button variant="outline-success"  className="m-3" size="lg" onClick={()=> {
            navigate(`/dys/list/session_1`);
          }}>Session 1</Button>
          <Button variant="outline-success" className="m-3"  size="lg" onClick={()=> {
            navigate(`/dys/list/session_2`);
          }}>Session 2</Button>
          <Button variant="outline-success" className="m-3"  size="lg" onClick={()=> {
            navigate(`/dys/list/session_3`);
          }}>Session 3</Button>
          <Button variant="outline-success" className="m-3"  size="lg" onClick={()=> {
            navigate(`/dys/list/session_4`);
          }}>Session 4</Button>
          <Button variant="outline-success" className="m-3"  size="lg" onClick={()=> {
            navigate(`/dys/list/session_5`);
          }}>Session 5</Button>
          <Button variant="outline-success"  className="m-3" size="lg" onClick={()=> {
            navigate(`/dys/list/session_6`);
          }}>Session 6</Button>
        </Col>
      </Row>
      <Button variant="info"  className="m-3 text-white" size="lg" onClick={()=> {
        navigate(`/dys`);
      }}>Register for DYS</Button>
  </Container>
  )


  return (
    <div className="reg-list-container">
      <h1 className="text-center">DYS Devotees</h1>
      <div className="row mb-3">
         <div className="col-md-1 col-sm-2 col-xs-2 mb-2">
          <Button variant="warning" onClick={()=> {
            navigate("/dys/list");
          }}> 
               <i class="fa-solid fa-arrow-left"></i>&nbsp; Back
          </Button>
        </div> 
        <div className="col-md-2 col-sm-2 col-xs-6 mb-2">
          <Button variant="success">
            <CSVLink
              {...csvLink}
              style={{ color: "white", textDecoration: "none" }}
            > 
              <i class="fa-solid fa-cloud-arrow-down"></i>&nbsp; Download List
            </CSVLink>
          </Button>
        </div>
        <div className="col-md-5 col-sm-2 col-xs-2 mb-2">
          <Button variant="info" className="text-white">
            <i class="fa-light fa-qrcode"></i>&nbsp; Scan QR Code
          </Button>
        </div>
        <div className="col-md-4 col-sm-12">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              defaultValue={searchText}
              onChangeCapture={onSearch}
            />
            <Button variant="outline-success d-flex align-items-center">
              <i class="fa-solid fa-magnifying-glass"></i> Search
            </Button>
          </Form>
        </div>
      </div>

      {/* <DataTable
        title={`All DYS Registrations | Total (${dysRegistrations?.length}) `}
        columns={DYS_COLUMNS(handleRowActions, false, session_id)}
        data={dysSearchedRegistrations}
        search={true}
        selectableRows
        pagination
      /> */}

      <Table className="table">
        <Thead>
          <Tr>
            {DYS_COLUMNS(handleRowActions, false, session_id).map((column) => {
              return <Th key={column.name}>{column.name}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {dysSearchedRegistrations?.length > 0
            ? dysSearchedRegistrations?.map((registration) => {
                return (
                  <Tr key={registration?.ticket_id}>
                    {DYS_COLUMNS(handleRowActions, false, session_id).map(
                      (column) => {
                        return (
                          <Td key={column.name}>
                            {column?.selector?.(registration)}
                          </Td>
                        );
                      }
                    )}
                  </Tr>
                );
              })
            : null}
        </Tbody>
      </Table>
      {dysSearchedRegistrations.length === 0 && (
        <h4 className="text-center">No data found!!!</h4>
      )}

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
                      if (editPopup.devoteeInfo?.[0]) {
                        editPopup.devoteeInfo[0].email = e.target.value;
                        setState({
                          editPopup: {
                            ...editPopup,
                            devoteeInfo: [editPopup?.devoteeInfo?.[0]],
                          },
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
                        editPopup: {
                          ...editPopup,
                          devoteeInfo: [editPopup?.devoteeInfo?.[0]],
                        },
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
