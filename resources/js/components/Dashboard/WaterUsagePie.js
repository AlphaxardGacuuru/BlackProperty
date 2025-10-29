import React from 'react'

import Pie from "@/components/Charts/Pie"

const WaterUsagePie = (props) => {

	var pieWaterUsage = [
		{
			label: " KES",
			data: [
				props.dashboard.water?.usageTwoMonthsAgo,
				props.dashboard.water?.usageLastMonth,
			],
			backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
		},
	]

	const waterOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: true },
			tooltip: { enabled: true },
		},
	}

  return (
		<div
			className="card shadow-sm text-center me-2 mb-4"
			style={{ minHeight: "40%" }}>
			{props.dashboard.water && (
				<Pie
					labels={["Previous Water Usage", "Current Water Usage"]}
					datasets={pieWaterUsage}
					className="doughnutSize3"
					options={waterOptions}
					style={{ height: "100%", width: "100%" }}
				/>
			)}
			<div className="d-flex justify-content-center pb-3">
				<h6 className="fw-bold">
					Current Usage:
					<span className="mx-1">
						{props.dashboard.water?.usageLastMonth?.toLocaleString("en-US")}L
					</span>
				</h6>
			</div>
		</div>
	)
}

export default WaterUsagePie