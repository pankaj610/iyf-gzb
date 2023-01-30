import React, { useState } from "react";
import { createNewDysRegistration } from "../../services/UmangService";
import ReactLoading from "react-loading";
import Input from "../../ui/Input";
export const transformName = (name) => {
  if (name === "") {
    return "Select";
  }
  return name.split("_").join(" ").toUpperCase();
};

const DysRegistrationForm = () => {
  const initialValues = {
    name: "",
    email: "",
    contact: "",
    dob: "",
    area: "",
    occupation: "",
    registeredBy: "",
    remarks: "",
  };
  const volunteers = [
    "",
    "Kanu Mohan Das",
    "Pankaj Verma",
    "Shubham Tiwari Das",
    "Mohit Rajput",
    "Ankur Sharma",
    "Krishnanand Pr",
    "Raghav Kripa Das",
  ];

  const [formValues, setFormValues] = useState(initialValues);
  const [loader, setLoader] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resetForm = () => {
    setFormValues({ ...initialValues, registeredBy: "0" });
  };

  const registerForDys = () => {
    setLoader(true);
    const {
      name,
      email,
      contact,
      dob,
      area,
      occupation,
      registeredBy,
      remarks,
    } = formValues;
    if (
      name &&
      email &&
      contact &&
      area &&
      occupation &&
      registeredBy &&
      remarks
    ) {
      createNewDysRegistration({
        name,
        email,
        contact,
        dob: dob ? dob : undefined,
        area,
        occupation,
        registeredBy,
        remarks,
      }).then((response) => {
        resetForm();
        const data = response.data;
        if (data?.message) {
          setLoader(false);
          alert(data.message);
        } else {
          setLoader(false);
          alert(
            "DYS is registered successfully. Ticket Id: " +
              data.ticket?.ticket_id
          );
        }
      });
    }
  };

  return (
    <>
      {loader && <ReactLoading type="spin" height="25px" width="25px" />}
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
          <Input
            placeholder={"Registered by"}
            setValue={(name, value) =>
              handleChange({ target: { name, value } })
            }
            value={formValues.registeredBy}
            name="registeredBy"
            type="select"
            options={volunteers.map((v) => ({
              label: transformName(v),
              value: v,
            }))}
            className="full input w-100"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={formValues.remarks}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Remarks"
            onChange={handleChange}
            name="remarks"
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
