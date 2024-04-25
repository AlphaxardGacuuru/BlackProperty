import React, { useEffect, useRef } from "react"

const Doughnut = (props) => {
	const ctx = useRef()

	const config = {
		type: "doughnut",
		options: { cutout: "90%", radius: "100%" },
		data: {
			labels: props.labels,
			datasets: props.datasets
		},
	}

	useEffect(() => {
		new Chart(ctx.current, config)
	}, [])

	return (
		<div
			className="p-2"
			style={{ width: "20em", height: "20em" }}>
			<canvas ref={ctx}></canvas>
		</div>
	)
}

export default Doughnut
