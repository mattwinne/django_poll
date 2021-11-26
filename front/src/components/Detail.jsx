import React from "react";
import { Link,
        useLocation
} from 'react-router-dom';
import useQuestions from "components/Questions"
import useChoices from "components/Choices"

const Detail = () => {
    const location = useLocation()
    const pathID = location.pathname.slice(-1);
    const question = useQuestions().filter((q)=>{
        return q.id == pathID
    });
    const choices = useChoices().filter((c)=>{
        return c.question == pathID
    });


    return (
    <div> 
     
    <h1 style={{color: "blue", fontSize: "32px"}}>Polls</h1>

    {question.length > 0 ? (
            question.map((item) => (
                <li><h1 style={{color: "black", fontSize: "18px"}}>{item.text}</h1>	</li>))
        ) : (
                <h2 style={{color: "black", fontSize: "10px"}}> ...loading questions</h2>
        )}
    <form>
    {choices.length > 0 ? (
            choices.map((item) => (
                <h1 style={{color: "black", fontSize: "14px"}}> 
                <input type="radio" value={item.text} name="choice" />{item.text}</h1>))
        ) : (
                <h2 style={{color: "black", fontSize: "10px"}}> ...loading poll</h2>
        )}

        
    <Link to="/results">
            <button type="submit">Vote</button>
    </Link>
    </form>
    <br></br>

    <h1 style={{color: "blue", fontSize: "12px"}}><Link to={'/index'}>Back to polls</Link></h1>

    </div>
            )
    
        



};

export default Detail;