import React, { useState } from "react";
import { createNewDysRegistration } from "../../services/UmangService";
// import { placeholder } from "react-bootstrap";

const DysRegistrationForm = () => {
  const initialValues = {name: "", email: "", contact: "", dob: "", area:"", occupation: "", connectedby:""};
  const [formValues, setFormValues]=useState(initialValues)

  const handleChange = (e) => {
    console.log(e.target);
    const {name, value } = e.target;
    setFormValues({...formValues,[name]:value})
  }


  const registerForDys =()=> {
    console.log(formValues);
    const {name, email , contact, dob, area, occupation,connectedby}= formValues
    if( name && email && contact && dob && area && occupation && connectedby){
      createNewDysRegistration({name , email, contact,dob, area, occupation, connectedBy:connectedby}).then((response)=>{
        console.log(response);
        setFormValues(initialValues);
        const data=response.data;
        alert(data?.ticket?.ticket_id);

      })
    }


  }
  return (
    <>
      <div className="container">
        {/* <div className="text-bg-dark p-3">Dark with contrasting color</div> */}
        <div className="umang-container">
          <h1 className="text-center">DYS REGISTRATION</h1>
        </div>
        <div className="input-group mb-3 ">
          <input
            type="text"
            value={formValues.name}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Name"
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="email"
            value={formValues.email}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Email"
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="phone"
            value={formValues.contact}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Contact"
            onChange={handleChange}
            name="contact"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="date"
            value={formValues.dob}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Date of Birth"
            onChange={handleChange}
            name="dob"
          />
          </div>
        {/* <div className="input-group mb-3">
          <select className="form-select" id="inputGroupSelect01">
            <option selected>Select Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </div> */}
        <div className="input-group mb-3 col-md-4">
          <input
            type="text"
            value={formValues.area}
            className="form-control col-md-6"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Area"
            onChange={handleChange}
            name="area"
          />
        </div>
        {/* <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Address"
          />
        </div> */}
        {/* <div className="input-group mb-3">
          <select className="form-select" id="inputGroupSelect01">
            <option selected>className Level</option>
            <option value="1">DYS</option>
          
            <option value="1">VL1</option>
            <option value="2">VL2</option>
            <option value="3">VL3</option>
            <option value="4">NS</option>
            <option value="5">SPS</option>
            <option value="6">DPS</option>
            <option value="7">BVS</option>
            <option value="8">SNS</option>
            <option value="9">BSS</option>
            <option value="10">TRD</option>
            <option value="11">Other</option>
          </select>
        </div> */}
        {/* <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Facilitator"
          />
        </div> */}
        {/* <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Frontliner"
          />
        </div> */}
        <div className="input-group mb-3">
          <input
            type="text"
            value={formValues.occupation}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Occupation"
            onChange={handleChange}
            name="occupation"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            value={formValues.connectedby}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Connected By"
            onChange={handleChange}
            name="connectedby"
          />
        </div>
        {/* <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Maritial Status"
          />
        </div> */}
        {/* <div className="input-group mb-3">
          <select className="form-select" id="inputGroupSelect01">
            <option selected>Are you from Ghaziabad</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
          </select>
        </div> */}
        <div className="text-center mb-3">
          <input
            className="btn btn-success"
            type="submit"
            value="Register"
            onClick={registerForDys}
          ></input>
        </div>
      </div>
    </>
  );
};

export default DysRegistrationForm;
