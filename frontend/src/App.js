import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import LoginU from "./component/Login";
import Tambahdata from "./component/AddItem";
import Updatedata from "./component/EditItem";
import HomeLogin from "./component/Home";
// import NavbarPage from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="container-fluid">
      <div className="container text-center">
        <h1>Welcome to my React Web</h1>
        <br></br>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLogin />}></Route>
          <Route path="/home" element={<LoginU />} />
          <Route path="/addItems" element={<Tambahdata />} />
          <Route path="/editItem">
            <Route path=":id" element={<Updatedata />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
