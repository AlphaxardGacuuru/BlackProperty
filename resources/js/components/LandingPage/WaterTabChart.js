import React from "react"

import Pie from "@/components/Charts/Pie"

const PropertyTabChart = () => {
	/*
	 * Graph Data
	 */

	var pieWaterUsage = [
		{
			label: " KES",
			data: [2000, 3000],
			backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
		},
	]

	return (
		<div className="card border-0 shadow p-4">
			<div className="card border-0 shadow text-center">
				{/* Water Usage Pie */}
				<div className="card border-0 text-center me-2 mb-2">
					<center>
						<Pie
							labels={["Previous Water Usage", "Current Water Usage"]}
							datasets={pieWaterUsage}
						/>
						<div className="d-flex justify-content-center pb-3">
							<h6>
								Current Usage:
								<span className="mx-1">3000L</span>
							</h6>
						</div>
					</center>
				</div>
				{/* Water Usage Pie End */}
			</div>
		</div>
	)
}

export default PropertyTabChart
