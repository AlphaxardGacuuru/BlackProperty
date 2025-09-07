import React from 'react'

import Bar from "@/components/Charts/Bar"

const TenancyBar = (props) => {

	var barGraphTenants = [
		{
			label: " Tenants this month",
			data: props.dashboard.units?.tenantsThisYear?.data,
			backgroundColor: "rgba(54, 162, 235, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "50",
			stack: "Stack 0",
		},
		{
			label: " Vacancies this month",
			data: props.dashboard.units?.vacanciesThisYear?.data,
			backgroundColor: "rgba(54, 162, 235, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "50",
			stack: "Stack 0",
		},
	]

  return (
		<div
			className="card shadow-sm mb-4 rounded hidden-scroll"
			style={{ minHeight: "80%" }}>
			<h4 className="border-bottom p-2">Tenancy This Year</h4>
			{props.dashboard.units && (
				<Bar
					labels={props.dashboard.units?.tenantsThisYear.labels}
					datasets={barGraphTenants}
					style={{ height: "100%", width: "100%" }}
				/>
			)}
		</div>
	)
}

export default TenancyBar