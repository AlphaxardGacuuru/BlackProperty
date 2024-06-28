import React from "react"

import Doughnut from "@/components/Charts/Doughnut"

const PropertyTabChart = () => {
	/*
	 * Graph Data
	 */

	var doughnutRent = [
		{
			label: " KES",
			data: [220000, 0],
			backgroundColor: ["rgba(40, 167, 69, 1)", "rgba(40, 167, 69, 0.5)"],
		},
	]

	var doughnutWater = [
		{
			label: " KES",
			data: [9000, 1000],
			backgroundColor: ["rgba(75, 192, 192, 1)", "rgba(75, 192, 192, 0.5)"],
		},
	]

	var doughnutServiceCharge = [
		{
			label: " KES",
			data: [16000, 4000],
			backgroundColor: ["rgba(201, 203, 207, 1)", "rgba(201, 203, 207, 0.5)"],
		},
	]

	return (
		<div className="card border-0 shadow text-center p-4">
			<h4 className="my-3">Income this month</h4>
			<div className="d-flex justify-content-between flex-wrap">
				<div className="card border-0 shadow text-center me-2 mb-2">
					<div className="middle3">
						<h2>
							100
							<small className="fs-6">%</small>
						</h2>
					</div>
					<Doughnut
						labels={["Paid Rent", "Due Rent"]}
						datasets={doughnutRent}
						cutout="60%"
						size="12.5em"
					/>
					<div className="d-flex justify-content-center pb-3">
						<h6>
							Total:
							<small className="mx-1">KES</small>
							220,000
						</h6>
					</div>
				</div>
				<div className="card border-0 shadow text-center me-2 mb-2">
					<div className="middle3">
						<h2>
							90
							<small className="fs-6">%</small>
						</h2>
					</div>
					<Doughnut
						labels={["Paid Water Bill", "Due Water Bill"]}
						datasets={doughnutWater}
						cutout="60%"
						size="12.5em"
					/>
					<div className="d-flex justify-content-center pb-3">
						<h6>
							Total:
							<small className="mx-1">KES</small>
							90,000
						</h6>
					</div>
				</div>
				<div className="card border-0 shadow text-center me-2 mb-2">
					<div className="middle3">
						<h2>
							80
							<small className="fs-6">%</small>
						</h2>
					</div>
					<Doughnut
						labels={["Paid Service Charge", "Due Service Charge"]}
						datasets={doughnutServiceCharge}
						cutout="60%"
						size="12.5em"
					/>
					<div className="d-flex justify-content-center pb-3">
						<h6>
							Total:
							<small className="mx-1">KES</small>
							20,000
						</h6>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PropertyTabChart
