import React from "react";
import { Link } from 'react-router-dom';
import useQuestions from "components/Questions"

const Index = () => {

	const questions = useQuestions() // new

	return (
		<div>
			 <h1 style={{color: "blue", fontSize: "32px"}}>Polls</h1>
			{questions.length > 0 ? (
				questions.map((item) => (
					<li>
						<h1 style={{color: "black", fontSize: "16px"}}><Link to={'/detail/'+ item.id}>-{item.id}: {item.text}</Link></h1>
            <h2 style={{color: "black", fontSize: "10px"}}>Published: {item.pubDate}</h2>
					</li>
				))
			) : (
        <h2 style={{color: "black", fontSize: "10px"}}> ...loading questions</h2>
			)}
		</div>
    )
};

        {/* {
          indexData.map(question => 
            <h1 style={{color: "black", fontSize: "16px"}}><Link to={'/detail'}>- {question}</Link></h1>)
        } */}
export default Index;