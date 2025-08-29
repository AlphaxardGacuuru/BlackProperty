import React, { useEffect, useRef } from "react"

const Doughnut = (props) => {
	const ctx = useRef()

	var delayed

	const config = {
		type: "doughnut",
		options: {
			cutout: props.cutout,
			radius: "100%",
			animation: {
				onComplete: () => {
					delayed = true
				},
				delay: (context) => {
					let delay = 0
					if (
						context.type === "data" &&
						context.mode === "default" &&
						!delayed
					) {
						delay = context.dataIndex * 300 + context.datasetIndex * 100
					}
					return delay
				},
			},
			...props.options,
		},
		data: {
			labels: props.labels,
			datasets: props.datasets,
		},
		plugins: props.plugins,
	}

	useEffect(() => {
		new Chart(ctx.current, config)
	}, [])

	return (
		<div className="p-2">
			<canvas ref={ctx}></canvas>
		</div>
	)
}

Doughnut.defaultProps = {
	cutout: "60%",
	size: "1em",
}

export default Doughnut
