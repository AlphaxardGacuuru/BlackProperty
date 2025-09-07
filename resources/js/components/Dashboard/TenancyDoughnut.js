import React from "react"

import Doughnut from "@/components/Charts/Doughnut"

const TenancyDoughnut = (props) => {
	var doughnutUnits = [
		{
			label: " ",
			data: [
				props.dashboard.units?.totalOccupied,
				props.dashboard.units?.totalUnoccupied,
			],
			backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(54, 162, 235, 0.5)"],
		},
	]

	// Custom plugin to draw the center text
	const unitText = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { heading, subHeading } = chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 1.5rem Inter, sans-serif"
			ctx.fillStyle = "rgba(54, 162, 235, 1)"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(heading, width / 2, height / 1.8)
		},
	}

	const totalUnits = props.dashboardProperties.units?.reduce(
		(unitCount, acc) => unitCount + acc,
		0
	)

	const unitOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: true },
			tooltip: { enabled: true },
			centerText: {
				data: {
					heading: `${props.dashboard.units?.percentage}%`,
					subHeading: `${totalUnits} ${totalUnits > 1 ? "units" : "unit"}`,
				},
			},
		},
	}

	return (
		<div className="card shadow-sm me-2 mb-4">
			{props.dashboard.units && (
				<Doughnut
					labels={["Occupied Units", "Unoccupied Units"]}
					datasets={doughnutUnits}
					className="doughnutSize2"
					plugins={[unitText]}
					options={unitOptions}
					style={{ height: "100%", width: "100%" }}
				/>
			)}
			<div className="d-flex justify-content-center align-items-center pb-2">
				{/* Occupied Start */}
				<h6 className="fw-bold text-primary">
					Occupied: {props.dashboard.units?.totalOccupied}
				</h6>
				{/* Occupied End */}
				<h6 className="text-primary fs-2 mx-1">|</h6>
				{/* Unoccupied Start */}
				<h6 className="fw-bold text-primary">
					Unoccupied: {props.dashboard.units?.totalUnoccupied}
				</h6>
				{/* Unoccupied End */}
			</div>
		</div>
	)
}

export default TenancyDoughnut
