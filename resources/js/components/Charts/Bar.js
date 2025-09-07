import React, { useEffect, useRef } from "react"

const Bar = (props) => {
	const ctx = useRef()

	/*
	 * Colors
	 */
	// "rgba(255, 99, 132, 1)", RED
	// "rgba(255, 159, 64, 1)", ORANGE
	// "rgba(255, 205, 86, 1)", YELLOW
	// "rgba(75, 192, 192, 1)", TEAL
	// "rgba(54, 162, 235, 1)", BLUE
	// "rgba(153, 102, 255, 1)", PURPLE
	// "rgba(201, 203, 207, 1)", GREY
	// "rgba(24, 135, 84, 1)", GREEN
	const colors = {
		background: [
			"rgba(40, 167, 69, 1)", // GREEN
			"rgba(40, 167, 69, 0.6)", // GREEN
			"rgba(54, 162, 235, 1)", // BLUE
			"rgba(54, 162, 235, 0.6)", // BLUE
			"rgba(255, 159, 64, 1)", // ORANGE
			"rgba(255, 159, 64, 0.6)", // ORANGE
			"rgba(255, 99, 132, 1)", // RED
			"rgba(255, 99, 132, 0.6)", // RED
			"rgba(255, 205, 86, 1)", // YELLOW
			"rgba(255, 205, 86, 0.6)", // YELLOW
			"rgba(75, 192, 192, 1)", // TEAL
			"rgba(75, 192, 192, 0.6)", // TEAL
			"rgba(153, 102, 255, 1)", // PURPLE
			"rgba(153, 102, 255, 0.6)", // PURPLE
			"rgba(201, 203, 207, 1)", // GREY
			"rgba(201, 203, 207, 0.6)", // GREY
		],
		border: [
			"rgba(24, 135, 84, 1)", // GREEN
			"rgba(40, 167, 69, 0.6)", // GREEN
			"rgba(54, 162, 235, 1)", // BLUE
			"rgba(54, 162, 235, 0.6)", // BLUE
			"rgba(255, 159, 64, 1)", // ORANGE
			"rgba(255, 159, 64, 0.6)", // ORANGE
			"rgba(255, 99, 132, 1)", // RED
			"rgba(255, 99, 132, 0.6)", // RED
			"rgba(255, 205, 86, 1)", // YELLOW
			"rgba(255, 205, 86, 0.6)", // YELLOW
			"rgba(75, 192, 192, 1)", // TEAL
			"rgba(75, 192, 192, 0.6)", // TEAL
			"rgba(153, 102, 255, 1)", // PURPLE
			"rgba(153, 102, 255, 0.6)", // PURPLE
			"rgba(201, 203, 207, 1)", // GREY
			"rgba(201, 203, 207, 0.6)", // GREY
		],
		hoverBackground: [
			"rgba(24, 135, 84, 0.8)", // GREEN
			"rgba(24, 135, 84, 0.4)", // GREEN
			"rgba(54, 162, 235, 0.8)", // BLUE
			"rgba(54, 162, 235, 0.4)", // BLUE
			"rgba(255, 159, 64, 0.8)", // ORANGE
			"rgba(255, 159, 64, 0.4)", // ORANGE
			"rgba(255, 99, 132, 0.8)", // RED
			"rgba(255, 99, 132, 0.4)", // RED
			"rgba(255, 205, 86, 0.8)", // YELLOW
			"rgba(255, 205, 86, 0.4)", // YELLOW
			"rgba(75, 192, 192, 0.8)", // TEAL
			"rgba(75, 192, 192, 0.4)", // TEAL
			"rgba(153, 102, 255, 0.8)", // PURPLE
			"rgba(153, 102, 255, 0.4)", // PURPLE
			"rgba(201, 203, 207, 0.8)", // GREY
			"rgba(201, 203, 207, 0.4)", // GREY
		],
		hoverBorder: [
			"rgba(24, 135, 84, 1)", // GREEN
			"rgba(40, 167, 69, 0.6)", // GREEN
			"rgba(54, 162, 235, 1)", // BLUE
			"rgba(54, 162, 235, 0.6)", // BLUE
			"rgba(255, 159, 64, 1)", // ORANGE
			"rgba(255, 159, 64, 0.6)", // ORANGE
			"rgba(255, 99, 132, 1)", // RED
			"rgba(255, 99, 132, 0.6)", // RED
			"rgba(255, 205, 86, 1)", // YELLOW
			"rgba(255, 205, 86, 0.6)", // YELLOW
			"rgba(75, 192, 192, 1)", // TEAL
			"rgba(75, 192, 192, 0.6)", // TEAL
			"rgba(153, 102, 255, 1)", // PURPLE
			"rgba(153, 102, 255, 0.6)", // PURPLE
			"rgba(201, 203, 207, 1)", // GREY
			"rgba(201, 203, 207, 0.6)", // GREY
		],
	}

	var delayed

	const config = {
		type: "bar",
		data: {
			labels: props.labels,
			datasets: props.datasets.map((dataset, index) => {
				return {
					...dataset,
					backgroundColor: colors.background[index % colors.background.length],
					// borderColor: colors.border[index % colors.border.length],
					borderWidth: dataset.borderWidth || 2,
					hoverBackgroundColor:
						colors.hoverBackground[index % colors.hoverBackground.length],
					// hoverBorderColor: colors.hoverBorder[index % colors.hoverBorder.length],
				}
			}),
		},
		options: {
			responsive: true,
			scales: {
				y: {
					beginAtZero: true,
				},
			},
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
		},
	}

	useEffect(() => {
		new Chart(ctx.current, config)
	}, [])

	return (
		<div
			className="p-2"
			style={{ width: "100%", height: "auto" }}>
			<canvas ref={ctx}></canvas>
		</div>
	)
}

export default Bar
