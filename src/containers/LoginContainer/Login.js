import React, { useEffect } from "react"; 
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import "./Login.scss";
import { useNavigate } from "react-router";
import { ROUTE } from "../../constants";
import { setOrLoadUserData, whatCanISee } from "../../services/UmangService";
import { setUserDataAtom, whatCanISeeAtom } from "../../App";
import { useAtom } from "jotai";
import { useSearchParams } from "react-router-dom";
export const clientId =
  "276504402857-9q9ttkm752t0440upd22eevlaglsj9r8.apps.googleusercontent.com";

function LoginScreen() {
  const [, setICanSee] = useAtom(whatCanISeeAtom);
  const navigate = useNavigate();
  const [, setUserData] = useAtom(setUserDataAtom);

  const [searchParams] = useSearchParams(); 
  const redirectUrl = searchParams?.get("redirect");


  const responseGoogle = (response) => {
    if (!response?.tokenId) {
      alert(JSON.stringify(response)); 
      return;
    }
    setOrLoadUserData(response);
    setUserData(response);
    whatCanISee().then((res)=> {
      const iCanSee = res.data.iCanSee;
      setICanSee(iCanSee);
    })
    if(redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      navigate(ROUTE.UTSAH_VOLUNTEER);
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: 'profile email',
        plugin_name:'iyf_login'
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
