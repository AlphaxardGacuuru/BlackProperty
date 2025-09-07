import React from "react"

import Doughnut from "@/components/Charts/Doughnut"

const PropertyDoughnut = (props) => {
	var doughnutProperties = [
		{
			label: " Units",
			data: props.dashboardProperties.units,
		},
	]

	// Custom plugin to draw the center text
	const propertyText = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { heading, subHeading } = chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 2.5rem Inter, sans-serif"
			ctx.fillStyle = "#4B5563"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(heading, width / 2, height / 2)

			// ctx.font = "500 1.125rem Inter, sans-serif"
			// ctx.fillStyle = "#6B7280"
			// ctx.fillText(subHeading, width / 2, height / 2 + 25)
			// ctx.restore()
		},
	}

	const propertyOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			tooltip: { enabled: true },
			centerText: {
				data: {
					heading: props.dashboardProperties.total,
					subHeading: "properties",
				},
			},
		},
	}

	return (
		<div className="card shadow-sm p-2 me-2 mb-4">
			<center>
				{props.dashboardProperties.names && (
					<Doughnut
						labels={props.dashboardProperties.names}
						datasets={doughnutProperties}
						cutout="50%"
						className="doughnutSize1"
						plugins={[propertyText]}
						options={propertyOptions}
						style={{ height: "100%", width: "100%" }}
					/>
				)}
				<div className="d-flex justify-content-center align-items-center pb-1">
					{/* Properties Start */}
					<h6 className="fw-bold">
						Total Properties: {props.dashboardProperties?.total}
					</h6>
					{/* Properties End */}
					<h6 className="fs-2 mx-1">|</h6>
					{/* Units Start */}
					<h6 className="fw-bold">
						Total Units:{" "}
						{props.dashboardProperties.units?.reduce(
							(unitCount, acc) => unitCount + acc,
							0
						)}
					</h6>
					{/* Units End */}
				</div>
			</center>
		</div>
	)
}

export default PropertyDoughnut
