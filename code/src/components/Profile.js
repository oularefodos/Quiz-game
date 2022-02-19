import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import Miros from "../artifacts/contracts/Miros.sol/Miros.json";
import Game from "./game";
import ERROR from "./Error";
import NavContext from "./NavContext";

const Profile = () => {
    const [addr, setAddr] = useState();
    const [user, setUser] = useState([]);
    const [islogin, setIslogin] = useState(false)
    const context = useContext(NavContext)

    // get user
    const getUser = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = signer.getAddress();
        setAddr(addr);
        const contract = new ethers.Contract(context.MonAddr, Miros.abi, provider);
        const ret = contract.users(addr).then(user => setUser(user)).catch(err => console.log(err))
    }

    useEffect(() => {
        getUser();
        setIslogin(user.islogin);
    }, [user.islogin]);

    if (!islogin)
    {
        return (
            <>
                <ERROR/>
            </>
        )
    }
    else {
        return (
            <div className="section">
                <div className="username"> 
                    <h1> Bonjour <span> {user.username} </span> Bien Venu dans Game-Quiz</h1> 
                </div>
                <Game/>
            </div>
        )
    }
  }
  export default Profile;