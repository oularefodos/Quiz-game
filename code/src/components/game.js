import Quiz from "./quiz";
import { useState, useEffect } from "react";
import Data from "./Data";
import { GiLevelCrossing } from "react-icons/gi";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Game = () => {

    const [data, setdata] = useState(Quiz.debutant);
    const [num, setnum] = useState(0);
    const [level, setLevel] = useState("Debutant");
    const [vie, setVie] = useState(5)

    const checkLocalVar = () => {
        if (localStorage.num != undefined)
            setnum(JSON.parse(localStorage.num))
        if (localStorage.vie != undefined)
            setVie(JSON.parse(localStorage.vie))
    }

    useEffect (() => {
        checkLocalVar();
    }, [])

    const ChangeNum = (rep) => {
        if (rep === data[num].answer)
        {
            if (num != 9)
            {
                setnum(num + 1);
                localStorage.setItem("num", num + 1);
            }
            else if (num === 9)
            {
                    setnum(0);
                    if (level === "Debutant")
                    {
                        setLevel("Confirmé");
                        setdata(Quiz.confirme);
                    }
                    else if (level === "Confirmé")
                    {
                        setLevel("Expert");
                        setdata(Quiz.expert);
                    }
                    else
                        setnum(-1)
            }
            toast.success("Bravo! bonne reponse.", {
                position: "top-right",
                autoClose: 5000,
            });
        }
        else 
        {
            let n = vie - 1;
            console.log(n)
            setVie(n);
            localStorage.setItem("vie", n);
            if (n <= 0)
            {
                setVie(5)
                setnum(0)
                localStorage.setItem("num", 0);
                localStorage.setItem("vie", 5);
            }
            toast.error(`Mauvaise Reponse, votre vie est ${n}`, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }
    
    if (num >= 0)
    {
        return (
    
        <div>
            <ToastContainer/>
            <p className="level" >QUESTION: {num + 1} du NIVEAU: {level}</p>
            <div className = "question">
                <p> {data[num].question} </p>
            </div>
            <div className="option" > { data[num].options.map( rep => { 
                return (<p onClick={()=> ChangeNum(rep)} >{rep}</p>)})} 
            </div>
        </div> 
        )
    }
    else {
            return (
                <div className="succes"> <p> SUCCES </p></div>
            )
        }
}

export default Game;