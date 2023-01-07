import "./styles.scss";
import React, { useMemo, useRef } from "react";
import { useState, useEffect } from "react";
import {
  fetchAllFacilitators,
  fetchDysRegistrations,
  markDysAttendance,
  updateRegistration,
} from "../../services/UmangService";
import { DYS_COLUMNS } from "./constants";
import { CSVLink } from "react-csv";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Card,
  FormLabel,
  Dropdown,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { QrReader } from "react-qr-reader";
import Input from "../../ui/Input";

function DysRegListContainer() {
  const [dysRegistrations, setDysRegistrations] = useState([]);
  const [searchText, setSearchInput] = useState("");
  const [facilitatorList, setFacilitatorsList] = useState([]);

  const params = useParams();
  const { session_id } = params || {};

  const navigate = useNavigate();

  const qrRef = useRef();

  const [{ editPopup, viewPopup, scanner, facingMode, completed }, setState] =
    useState({
      editPopup: null,
      viewPopup: null,
      scanner: false,
      facingMode: "environment",
      completed: false,
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
    if (session_id) {
      fetchDysRegList();
    }
  }, [session_id]);

  useEffect(()=> {
    fetchAllFacilitators().then((response)=> {
      setFacilitatorsList(response.data?.data?.data?.map(el=> el.name));
    })
  }, []);
 

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
    const { _id, email, contact, frontliner,
      facilitator, dob } = devoteeInfo?.[0] || {};

    updateRegistration({
      _id,
      email,
      contact,
      frontliner,
      facilitator,
      dob,
    })
      .then((response) => {
        const updatedData = dysRegistrations.map((participant) => {
          if (participant._id === _id) {
            return response?.data;
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

  const CameraComponent = useMemo(() => {
    return (
      <QrReader
        ref={qrRef}
        scanDelay={500}
        onError={(err) => {
          alert(err);
        }}
        constraints={{
          facingMode,
        }}
        onResult={(result, error) => {
          if (!!result) {
            if (scanner) {
              let parsedTicketData = JSON.parse(result.text);
              const devotee = dysRegistrations.find(
                (el) => el.ticket_id === parsedTicketData?.ticketId
              );
              if (devotee) { 
                setState((prev) => ({ ...prev, completed: devotee }));
                setTimeout(() => {
                  setState((prev) => ({ ...prev, completed: null }));
                }, 3000);
                markDysAttendance(
                  parsedTicketData?.ticketId,
                  session_id,
                  true
                ).then((response) => {
                  const data = response.data;
                  setDysRegistrations(data.dysList);
                });
              } else {
                alert("No data found");
              }
            }
          }
        }}
      />
    );
  }, [dysRegistrations, facingMode, scanner, session_id]);
 
  if (!session_id)
    return (
      <Container
        className="container text-center"
        style={{ paddingTop: "10vh" }}
        fluid
      >
        <h1 className="text-center">Please select DYS session</h1>
        <Row className="justify-content-center px-3 mx-3">
          <Button
            variant="outline-success"
            className="m-3"
            size="lg"
            onClick={() => {
              navigate(`/dys/list/session_1`);
            }}
          >
            Session 1
          </Button>
          <Button
            variant="outline-success"
            className="m-3"
            size="lg"
            onClick={() => {
              navigate(`/dys/list/session_2`);
            }}
          >
            Session 2
          </Button>
          <Button
            variant="outline-success"
            className="m-3"
            size="lg"
            onClick={() => {
              navigate(`/dys/list/session_3`);
            }}
          >
            Session 3
          </Button>
          <Button
            variant="outline-success"
            className="m-3"
            size="lg"
            onClick={() => {
              navigate(`/dys/list/session_4`);
            }}
          >
            Session 4
          </Button>
          <Button
            variant="outline-success"
            className="m-3"
            size="lg"
            onClick={() => {
              navigate(`/dys/list/session_5`);
            }}
          >
            Session 5
          </Button>
          <Button
            variant="outline-success"
            className="m-3"
            size="lg"
            onClick={() => {
              navigate(`/dys/list/session_6`);
            }}
          >
            Session 6
          </Button>
        </Row>
        <Button
          variant="info"
          className="m-3 text-white"
          size="lg"
          onClick={() => {
            navigate(`/dys`);
          }}
        >
          Register for DYS
        </Button>
      </Container>
    );

  return (
    <div className="reg-list-container">
      <h1 className="text-center">DYS Devotees</h1>
      <div className="row mb-3 d-flex">
        <Col lg={2} md={2} sm={6} xs={6} className="mb-2">
          <Button
            variant="warning"
            onClick={() => {
              navigate("/dys/list");
            }}
          >
            <i class="fa-solid fa-arrow-left"></i>&nbsp; Back
          </Button>
        </Col>
        <Col lg={3} md={3} sm={5} xs={6}>
          <Button variant="success" className="float-end float-sm-start">
            <CSVLink
              {...csvLink}
              style={{ color: "white", textDecoration: "none" }}
            >
              <i class="fa-solid fa-cloud-arrow-down"></i>&nbsp; Download
            </CSVLink>
          </Button>
        </Col>
        <Col lg={3} md={3} sm={4} className="mb-2">
          <Button
            variant="info"
            className="text-white"
            onClick={() => setState({ scanner: true })}
          >
            <i class="fa-light fa-qrcode"></i>&nbsp; Scan QR Code
          </Button>
        </Col>
        <Col lg={4} md={4} sm={12} className="text-right">
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
        </Col>
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
                  <Tr key={registration?.ticket_id} className="mb-2">
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
            <ul className="m-0 p-0">
              <li>
                <FormLabel>Email</FormLabel>
                <Input
                  className="full input w-100"
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
              </li>
              <li>
                <FormLabel>Contact</FormLabel>
                <Input
                  className="full input w-100"
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
              </li>
              <li>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  className="full input w-100"
                  autoComplete="off"
                  name="dob"
                  value={editPopup?.devoteeInfo?.[0]?.dob}
                  setValue={(key, value) => {
                    console.log({dob: value});
                    editPopup.devoteeInfo[0].dob = value;
                    setState({
                      editPopup: {
                        ...editPopup,
                        devoteeInfo: [editPopup?.devoteeInfo?.[0]],
                      },
                    });
                  }}
                />
              </li>
              <li>
                <FormLabel>Facilitator</FormLabel>
                <Dropdown onSelect={(value)=> {
                  editPopup.devoteeInfo[0].facilitator = value;
                  setState({
                    editPopup: {
                      ...editPopup,
                      devoteeInfo: [editPopup?.devoteeInfo?.[0]],
                    },
                  });
                }} >
                  <Dropdown.Toggle variant="info"  id="dropdown-basic">
                    { editPopup?.devoteeInfo?.[0]?.facilitator || 'Facilitator'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {facilitatorList.map(facilitator => <Dropdown.Item eventKey={facilitator} >{facilitator}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown> 
              </li>
              <li>
                <FormLabel>Frontliner</FormLabel>
                <Dropdown onSelect={(value)=> {
                  editPopup.devoteeInfo[0].frontliner = value;
                  setState({
                    editPopup: {
                      ...editPopup,
                      devoteeInfo: [editPopup?.devoteeInfo?.[0]],
                    },
                  });
                }} >
                  <Dropdown.Toggle variant="info"  id="dropdown-basic">
                    { editPopup?.devoteeInfo?.[0]?.frontliner || 'Frontliner'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {facilitatorList.map(facilitator => <Dropdown.Item eventKey={facilitator} >{facilitator}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown> 
              </li>
             
            </ul>
            <button
              onClick={sendUpdateRequest}
              className="btn btn-success mt-2"
            >
              UPDATE
            </button>
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
                Facilitator: <b>{viewPopup?.devoteeInfo?.[0]?.facilitator}</b>
              </li>
              <li>
                Frontliner: <b>{viewPopup?.devoteeInfo?.[0]?.frontliner}</b>
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

      {scanner && (
        <div
          className="popup-outer"
          onClick={() => setState({ scanner: null })}
        >
          <div
            className="popup-inner text-center m-0 p-0 "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div style={{ position: "relative" }}>
              {completed && (
                <Card
                  style={{
                    position: "absolute",
                    zIndex: 999,
                    width: 300,
                    transform: "translate(16%, 15%)",
                  }}
                >
                  <Image src="/assets/images/completed.gif" />

                  <div style={{ lineHeight: 0.5 }}>
                    <p>Name: {completed?.devoteeInfo?.[0]?.name}</p>
                    <p>Email: {completed?.devoteeInfo?.[0]?.email}</p>
                    <h6>Attendance marked successfully.</h6>
                  </div>
                </Card>
              )}
              {CameraComponent}
            </div>

            <Row>
              <Col className="mb-2">
                <Button
                  variant="success"
                  onClick={() => {
                    const previous = facingMode; 
                    setState((prev) => ({
                      ...prev,
                      scanner: null,
                      facingMode: null,
                    }));
                    setTimeout(() => {
                      setState((prev) => ({
                        ...prev,
                        scanner: true,
                        facingMode:
                          previous === "front" ? "environment" : "front",
                      }));
                    }, 1000);
                  }}
                >
                  Change Camera
                </Button>
              </Col>
            </Row>
            <Button
              variant="danger"
              className="mb-3"
              onClick={() => setState({ scanner: null })}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DysRegListContainer;
