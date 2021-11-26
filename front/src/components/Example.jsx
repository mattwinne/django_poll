import React, { useEffect } from "react"
import useQuestions from "components/Questions"
import useChoices from "components/Choices"

export default function Example() {
	useEffect(() => {
		fetch("/api/choices")
			.then((response) => response.json())
			.then((data) => console.log(data))
	}, [])
	const exp = useChoices()
	console.log(exp)
	return (
		<div>
			<h1>Cool app</h1>
		</div>
	)
}