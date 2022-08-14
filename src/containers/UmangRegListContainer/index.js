import React, { Component } from "react";
import DataTable from "react-data-table-component";
import {
  fetchAllRegistrations,
  markAttendance,
  updateRegistration,
} from "../../services/UmangService";
import { COLUMNS } from "./constants";
import "./style.scss"; 
import { QrReader } from 'react-qr-reader';

class UmangRegListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      searchText: "",
      editPopup: null,
      viewPopup: null,
      showDialog: true,
      processing: true,
      qrScanner: false
    };
  }
  componentDidMount() {
    fetchAllRegistrations()
      .then((res) => {
        this.setState({
          data: res.data.map((reg) => ({
            ...reg,
            registeredOn: new Date(reg.registeredOn).toDateString(),
            registeredBy: reg.tickets[0]?.registeredBy,
            remarks: reg.tickets[0]?.remarks,
            uuid: reg.tickets[0]?.ticket_id,
            attendance: reg.tickets[0]?.present ? 'present' : 'absent'
          })),
        });
      })
      .catch((err) => {
        alert("Error:", err.message);
      });
  }

  convertArrayOfObjectsToCSV = (array) => {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    // const keys = Object.keys(data[0]);
    const names = COLUMNS(() => {}, false)
      .map((e) => e.name)
      .slice(0, -1);
    const keys = COLUMNS(() => {}, false)
      .map((e) => e.selector)
      .slice(0, -1);

    result = "";
    result += names.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key].toString().replace(",", ".");

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  downloadCSV = (array) => {
    // const link = document.createElement('a');
    let csv = this.convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    this.exportRef.setAttribute("href", encodeURI(csv));
    this.exportRef.setAttribute("download", filename);
    // this.exportRef.click();
  };

  onSearch = (e) => {
    const { data } = this.state;
    const value = e.target.value;
    const lowered = value && value.toLowerCase();
    this.setState({
      filteredData: data.filter((participant) => {
        console.log(">>>", participant);
        return (
          participant.uuid?.toLowerCase().includes(lowered) ||
          participant.name?.toLowerCase().includes(lowered) ||
          participant.email?.toLowerCase().includes(lowered) ||
          participant.contact.toString()?.toLowerCase().includes(lowered) ||
          participant.registeredBy?.toLowerCase().includes(lowered)
        );
      }),
      searchText: value,
    });
  };

  handleMarkAttendance(ticketId, isPresent, name = null) {
    markAttendance(ticketId, isPresent)
          .then((res) => {
            if(name) {
              alert(`Hare Krishna ${name} prbhu, Your attendance is marked successfully.`);
            }
            this.setState({
              data: res.data.map((reg) => ({
                ...reg,
                registeredOn: new Date(reg.registeredOn).toDateString(),
                registeredBy: reg.tickets[0]?.registeredBy,
                remarks: reg.tickets[0]?.remarks,
                uuid: reg.tickets[0]?.ticket_id,
                attendance: reg.tickets[0]?.present ? 'present' : 'absent'
              })),
              disabled: false,
            }, ()=> {
              this.onSearch({target: {value: this.state.searchText}});
            });
          })
          .catch((err) => {
            this.setState({ disabled: false });
            alert(err?.response?.data?.message || err.message);
          });
  }

  handleButtonClick = (type, row) => {
    switch (type) {
      case "edit": {
        this.setState({ editPopup: row });
        break;
      }
      case "view": {
        this.setState({ viewPopup: row });
        break;
      }
      case "attend": {
        this.setState({ disabled: true });
        this.handleMarkAttendance(row.uuid, row.attendance === "absent" ? true : false);
      }
      default:
    }
  };

  sendUpdateRequest = () => {
    const {
      editPopup: {
        _id,
        email,
        contact,
      },
    } = this.state;
    updateRegistration({
      _id,
      email,
      contact,
    })
      .then(() => {
        const updatedData = this.state.data.map((participant) => {
          if (participant._id === _id) {
            return {
              ...participant,
              email: email,
              contact: contact,
            };
          }
          return participant;
        });
        this.setState({
          data: updatedData,
          editPopup: null,
        });
      })
      .catch((err) => {
        alert(err.message);
        this.setState({
          editPopup: null,
        });
      });
  };

  render() {
    const { data, searchText, filteredData, editPopup, viewPopup, disabled } =
      this.state;
      const isMobile = window.screen.width <= 600;
      const width = isMobile ? window.screen.width - 20 : window.screen.width/4;
      console.log(width);
    return (<div className="reg-list-container">
        <div style={{ width: width+"px", heigth: width+"px", alignSelf: "center" }}>
          {this.state.qrScanner ? <QrReader
                ref={(ref)=> this.qrRef = ref}
                scanDelay={500}
                onError={(err)=> {alert(err)}}
                facingMode='rear'
                onResult={(result, error) => {
                  if (!!result) {  
                    if(this.state.qrScanner) {
                      let parsedTicketData = JSON.parse(result.text);
                      if(this.state.data.filter(el=> el.uuid === parsedTicketData.ticketId && el.attendance === 'present').length > 0) {
                          alert("Devotee already present");
                      }  else if(this.state.data.filter(el=> el.uuid === parsedTicketData.ticketId && el.attendance === 'absent').length > 0) {
                        // this.setState({qrScanner: false});
                        this.handleMarkAttendance(parsedTicketData.ticketId, true, parsedTicketData.name);
                      } else {
                        alert("Ticket not found");
                      }
                      this.setState({searchText: parsedTicketData.ticketId});
                      this.onSearch({target: {value: parsedTicketData.ticketId}});
                    }
                  }
                }} 
                
              />: null}
        </div>
        <div className="header-bar"> 
          <a
            ref={(ref) => {
              this.exportRef = ref;
            }}
            onClick={() => this.downloadCSV(data)} 
          >
            <button>Export to CSV</button>
          </a>

            
          <div>
            
              <button onClick={()=> {
                this.setState({qrScanner: true});
              }}>Show Qr Scanner</button>
          </div>
          <input
            autoComplete="off"
            id="search"
            type="text"
            placeholder="Search by Ticket ID / Name/ Email / Phone number"
            aria-label="Search Input"
            value={searchText}
            onChange={this.onSearch}
          />
        </div>
        <DataTable
          title={`All UTSAH Registrations | Total (${this.state.data?.length}) | Present(${this.state.data?.filter(el=> el.attendance === 'present').length})`}
          columns={COLUMNS(this.handleButtonClick, disabled)}
          data={searchText.length ? filteredData : data}
          pagination
          selectableRows
          dense
        />
        {editPopup && (
          <div
            className="popup-outer"
            onClick={() => {
              this.setState({ editPopup: null });
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
                      value={editPopup.email}
                      onChange={(e) => {
                        this.setState({
                          editPopup: { ...editPopup, email: e.target.value },
                        });
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
                      value={editPopup.contact}
                      onChange={(e) => {
                        this.setState({
                          editPopup: { ...editPopup, contact: e.target.value },
                        });
                      }}
                    />
                  </b>
                </li>
              </ul>
              <button onClick={this.sendUpdateRequest}>UPDATE</button>
            </div>
          </div>
        )}
        {viewPopup && (
          <div
            className="popup-outer"
            onClick={() => this.setState({ viewPopup: null })}
          >
            <div
              className="popup-inner"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ul className="view-sheet">
                <li>
                  Ticket ID: <b>{viewPopup.uuid}</b>
                </li>
                <li>
                  Name: <b>{viewPopup.name}</b>
                </li>
                <li>
                  Email: <b>{viewPopup.email}</b>
                </li>
                <li>
                  Contact: <b>{viewPopup.contact}</b>
                </li>
                <li>
                  Registered by: <b>{viewPopup.registeredBy}</b>
                </li>
                <li>
                  Remarks: <b>{viewPopup.remarks}</b>
                </li>
                <li>
                  Registered on: <b>{viewPopup.registeredOn}</b>
                </li>
              </ul>
            </div>
          </div>
        )}
        
      </div>
      );
  }
}

export default UmangRegListContainer;
