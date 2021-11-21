import React from "react";
import { Link } from 'react-router-dom';

const Results = () => {
    const question = ("What is the best metal band of all time?")
    const results = [
        {
            votes: 7,
            text: "Judas Priest",
        },
        { 
            votes:2,
            text: "Black Sabbath",
            isCompleted: true
        },
        {
            votes:1,
            text: "Iron Maiden",
            
        },
        {
            votes:4,
            text: "Pantera",
            
        }
    ]
    console.log(results.text);
    return (
       
 <div>
     <h1 style={{color: "blue", fontSize: "32px"}}>{question}</h1>
     {
          results.map(result => 
            <h1 style={{color: "black", fontSize: "16px"}}>{result.text} {result.votes} votes</h1>)
        }


{<h1 style={{color: "blue", fontSize: "16px"}}><Link to={'/index'}>Back to polls</Link></h1>}

 </div>


    )
};

export default Results;