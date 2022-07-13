import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.scss';
import ContactContainer from "./containers/ContactContainer";
import UmangContainer from "./containers/UmangContainer";
import AboutContainer from "./containers/AboutContainer";
import TncContainer from "./containers/TncContainer";
import PrivacyContainer from "./containers/PrivacyContainer";
import RefundContainer from "./containers/RefundContainer";
import UmangVolunteerContainer from "./containers/UmangVolunteerContainer";
import UmangRegListContainer from "./containers/UmangRegListContainer";
import { ROUTE } from "./constants";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={ROUTE.HOME} element={<UmangContainer />} exact/>
          <Route path={ROUTE.CONTACT_US} element={<ContactContainer />} exact/>
          <Route path={ROUTE.ABOUT} element={<AboutContainer />} exact/>
          <Route path={ROUTE.TNC} element={<TncContainer />} exact/>
          <Route path={ROUTE.REFUND} element={<RefundContainer />} exact/>
          <Route path={ROUTE.PRIVACY} element={<PrivacyContainer />} exact/>
          <Route path={ROUTE.UTSAH} element={<UmangContainer />} exact/>
          <Route path={ROUTE.UTSAH_VOLUNTEER} element={<UmangVolunteerContainer />} exact/>
          <Route path={ROUTE.UTSAH_LIST} element={<UmangRegListContainer />} exact/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
