import React, { useEffect, useState } from "react";

//Custom hook that returns all of the choices in the database as an array.
export default function useChoices() {
	const [choices, setChoices] = useState([])

	useEffect(() => {
		fetch("/api/choices/")
			.then((response) => response.json())
			.then((data) => {
				setChoices(data)
			})
	}, [])
	return choices
}
