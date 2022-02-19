import Nav from "./components/Nav";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import Home from "./components/Home";
import NavContext from "./components/NavContext";
import Data from "./components/Data";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Footer from "./components/footer";
import { useState } from "react";
import Miros from "./artifacts/contracts/Miros.sol/Miros.json";
import ERROR from "./components/Error";

const App = () => {

  const MonAddr = "0xd68946b1F201A4f60f835638fF800ceEC89bE4f7";
  const [islogin, setIslogin] = useState(localStorage.getItem("islogin"));
  const context = {islogin, setIslogin, MonAddr};
  
  return (
    <>
     <NavContext.Provider value = {context}>
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route path="/" element= {<Home/>}> </Route>
            <Route path="/login" element = {<Data/>}> </Route>
            <Route path="/contact" element = {<Contact/>}>  </Route>
            <Route path="/profile" element = {<Profile/>}>  </Route>
            <Route path="*" element = {<ERROR/>}></Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </NavContext.Provider>
    </>
  )
}
export default App;
