import { GiHamburgerMenu } from "react-icons/gi"
import { useNavigate } from "react-router";
import { ImCross } from "react-icons/im"
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Miros from "../artifacts/contracts/Miros.sol/Miros.json";
import { ethers } from "ethers";
import NavContext from "./NavContext";


const Nav = () => {

    let h = 1;

    const history = useNavigate();
    const [open, setOpen] = useState("open");
    const [close, setClose] = useState("close");
    const [menu, setMenu] = useState("menu");
    const {islogin, setIslogin, MonAddr} = useContext(NavContext);

    // get contract 
    const [addr, setAddr] = useState();
    const [user, setUser] = useState([]);

    const getUser = () => {
        if (window.ethereum)
        {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const addr = signer.getAddress();
            setAddr(addr);
            const contract = new ethers.Contract(MonAddr, Miros.abi, provider);
            const ret = contract.users(addr).then(user => setUser(user)).catch(err => console.log(err));
        }
    }

    // LogOut 

    const logOut = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = signer.getAddress();
        setAddr(addr);
        const contract = new ethers.Contract(MonAddr, Miros.abi, signer);
        const ret = await contract.logout(addr);
        await ret.wait();
        setIslogin("false");
        localStorage.setItem("islogin", false);
        console.log(localStorage.islogin + "ok")
        history("/")
    }

    const Handle = () => {
        if (h === 0)
        {
            setOpen("close");
            setClose("open");
            setMenu("open-menu");
            h = 1;
        }
        else
        {
            setOpen("open");
            setClose("close");
            setMenu("menu");
            h = 0;
        }
    }

    useEffect(() => {
       Handle();
       getUser();
    }, [islogin]);

    if (islogin === "true")
    {
        return (
            <>
                <nav>
                    <div className = "logo"><h1 className="logo">MIROS</h1></div>
                    <button className="logOut" onClick={logOut}>Logout</button>
                </nav>
            </>
        )
    }
    else {
        return (
            <>
                <nav>
                    <div className = "logo"><h1 className="logo"  onClick={console.log(islogin)}>MIROS</h1></div>
                    <div className = "toggle">
                    <GiHamburgerMenu className={open} onClick={Handle}/>
                    <ImCross className={close} onClick = {Handle}/>
                    </div>
                    <ul className = {menu}>
                        <li>
                            <NavLink exact to="/" className="navlink" onClick={Handle}>HOME</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/contact" className="navlink" onClick={Handle}>WHO ARE WE?</NavLink>
                        </li>
                    </ul>
                </nav>
            </>
        )
    }
}

export default Nav;