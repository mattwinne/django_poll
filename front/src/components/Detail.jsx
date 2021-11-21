import React from "react";
import { Link } from 'react-router-dom';

const Detail = () => {
    const question = ("What is the best metal band of all time?")
    const choices = ["Judas Priest", "Black Sabbath", "Iron Maiden", "Pantera"]

    return (
    <div> 
        <h1 style={{color: "blue", fontSize: "32px"}}>{question}</h1>
        {
        
        choices.map(choice =>
            <h1 style={{color: "black", fontSize: "16px"}}> <input type="radio" value={choice} name="gender" />{choice}</h1>
                   )
        }

        <Link to="/results">
            <button type="button">
                Vote
            </button>
        </Link>
<br></br>
<h1 style={{color: "blue", fontSize: "16px"}}><Link to={'/index'}>Back to polls</Link></h1>


    </div>
            )
    
        



};

export default Detail;