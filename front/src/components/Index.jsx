import React from "react";
import { Link } from 'react-router-dom';



const Index = () => {

    const latest_question_list = [
        "What is the best metal band of all time?",
        "What's up?",
        "Favorite TV show",
    ]
    return (
    <div>
        <h1 style={{color: "blue", fontSize: "32px"}}>
            Polls
        </h1>
        {
          latest_question_list.map(question => 
            <h1 style={{color: "black", fontSize: "16px"}}><Link to={'/detail'}>- {question}</Link></h1>)
        }
        
    </div>

    )
};


export default Index;