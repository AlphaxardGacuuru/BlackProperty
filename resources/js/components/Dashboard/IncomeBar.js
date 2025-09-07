import React from "react"

import Bar from "@/components/Charts/Bar"

const IncomeBar = (props) => {

	var barGraphRent = [
		{
			label: " Paid Rent",
			data: props.dashboard.rent?.paidThisYear?.data,
			backgroundColor: "rgba(40, 167, 69, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 1",
		},
		{
			label: " Due Rent",
			data: props.dashboard.rent?.unpaidThisYear?.data,
			backgroundColor: "rgba(40, 167, 69, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 1",
		},
		{
			label: " Paid Water Bill",
			data: props.dashboard.water?.paidThisYear?.data,
			backgroundColor: "rgba(75, 192, 192, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 2",
		},
		{
			label: " Due Water Bill",
			data: props.dashboard.water?.unpaidThisYear?.data,
			backgroundColor: "rgba(75, 192, 192, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 2",
		},
		{
			label: " Paid Service Charge",
			data: props.dashboard.serviceCharge?.paidThisYear?.data,
			backgroundColor: "rgba(201, 203, 207, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 3",
		},
		{
			label: " Due Service Charge",
			data: props.dashboard.serviceCharge?.unpaidThisYear?.data,
			backgroundColor: "rgba(201, 203, 207, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 3",
		},
	]

	return (
		<div
			className="card shadow-sm mb-4 rounded hidden-scroll"
			style={{ minHeight: "80%" }}>
			<h4 className="border-bottom p-2">Income This Year</h4>
			{props.dashboard.rent && (
				<Bar
					labels={props.dashboard.rent?.paidThisYear.labels}
					datasets={barGraphRent}
					style={{ height: "100%", width: "100%" }}
				/>
			)}
		</div>
	)
}

export default IncomeBar