## Quiz-game

Quiz game est une Dapp, cette dapp nous permet de jouer en répondant à des questions. elle utilise solidity (contrats intelligents) comme Back-end, React.js comme front-end et la librairie ethers.js qui nous permet de communiquer avec le contract intelligent.

* Npx hardhat node
* installer Metamask
* Mettre votre Private-keys dans hardhat.config.js
* Npx hardhat compile
* Npx  hardhat run scripts/run.js --network rinkeby 
* Npm start
Le contrat intelligent ressemble à Ceci.






pragma solidity ^0.8.4;







import "hardhat/console.sol";







contract Miros {







   //user structure
   ```solidity
   struct User {
       address addr;
       string username;
       string email;
       bool islogin;

   }
```






   // mapping for users


   mapping (address => User) public users;


   mapping (address => string) private password;







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


EXPLICATION DU CONTRAT
D’abord Définir la version de solidity.

pragma solidity ^0.8.4;

Vous remarquerez qu’en solidity pour créer une classe on utilise le mot < contract > Puis le nom de votre Contrat ici le nom de mon contrat est < Miros >.

Une classe ressemble à ceci en solidity

contract NomContrat {
	constructor () {

}
}

J’ai créé une structure pour enregistrer les informations de l'utilisateur.








   struct User {


       address addr;


       string username;


       string email;


       bool islogin;


   }



Puis un mapping pour enregistrer  l’ensemble des USERS et leurs PASSWORDS.
Pour comprendre le mapping cliquez sur ce lien: https://www.tutorialspoint.com/solidity/solidity_mappings.htm








mapping (address => User) public users;


mapping (address => string) private passwrd;




Création de la fonction D’inscription cette fonction a des paramètres suivants:  
nom d'utilisateur, email, le password et l'adresse MétaMask de utilisateur.

function signUp(string memory _username, string memory _email, string memory _passwrd, address _addr) public returns (bool)

On a une fonction require dans la fonction SignUp qui permet de vérifier si le User n'était pas déjà enregistré.
comprendre require: https://www.ajaypalcheema.com/require-in-solidity/#:~:text=The%20require%20Solidity%20function%20guarantees,from%20calls%20to%20external%20contracts.

require (users[_addr].addr != msg.sender);

msg.sender: c’est l'adresse metamask de celui qui appelle la fonction.
S' il n'était pas déjà enregistré, il va l'enregistrer dans la structure sinon il sera pas enregistré.







users[_addr].addr = _addr;


users[_addr].username = _username;


users[_addr].email = _email;


passwrd[_addr] = _passwrd;


users[_addr].islogin = false;


return (true);





La seconde fonction est la fonction de connexion qui est: 


function login(address _addr, string memory _passwrd) public returns(bool) {




       if (keccak256(abi.encodePacked(passwrd[_addr])) == keccak256(abi.encodePacked(_passwrd)))


       {


           users[_addr].islogin = true;


           return true;


       }


       else


           return false;


   }

Vous remarquez qu’on a une fonction Keccak256 c’est une fonction de hachage à 256 bits.
savoir plus sur la fonction abi.encodePacked https://docs.soliditylang.org/en/develop/abi-spec.html;

La dernière fonction est la fonction de Déconnexion


function logout(address _addr) public {




if (users[_addr].islogin == true)


{


users[_addr].islogin = false;


}


}
