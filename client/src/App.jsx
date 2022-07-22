import { EthProvider } from "./contexts/EthContext";
import NewsPublisher from "./Screens/NewsPublisher";
import Admin from "./Screens/Admin";
import Users from './Screens/Users';
import Footer from "./components/Footer";
import {Routes,Route} from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Admin/>}/>
            <Route path="/publisher" element={<NewsPublisher />} />
            <Route path="/user" element={<Users />} />
          </Routes>
          {/* <NewsPublisher /> */}
          {/* <hr /> */}
          {/* <Footer /> */}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
