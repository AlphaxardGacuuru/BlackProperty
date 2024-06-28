import React from "react"

import Doughnut from "@/components/Charts/Doughnut"

const PropertyTabChart = () => {
	/*
	 * Graph Data
	 */

	var doughnutProperties = [
		{
			label: " Units",
			data: [5, 10, 15, 20, 10],
		},
	]
	return (
		<div className="card border-0 shadow p-4">
			<div className="card border-0 shadow">
				<center>
					<div className="middle1">
						<h1>4</h1>
					</div>
					<Doughnut
						labels={[
							"Tevody Apartments",
							"Rezona Heights",
							"Western Heights",
							"Alima Apartments",
							"Joska Apartments",
						]}
						datasets={doughnutProperties}
						cutout="50%"
						size="25em"
					/>
					<h6 className="mb-3">Total Units: 60</h6>
				</center>
			</div>
		</div>
	)
}

export default PropertyTabChart
