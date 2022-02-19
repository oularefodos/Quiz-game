import Web3 from "web3/dist/web3.min.js";
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react"
import NavContext from "./NavContext";
import { ToastContainer, toast } from 'react-toastify';
import Miros from "../artifacts/contracts/Miros.sol/Miros.json"

const Data = () => {

  // Miros addr 
  const history = useNavigate();


// les parametres de la fonction signup et login du contract

    const [addr, setAddr] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpass, setCpass] = useState("");
    const [pathAut, setPathAuth] = useState(0);
    const {islogin, setIslogin, MonAddr} = useContext(NavContext);

// Connexion metamask

    const CheckMeta = async () => {
      if (window.ethereum)
      {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setAddr(addr);
      }
      else
        alert("veillez-connecter votre compte metamask");
  }

// la fonction signUp 

const ft_SignUp = async () => {
  CheckMeta();
  if (email === "" || password === "" || Cpass === "" || name === "")
    displayNoti("tout les champs sont obligatoire", 1);
  else if (password !== Cpass)
  {
    setPassword("");
    setCpass("")
    displayNoti("mot de pass non identique", 1)
  }
  else if (password.length < 8)
  {
    setPassword("");
    setCpass("")
    displayNoti("bad password", 1)
  }
  else {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(MonAddr, Miros.abi, signer);
    const ret = await contract.signUp(name, email, password, addr)
    await ret.wait();
    setCpass("");
    setPassword("");
    setEmail("");
    setName("")
  }
}

const displayNoti = (e, n) => {
  if (n === 1)
  {
    toast.error(e , {
      position: "top-right",
      autoClose: 5000,
    });
  }
  else {
    toast.success(e, {
      position: "top-right",
      autoClose: 5000,
  });
  }
}

// longin 

const ft_Login = async () => {
  CheckMeta();
  if (password === "" || Cpass === "")
      displayNoti("tout les champs sont obligatoire", 1);
  else if (password !== Cpass)
  {
      setPassword("");
      setCpass("")
      displayNoti("mot de pass non identique", 1)
  }
  else if (password.length < 8)
  {
    setPassword("");
    setCpass("")
    displayNoti("mot de pass doit etre superieur a 8", 1)
  }
  else {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(MonAddr, Miros.abi, signer);
    const ret = await contract.login(addr, password);
    await ret.wait();
    contract.users(addr).then(user => {
      console.log(user)
      if (user.islogin)
      {
        setIslogin("true");
        localStorage.setItem("islogin", true);
        history("/profile")
      }
      else
        displayNoti("bad password", 1)
    })
    .catch (err => console.error(err));
    setCpass("");
    setPassword("");
    setEmail("");
    setName("")
  }
}

// redirection signUp et Login
  const HandleAuth = () => {
    if (pathAut)
      setPathAuth(0);
    else
      setPathAuth(1);
  }

  if (!pathAut) {

    return (
      <div className="auth">
        <ToastContainer/>
        <form>
          <label>Username</label> <br/>
          <input value = {name} onChange={(e)=> setName(e.target.value)}></input> <br/>
          <label>Email</label> <br/>
          <input value = {email} onChange={(e)=> setEmail(e.target.value)}></input><br/>
          <label>Password</label> <br/>
          <input type="password" value = {password} onChange={(e)=> setPassword(e.target.value)}></input><br/>
          <label>Confirme Password</label> <br/>
          <input type = "password" value = {Cpass} onChange={(e)=> setCpass(e.target.value)}></input><br/>
        </form>
        <button onClick={ft_SignUp}> SignUp </button><br/>
          <p onClick={HandleAuth}>J'ai dejà un compte</p>
      </div>
    )
  }
  else {
    return (
      <div className="auth">
        <ToastContainer/>
        <form >
          <label>Password</label> <br/>
          <input type="password" value = {password} onChange={(e)=> setPassword(e.target.value)}></input><br/>
          <label>Confirme Password</label> <br/>
          <input type="password" value = {Cpass} onChange={(e)=> setCpass(e.target.value)}></input><br/>
        </form>
        <button onClick={ft_Login}> Login </button><br/>
        <p onClick={HandleAuth}>J'ai pas de compte</p>
      </div>
  )
  }
}
export default Data;