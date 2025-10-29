import React from "react"

import PropertyDoughnut from "@/components/Dashboard/PropertyDoughnut"

const PropertyTabChart = () => {
	/*
	 * Graph Data
	 */

	var dashboardProperties = {
		total: 5,
		ids: [1, 2, 3, 4, 5],
		names: [
			"Kulas Alley",
			"Nathanial Trail",
			"Bechtelar Forge",
			"Kozey Oval",
			"Pouros Center",
		],
		units: [12, 11, 11, 12, 11],
	}

	return (
		<div className="card border-0 shadow-sm p-4">
			<div className="card border shadow-sm p-4">
				{/* Property Doughnut */}
				<PropertyDoughnut dashboardProperties={dashboardProperties} />
				{/* Property Doughnut End */}
			</div>
		</div>
	)
}

export default PropertyTabChart
