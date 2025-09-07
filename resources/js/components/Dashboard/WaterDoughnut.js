import React from "react"

import Doughnut from "@/components/Charts/Doughnut"

const WaterDoughnut = (props) => {
	var doughnutWater = [
		{
			label: " KES",
			data: [
				props.dashboard.water?.paid,
				props.dashboard.water?.percentage > 100
					? 0
					: props.dashboard.water?.due,
			],
			backgroundColor: ["rgba(75, 192, 192, 1)", "rgba(75, 192, 192, 0.5)"],
		},
	]

	// Custom plugin to draw the center text
	const waterText = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { heading, subHeading } = chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 1.5rem Inter, sans-serif"
			ctx.fillStyle = "rgba(75, 192, 192, 1)"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(heading, width / 2, height / 1.8)

			ctx.font = "500 1.125rem Inter, sans-serif"
			ctx.fillStyle = "#6B7280"
			ctx.fillText(subHeading, width / 2, height / 1.4)
			ctx.restore()
		},
	}

	const waterOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: true },
			tooltip: { enabled: true },
			centerText: {
				data: {
					heading: `${props.dashboard.water?.percentage}%`,
					subHeading: ``,
				},
			},
		},
	}

	return (
		<div
			className="card shadow-sm text-center me-2 mb-4"
			style={{ minHeight: "40%" }}>
			{props.dashboard.water && (
				<Doughnut
					labels={["Paid Water Bill", "Due Water Bill"]}
					datasets={doughnutWater}
					cutout="60%"
					className="doughnutSize3"
					plugins={[waterText]}
					options={waterOptions}
					style={{ height: "100%", width: "100%" }}
				/>
			)}
			<div className="d-flex justify-content-center pb-3">
				<h6
					style={{ color: "rgba(75, 192, 192, 1)" }}
					className="fw-bold">
					Total:
					<small className="mx-1">KES</small>
					{props.dashboard.water?.total}
				</h6>
			</div>
		</div>
	)
}

export default WaterDoughnut
