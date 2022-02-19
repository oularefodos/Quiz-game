//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Miros {

    //user structure
    struct User {
        address addr;
        string username;
        string email;
        bool islogin;
    }

    // mapping for users
    mapping (address => User) public users;
    mapping (address => string) private passwrd;

    //signup function
    function signUp(string memory _username, string memory _email, string memory _passwrd, address _addr) public returns (bool) {
        require (users[_addr].addr != msg.sender);
        users[_addr].addr = _addr;
        users[_addr].username = _username;
        users[_addr].email = _email;
        passwrd[_addr] = _passwrd;
        users[_addr].islogin = false;
        return (true);
    }

    //login function
    function login(address _addr, string memory _passwrd) public returns(bool) {
        if (keccak256(abi.encodePacked(passwrd[_addr])) == keccak256(abi.encodePacked(_passwrd)))
        {
            users[_addr].islogin = true;
            return true;
        }
        else
            return false;
    }

    //logout
    function logout(address _addr) public {
        if (users[_addr].islogin == true)
        {
            users[_addr].islogin = false;
        }
    }
}
