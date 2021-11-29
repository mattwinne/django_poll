import React from "react";
import { Link } from 'react-router-dom';
import useQuestions from "components/Questions"
//Currently displays all questions in database. Not practical if there are a lot of questions. Need to update so
//that it displays the five latest polls.
const Index = () => {

	const questions = useQuestions()

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

export default Index;