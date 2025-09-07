import React from 'react'

import Doughnut from "@/components/Charts/Doughnut"

const ServiceChargeDoughnut = (props) => {
	var doughnutServiceCharge = [
		{
			label: " KES",
			data: [
				props.dashboard.serviceCharge?.paid,
				props.dashboard.serviceCharge?.percentage > 100
					? 0
					: props.dashboard.serviceCharge?.due,
			],
			backgroundColor: ["rgba(255, 159, 64, 1)", "rgba(255, 159, 64, 0.5)"],
		},
	]

	// Custom plugin to draw the center text
	const serviceChargeText = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { heading, subHeading } = chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 1.5rem Inter, sans-serif"
			ctx.fillStyle = "rgba(255, 159, 64, 1)"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(heading, width / 2, height / 1.8)

			ctx.font = "500 1.125rem Inter, sans-serif"
			ctx.fillStyle = "#6B7280"
			ctx.fillText(subHeading, width / 2, height / 1.4)
			ctx.restore()
		},
	}

	const serviceChargeOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: true },
			tooltip: { enabled: true },
			centerText: {
				data: {
					heading: `${props.dashboard.serviceCharge?.percentage}%`,
					subHeading: ``,
				},
			},
		},
	}

	return (
		<div
			className="card shadow-sm text-center me-2 mb-4"
			style={{ minHeight: "40%" }}>
			{/* <div className="middle3">
								<h2>
									{props.dashboard.serviceCharge?.percentage}
									<small className="fs-6">%</small>
								</h2>
							</div> */}
			{props.dashboard.serviceCharge && (
				<Doughnut
					labels={["Paid Service", "Due Service"]}
					datasets={doughnutServiceCharge}
					cutout="60%"
					className="doughnutSize3"
					plugins={[serviceChargeText]}
					options={serviceChargeOptions}
					style={{ height: "100%", width: "100%" }}
				/>
			)}
			<div className="d-flex justify-content-center pb-3">
				<h6
					style={{ color: "rgba(255, 159, 64, 1)" }}
					className="fw-bold">
					Total:
					<small className="mx-1">KES</small>
					{props.dashboard.serviceCharge?.total}
				</h6>
			</div>
		</div>
	)
}

export default ServiceChargeDoughnut