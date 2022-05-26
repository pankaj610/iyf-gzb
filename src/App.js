import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.scss';
import ContactContainer from "./containers/ContactContainer";
import UmangContainer from "./containers/UmangContainer";
import AboutContainer from "./containers/AboutContainer";
import TncContainer from "./containers/TncContainer";
import PrivacyContainer from "./containers/PrivacyContainer";
import RefundContainer from "./containers/RefundContainer";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UmangContainer />} exact/>
          <Route path="/contact-us" element={<ContactContainer />} exact/>
          <Route path="/about" element={<AboutContainer />} exact/>
          <Route path="/tnc" element={<TncContainer />} exact/>
          <Route path="/refund" element={<RefundContainer />} exact/>
          <Route path="/privacy" element={<PrivacyContainer />} exact/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
