import React from "react"

import Doughnut from "@/components/Charts/Doughnut"

const PropertyTabChart = () => {
	/*
	 * Graph Data
	 */

	var doughnutUnits = [
		{
			label: " ",
			data: [70, 30],
			backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(54, 162, 235, 0.5)"],
		},
	]

	return (
		<div className="card border-0 shadow p-4">
			<div className="card border-0 shadow text-center">
				{/* Tenancy This Month */}
				<h4 className="mt-2">Current Occupancy</h4>
				<div className="card border-0 text-center">
					<div className="middle2">
						<h1>
							70
							<small className="fs-1">%</small>
						</h1>
					</div>
					<center>
						<Doughnut
							labels={["Occupied Units", "Unoccupied Units"]}
							datasets={doughnutUnits}
						/>
						<div className="d-flex justify-content-center pb-3">
							<h6>Total: 40</h6>
						</div>
					</center>
				</div>
				{/* Tenancy This Month End */}
			</div>
		</div>
	)
}

export default PropertyTabChart
