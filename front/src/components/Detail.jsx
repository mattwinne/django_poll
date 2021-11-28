import React, {useState} from "react";
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

    const [radio, setRadio] = useState([])

    function updateVote() {
        let newData = {
            "id": parseInt(radio[0]),
            "votes":(parseInt(radio[2]) + 1)
        }

        fetch(`/api/choices/${radio[0]}/`, {
            method: 'PATCH',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(newData)
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
                window.location.replace(`/results/${pathID}`)
            })
    })
    
}



    return (
    <div> 

    {question.length > 0 ? (
            question.map((item) => (
                <li><h1 style={{color: "blue", fontSize: "18px"}}>{item.text}</h1>	</li>))
        ) : (
                <h2 style={{color: "black", fontSize: "10px"}}> ...loading questions</h2>
        )}

            {choices.length > 0 ? (choices.map((item) => (
                    <li style={{color: "black", fontSize: "16px"}}> 
                        <input 
                            type="radio" 
                            value={[item.id, item.votes]} 
                            name="choice"
                            //checked = {radio === ('item.id')}
                            onChange={(e)=>{setRadio(e.target.value)}} />
                        {item.text}</li>))
                ) : (
                    <h2 style={{color: "black", fontSize: "10px"}}> ...loading poll</h2>
                )}

        <br></br>
            <button className = "mybutton"
                type="button" 
                onClick={() => updateVote()}>
                    Vote
                                      
            </button>

    <br></br>

    <h1 style={{color: "blue", fontSize: "12px"}}><Link to={'/index'}>Back to polls</Link></h1>
    </div>

    
    )};

export default Detail;