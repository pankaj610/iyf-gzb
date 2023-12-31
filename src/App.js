import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes, 
} from "react-router-dom";
import "./App.scss";
import ContactContainer from "./containers/ContactContainer";
import UmangContainer from "./containers/UmangContainer";
import AboutContainer from "./containers/AboutContainer";
import TncContainer from "./containers/TncContainer";
import PrivacyContainer from "./containers/PrivacyContainer";
import RefundContainer from "./containers/RefundContainer";
import UmangVolunteerContainer from "./containers/UmangVolunteerContainer";
import UmangRegListContainer from "./containers/UmangRegListContainer";
import { ROUTE } from "./constants";
import DysRegistrationForm from "./containers/DysRegistrationForm";
import DysRegListContainer from "./containers/DysRegListContainer";
import LoginScreen from "./containers/LoginContainer/Login";
import AppNavbar from "./components/AppNavbar";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { whatCanISee } from "./services/UmangService";

export const ProtectedRoute = ({ children }) => {
  const [, setICanSee] = useAtom(whatCanISeeAtom);

  const fetchWhatCanISee = () => {
    whatCanISee().then((res) => {
      const iCanSee = res.data.iCanSee;
      setICanSee(iCanSee);
    });
  };

  useEffect(() => { 
    fetchWhatCanISee();
  }, []);

  const loc = window.location.href;
  const data = localStorage.getItem("user_data");
  if (!data) {
    return <Navigate to={`/login?redirect=${loc}`} />;
  }
  return (
    <div>
      <AppNavbar />
      {children}
    </div>
  );
};

export const userDataAtom = atom({});
export const setUserDataAtom = atom(null, (_, set, value) =>
  set(userDataAtom, value)
);
export const whatCanISeeAtom = atom([]);

function App() {
  const [, setUserData] = useAtom(setUserDataAtom); 
  const [iCanSee] = useAtom(whatCanISeeAtom);
 

  useEffect(() => {
    loadUserData(); 
  }, []);

  const loadUserData = () => {
    const data = JSON.parse(localStorage.getItem("user_data"));
    if (data) {
      setUserData(data);
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={ROUTE.HOME} element={<UmangContainer />} exact />
          <Route path={ROUTE.LOGIN} element={<LoginScreen />} exact />
          <Route path={ROUTE.CONTACT_US} element={<ContactContainer />} exact />
          <Route path={ROUTE.ABOUT} element={<AboutContainer />} exact />
          <Route path={ROUTE.TNC} element={<TncContainer />} exact />
          <Route path={ROUTE.REFUND} element={<RefundContainer />} exact />
          <Route path={ROUTE.PRIVACY} element={<PrivacyContainer />} exact />
          <Route path={ROUTE.UTSAH} element={<UmangContainer />} exact />

          <Route
            path={ROUTE.UTSAH_VOLUNTEER}
            element={
              <ProtectedRoute>
                {!!iCanSee.find((el) => el === "utsah") && (
                  <UmangVolunteerContainer />
                )}
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path={ROUTE.UTSAH_LIST}
            element={
              <ProtectedRoute>
                {!!iCanSee.find((el) => el === "utsah") && (
                  <UmangRegListContainer />
                )}
              </ProtectedRoute>
            }
            exact
          />

          <Route
            path={ROUTE.DYS}
            element={
              <ProtectedRoute>
                {!!iCanSee.find((el) => el === "dys") && (
                  <DysRegistrationForm />
                )}
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path={ROUTE.DYS_LIST_SESSIN}
            element={
              <ProtectedRoute>
                {!!iCanSee.find((el) => el === "dys") && (
                  <DysRegListContainer />
                )}
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path={ROUTE.DYS_LIST}
            element={
              <ProtectedRoute>
                {!!iCanSee.find((el) => el === "dys") && (
                  <DysRegListContainer />
                )}
              </ProtectedRoute>
            }
            exact
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
