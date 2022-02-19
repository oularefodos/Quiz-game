import React from "react";

export default React.createContext({
    islogin: localStorage.islogin,
    setIslogin: (name) => {},
    addr: ""
});