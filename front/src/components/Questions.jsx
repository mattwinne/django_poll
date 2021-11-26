import React, { useEffect, useState } from "react";

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
