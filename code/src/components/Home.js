import { useNavigate } from "react-router";

const Home = () => {

  const history = useNavigate();


    return (
      <div className="sect">
      <button onClick={() => history("/login")}>START TO GAME</button>
      </div>
    )
  }
  
  export default Home;