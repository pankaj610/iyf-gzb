import React, { useReducer } from "react";
import Input from "../../ui/Input";
import RoundBtn from "../../ui/RoundBtn";
import { createNewRegistration } from "../../services/UmangService";
import COLORS from "../../constants/colors";
import "./style.scss"; 
import { useAtom } from "jotai";
import { userDataAtom } from "../../App";


const UmangVolunteerContainer = ()=> {
   const [state, setState] = useReducer((prevState, nextState)=> ({...prevState, ...nextState}), {
    name: "",
    email: "",
    contact: "",
    gender: "",
    location: "",
    remarks: "",
    paid: true,
    registeredBy: "0",
    isBgIncluded: false,
  });

  const [userData] = useAtom(userDataAtom);

  const setFormData = (name, value) => {
    setState({
      [name]: value,
    });
  };
  
  const register = () => {
    const { name, email, contact, location, gender,  paid, remarks,isBgIncluded } =
      state; 
    if (name && email && contact && location && gender ) { 
      setState({
        disableBtn: true
      }); 
      const registeredBy =  `${userData?.profileObj?.name}` ;
      createNewRegistration({
        name,
        email,
        contact,
        gender,
        location,
        paid,
        registeredBy: registeredBy === "0" ? undefined : registeredBy,
        remarks,
        isBgIncluded,
      })
        .then((res) => {
          if(res.data.message) {
            alert(res.data.message);
            return;
          }
          setState({
            name: "",
            email: "",
            contact: "",
            location: "",
            gender: "0",
            paid: true,
            registeredBy: "0",
            remarks: "",
          });
          alert(
            `Registration successfully done. Ticket ID is ${res.data?.ticket?.ticket_id}.`
          );
          setState({
            disableBtn: false
          });
        })
        .catch((e) => {
          alert("Error:", JSON.stringify(e));
        });
        setState({
          disableBtn: false
        });
    } else {
      alert("Please fill details");
    }
  };
 
    const {
      name,
      email,
      contact,
      location,
      isBgIncluded,
      // registeredBy,
      // volunteers,
      gender,
      remarks,
      disableBtn,
    } = state;
    return (
      <div className="umang-container">
        <h1>UTSAH REGISTRATION</h1>
        <div className="form">
          <Input
            placeholder={"Name"}
            setValue={setFormData}
            value={name}
            name="name"
            required
          />
          <Input
            placeholder={"Contact"}
            setValue={setFormData}
            value={contact}
            name="contact"
            type="number"
            maxLength="10"
            required
          />
          <Input
            placeholder={"Email"}
            setValue={setFormData}
            value={email}
            name="email"
            type="email"
            required
          />
          <Input
            placeholder={"Gender"}
            setValue={setFormData}
            value={gender}
            name="gender"
            type="select"
            options={[
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" },
            ]}
            className="full input"
          />
          <Input
            placeholder={"Location"}
            setValue={setFormData}
            value={location}
            name="location"
            required
          />
          <Input
            placeholder={"Is Bhagawad Geeta Included"}
            setValue={setFormData}
            value={isBgIncluded}
            name="isBgIncluded"
            type="checkbox"
          />
          {/* <Input
            placeholder={"Registered by"}
            setValue={setFormData}
            value={registeredBy}
            name="registeredBy"
            type="select"
            options={volunteers.map((v) => ({
              label: transformName(v),
              value: v,
            }))}
            className="full input"
            required
          /> */}
          <Input
            placeholder={"Remarks"}
            setValue={setFormData}
            value={remarks}
            name="remarks"
          />
          <RoundBtn
            className="btn selector-btn"
            onClick={register}
            outlineColor={COLORS.YELLOW}
            textColor={COLORS.WHITE}
            bgColor={COLORS.YELLOW}
            outlinePt={2}
            disabled={disableBtn}
          >
            Register
          </RoundBtn>
          <div className="note">
            Please select your correct name in <strong>Registered By</strong>{" "}
            field. If you don't find your name, contact, Krishnanand Sharma at
            9808839806.
            <br /> ISKCON YOUTH FORUM GHAZIABAD holds the right to cancel the
            registration, if any discrepancies found.
          </div>
        </div>
      </div>
    );
  
}

export default UmangVolunteerContainer;
