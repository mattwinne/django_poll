import React, { useEffect, useState } from "react";

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
