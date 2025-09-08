import React from "react"

import Doughnut from "@/components/Charts/Doughnut"

const RentDoughnut = (props) => {
	var doughnutRent = [
		{
			label: " KES",
			data: [
				props.dashboard.rent?.paid,
				props.dashboard.rent?.percentage > 100 ? 0 : props.dashboard.rent?.due,
			],
			backgroundColor: ["rgba(40, 167, 69, 1)", "rgba(40, 167, 69, 0.5)"],
		},
	]

	// Custom plugin to draw the center text
	const rentText = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { heading, subHeading } = chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 1.5rem Inter, sans-serif"
			ctx.fillStyle = "rgba(40, 167, 69, 1)"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(heading, width / 2, height / 1.8)

			ctx.font = "500 1.125rem Inter, sans-serif"
			ctx.fillStyle = "#6B7280"
			ctx.fillText(subHeading, width / 2, height / 1.4)
			ctx.restore()
		},
	}

	const rentOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: true },
			tooltip: { enabled: true },
			centerText: {
				data: {
					heading: `${props.dashboard.rent?.percentage}%`,
					subHeading: ``,
				},
			},
		},
	}

	return (
		<div className="card shadow-sm me-2 mb-4">
			{props.dashboard.rent && (
				<Doughnut
					labels={["Paid Rent", "Due Rent"]}
					datasets={doughnutRent}
					cutout="60%"
					className="doughnutSize3"
					plugins={[rentText]}
					options={rentOptions}
					style={{ height: "100%", width: "100%" }}
				/>
			)}
			<div className="d-flex justify-content-center pb-3">
				<h6
					style={{ color: "rgba(24, 135, 84, 1)" }}
					className="fw-bold">
					Total: <small className="mx-1">KES</small>
					{props.dashboard.rent?.total}
				</h6>
			</div>
		</div>
	)
}

export default RentDoughnut
