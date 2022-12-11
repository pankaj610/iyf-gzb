import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import "./Login.scss";
import { useNavigate } from "react-router";
import { ROUTE } from "../../constants";
import { setOrLoadUserData, setTokenOrLoad } from "../../services/UmangService";
import { setUserDataAtom } from "../../App";
import { useAtom } from 'jotai';
const clientId =
  "376495499824-ve654phdegv5hq7ri5kg9imnphcti4j5.apps.googleusercontent.com";

function LoginScreen() {
    const navigate = useNavigate();
    const [, setUserData] = useAtom(setUserDataAtom);
  const responseGoogle = (response) => {
    if(!response?.tokenId) {
        alert("There is some error while logging in.");
        return;
    } 
    setOrLoadUserData(response);
    setUserData(response);
    navigate(ROUTE.DYS);
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center h-vh100">
      <div className="form-box">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
          </h4>
          <div className="image"></div>
        </div>
        <div className="body-form">
          <div className="social">
            <GoogleLogin
              clientId={clientId}
              buttonText="Login By Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
