import React, { useEffect, useState } from "react";


//Custom hook that returns all of the questions in the database as an array.
export default function useQuestions() {
	const [questions, setQuestions] = useState([])

	useEffect(() => {
		fetch("/api/questions/")
			.then((response) => response.json())
			.then((data) => {
				setQuestions(data)
			})
	}, [])

	return questions
}
