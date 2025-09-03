import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"

import Bar from "@/components/Charts/Bar"
import Doughnut from "@/components/Charts/Doughnut"
import Pie from "@/components/Charts/Pie"

const index = (props) => {
	const [dashboard, setDashboard] = useState(props.getLocalStorage("dashboard"))
	const [dashboardProperties, setDashboardProperties] = useState(
		props.getLocalStorage("dashboardProperties")
	)
	const [staff, setStaff] = useState([])
	const [payments, setPayments] = useState([])

	useEffect(() => {
		// Set page
		props.setPage({ name: "Dashboard", path: ["/dashboard"] })

		if (props.auth.name == "Guest") {
			return
		}

		// Fetch Dashboard Properties
		Axios.get(
			`api/dashboard/properties/${
				props.auth.propertyIds?.length ? props.auth.propertyIds : [0]
			}`
		)
			.then((res) => {
				// Reset Data
				setDashboardProperties([])

				setDashboardProperties(res.data.data)
				props.setLocalStorage("dashboardProperties", res.data.data)
			})
			.catch(() => props.getErrors(["Failed to fetch Dashboard Properties"]))

		// Fetch Dashboard
		if (props.selectedPropertyId?.length > 0) {
			Axios.get(`api/dashboard/${props.selectedPropertyId}`)
				.then((res) => {
					// Reset Data
					setDashboard([])

					setDashboard(res.data.data)
					props.setLocalStorage("dashboard", res.data.data)
				})
				.catch(() => props.setErrors(["Failed to fetch Dashboard"]))

			// Fetch Payments
			props.getPaginated(
				`payments?propertyId=${props.selectedPropertyId}`,
				setPayments
			)

			// Fetch Staff
			props.getPaginated(
				`staff?propertyId=${props.selectedPropertyId}`,
				setStaff
			)
		}
	}, [props.selectedPropertyId])

	/*
	 * Graph Data
	 */

	var doughnutProperties = [
		{
			label: " Units",
			data: dashboardProperties.units,
		},
	]

	var barGraphTenants = [
		{
			label: " Tenants this month",
			data: dashboard.units?.tenantsThisYear?.data,
			backgroundColor: "rgba(54, 162, 235, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "50",
			stack: "Stack 0",
		},
		{
			label: " Vacancies this month",
			data: dashboard.units?.vacanciesThisYear?.data,
			backgroundColor: "rgba(54, 162, 235, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "50",
			stack: "Stack 0",
		},
	]

	var barGraphRent = [
		{
			label: " Paid Rent",
			data: dashboard.rent?.paidThisYear?.data,
			backgroundColor: "rgba(40, 167, 69, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 1",
		},
		{
			label: " Due Rent",
			data: dashboard.rent?.unpaidThisYear?.data,
			backgroundColor: "rgba(40, 167, 69, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 1",
		},
		{
			label: " Paid Water Bill",
			data: dashboard.water?.paidThisYear?.data,
			backgroundColor: "rgba(75, 192, 192, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 2",
		},
		{
			label: " Due Water Bill",
			data: dashboard.water?.unpaidThisYear?.data,
			backgroundColor: "rgba(75, 192, 192, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 2",
		},
		{
			label: " Paid Service Charge",
			data: dashboard.serviceCharge?.paidThisYear?.data,
			backgroundColor: "rgba(201, 203, 207, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 3",
		},
		{
			label: " Due Service Charge",
			data: dashboard.serviceCharge?.unpaidThisYear?.data,
			backgroundColor: "rgba(201, 203, 207, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "25",
			stack: "Stack 3",
		},
	]

	var doughnutUnits = [
		{
			label: " ",
			data: [dashboard.units?.totalOccupied, dashboard.units?.totalUnoccupied],
			backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(54, 162, 235, 0.5)"],
		},
	]

	var doughnutRent = [
		{
			label: " KES",
			data: [
				dashboard.rent?.paid,
				dashboard.rent?.percentage > 100 ? 0 : dashboard.rent?.due,
			],
			backgroundColor: ["rgba(40, 167, 69, 1)", "rgba(40, 167, 69, 0.5)"],
		},
	]

	var doughnutWater = [
		{
			label: " KES",
			data: [
				dashboard.water?.paid,
				dashboard.water?.percentage > 100 ? 0 : dashboard.water?.due,
			],
			backgroundColor: ["rgba(75, 192, 192, 1)", "rgba(75, 192, 192, 0.5)"],
		},
	]

	var doughnutServiceCharge = [
		{
			label: " KES",
			data: [
				dashboard.serviceCharge?.paid,
				dashboard.serviceCharge?.percentage > 100
					? 0
					: dashboard.serviceCharge?.due,
			],
			backgroundColor: ["rgba(201, 203, 207, 1)", "rgba(201, 203, 207, 0.5)"],
		},
	]

	var pieWaterUsage = [
		{
			label: " KES",
			data: [
				dashboard.water?.usageTwoMonthsAgo,
				dashboard.water?.usageLastMonth,
			],
			backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
		},
	]

	// Custom plugin to draw the center text
	const propertyText = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { heading, subHeading } = chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 3.5rem Inter, sans-serif"
			ctx.fillStyle = "#4B5563"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(heading, width / 2, height / 2 - 15)

			ctx.font = "500 1.125rem Inter, sans-serif"
			ctx.fillStyle = "#6B7280"
			ctx.fillText(subHeading, width / 2, height / 2 + 25)
			ctx.restore()
		},
	}

	const totalUnits = dashboardProperties.units?.reduce(
		(unitCount, acc) => unitCount + acc,
		0
	)

	const propertyOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			tooltip: { enabled: false },
			centerText: {
				data: {
					heading: dashboardProperties.total,
					subHeading: "properties",
				},
			},
		},
	}

	// Custom plugin to draw the center text
	const unitText = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { heading, subHeading } = chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 2.5rem Inter, sans-serif"
			ctx.fillStyle = "rgba(54, 162, 235, 1)"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(heading, width / 2, height / 1.9)

			ctx.font = "500 1.125rem Inter, sans-serif"
			ctx.fillStyle = "#6B7280"
			ctx.fillText(subHeading, width / 2, height / 1.4)
			ctx.restore()
		},
	}

	const unitOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: true },
			tooltip: { enabled: true },
			centerText: {
				data: {
					heading: `${dashboard.units?.percentage}%`,
					subHeading: `${totalUnits} ${totalUnits > 1 ? "units" : "unit"}`,
				},
			},
		},
	}

	// Custom plugin to draw the center text
	const rentText = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { heading, subHeading } = chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 2.5rem Inter, sans-serif"
			ctx.fillStyle = "rgba(24, 135, 84, 1)"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(heading, width / 2, height / 1.8)

			ctx.font = "500 1.125rem Inter, sans-serif"
			ctx.fillStyle = "#6B7280"
			ctx.fillText(subHeading, width / 2, height / 1.4)
			ctx.restore()
		},
	}

	const rentOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: true },
			tooltip: { enabled: true },
			centerText: {
				data: {
					heading: `${dashboard.rent?.percentage}%`,
					subHeading: ``,
				},
			},
		},
	}

	// Custom plugin to draw the center text
	const serviceChargeText = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { heading, subHeading } = chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 2.5rem Inter, sans-serif"
			ctx.fillStyle = "rgba(201, 203, 207, 1)"
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
					heading: `${dashboard.serviceCharge?.percentage}%`,
					subHeading: ``,
				},
			},
		},
	}

	// Custom plugin to draw the center text
	const waterText = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { heading, subHeading } = chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 2.5rem Inter, sans-serif"
			ctx.fillStyle = "rgba(75, 192, 192, 1)"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(heading, width / 2, height / 1.8)

			ctx.font = "500 1.125rem Inter, sans-serif"
			ctx.fillStyle = "#6B7280"
			ctx.fillText(subHeading, width / 2, height / 1.4)
			ctx.restore()
		},
	}

	const waterOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: true },
			tooltip: { enabled: true },
			centerText: {
				data: {
					heading: `${dashboard.water?.percentage}%`,
					subHeading: ``,
				},
			},
		},
	}

	return (
		<React.Fragment>
			{/*
			 * Tenancy
			 */}

			<div className="row">
				<div className="col-sm-2 pe-1">
					<h4 className="my-2">Properties</h4>
					{/* Property Doughnut */}
					<div className="card shadow-sm p-2 mb-2">
						<center>
							{/* <div className="middle1">
								<h1>{dashboardProperties.total}</h1>
							</div> */}
							{dashboardProperties.names && (
								<Doughnut
									labels={dashboardProperties.names}
									datasets={doughnutProperties}
									cutout="50%"
									className="doughnutSize1"
									plugins={[propertyText]}
									options={propertyOptions}
									style={{ height: "100%", width: "100%" }}
								/>
							)}
						</center>
					</div>
					{/* Property Doughnut End */}
					{/* Tenancy This Month */}
					<h4 className="my-2">Current Occupancy</h4>
					<div
						className="card shadow-sm p-2 mb-2"
						style={{ minHeight: "40%" }}>
						{/* <div className="middle2">
							<h1>
								{dashboard.units?.percentage}
								<small className="fs-1">%</small>
							</h1>
						</div> */}
						<center>
							{dashboard.units && (
								<Doughnut
									labels={["Occupied Units", "Unoccupied Units"]}
									datasets={doughnutUnits}
									className="doughnutSize2"
									plugins={[unitText]}
									options={unitOptions}
									style={{ height: "100%", width: "100%" }}
								/>
							)}
						</center>
					</div>
					{/* Tenancy This Month End */}
				</div>
				<div className="col-sm-10">
					{/* Tenancy This Year */}
					<h4 className="my-2">Tenancy This Year</h4>
					<div
						className="card shadow-sm mb-2 rounded hidden-scroll"
						style={{ minHeight: "80%" }}>
						{dashboard.units && (
							<Bar
								labels={dashboard.units?.tenantsThisYear.labels}
								datasets={barGraphTenants}
							/>
						)}
					</div>
					{/* Tenancy This Year End */}
				</div>
			</div>

			{/*
			 * Income
			 */}

			<div
				className="row"
				style={{ minHeight: "400px" }}>
				<div className="col-sm-8">
					<h4 className="my-2">Income This Year</h4>
					<div
						className="card shadow-sm hidden-scroll mb-5"
						style={{ minHeight: "80%" }}>
						{dashboard.rent && (
							<Bar
								labels={dashboard.rent?.paidThisYear.labels}
								datasets={barGraphRent}
								style={{ height: "100%", width: "100%" }}
							/>
						)}
					</div>
				</div>
				<div className="col-sm-2">
					<h4 className="my-2">Income this month</h4>
					{/* Rent Doughnut */}
					<div
						className="card shadow-sm text-center mb-2"
						style={{ minHeight: "40%" }}>
						{dashboard.rent && (
							<Doughnut
								labels={["Paid Rent", "Due Rent"]}
								datasets={doughnutRent}
								cutout="60%"
								className="doughnutSize3"
								plugins={[rentText]}
								options={rentOptions}
								style={{ height: "100%", width: "100%" }}
							/>
						)}
						<div className="d-flex justify-content-center pb-3">
							<h6>
								Total:
								<small className="mx-1">KES</small>
								{dashboard.rent?.total}
							</h6>
						</div>
					</div>
					{/* Rent Doughnut End */}
					{/* Water Doughnut */}
					<div
						className="card shadow-sm text-center mb-2"
						style={{ minHeight: "40%" }}>
						{/* <div className="middle3">
								<h2>
									{dashboard.water?.percentage}
									<small className="fs-6">%</small>
								</h2>
							</div> */}
						{dashboard.water && (
							<Doughnut
								labels={["Paid Water Bill", "Due Water Bill"]}
								datasets={doughnutWater}
								cutout="60%"
								className="doughnutSize3"
								plugins={[waterText]}
								options={waterOptions}
								style={{ height: "100%", width: "100%" }}
							/>
						)}
						<div className="d-flex justify-content-center pb-3">
							<h6>
								Total:
								<small className="mx-1">KES</small>
								{dashboard.water?.total}
							</h6>
						</div>
					</div>
					{/* Water Doughnut End */}
				</div>
				<div className="col-sm-2">
					<h4 className="invisible my-2 hidden">Income this month</h4>
					{/* Service Charge Doughnut */}
					<div
						className="card shadow-sm text-center mb-2"
						style={{ minHeight: "40%" }}>
						{/* <div className="middle3">
								<h2>
									{dashboard.serviceCharge?.percentage}
									<small className="fs-6">%</small>
								</h2>
							</div> */}
						{dashboard.serviceCharge && (
							<Doughnut
								labels={["Paid Service Charge", "Due Service Charge"]}
								datasets={doughnutServiceCharge}
								cutout="60%"
								className="doughnutSize3"
								plugins={[serviceChargeText]}
								options={serviceChargeOptions}
								style={{ height: "100%", width: "100%" }}
							/>
						)}
						<div className="d-flex justify-content-center pb-3">
							<h6>
								Total:
								<small className="mx-1">KES</small>
								{dashboard.serviceCharge?.total}
							</h6>
						</div>
					</div>
					{/* Service Charge Doughnut End */}
					{/* Water Usage Pie */}
					<div
						className="card shadow-sm text-center mb-5"
						style={{ minHeight: "40%" }}>
						{dashboard.water && (
							<Pie
								labels={["Previous Water Usage", "Current Water Usage"]}
								datasets={pieWaterUsage}
								className="doughnutSize3"
							/>
						)}
						<div className="d-flex justify-content-center pb-3">
							<h6>
								Current Usage:
								<span className="mx-1">{dashboard.water?.usageLastMonth}L</span>
							</h6>
						</div>
					</div>
					{/* Water Usage Pie End */}
				</div>
			</div>

			{/*
			 * Tables
			 */}

			<div className="row">
				<div className="col-sm-6">
					{/* Units Table */}
					<div className="table-responsive mb-5">
						<table className="table table-hover">
							<thead>
								<tr>
									<th colSpan="6">
										<h4>Units</h4>
									</th>
								</tr>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Rent</th>
									<th>Deposit</th>
									<th>Type</th>
									<th>Current Tenant</th>
								</tr>
								{dashboard.units?.list.slice(0, 10).map((unit, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{unit.name}</td>
										<td className="text-success">
											<small>KES</small> {unit.rent}
										</td>
										<td className="text-success">
											<small>KES</small> {unit.deposit}
										</td>
										<td className="text-capitalize">{unit.type}</td>
										<td>
											{unit.tenantId ? (
												<span className="bg-success-subtle p-1">
													{unit.tenantName}
												</span>
											) : (
												<span className="bg-warning-subtle p-1">Vacant</span>
											)}
										</td>
									</tr>
								))}
								<tr>
									<td colSpan="5"></td>
									<td className="text-end">
										<MyLink
											linkTo="/properties"
											text="view more"
										/>
									</td>
								</tr>
							</thead>
						</table>
						{/* Units Table End */}
					</div>
				</div>

				<div className="col-sm-6">
					{/* Recent Payments Table */}
					<div className="table-responsive mb-5">
						<table className="table table-hover">
							<thead>
								<tr>
									<th colSpan="5">
										<h4>Recent Payments</h4>
									</th>
								</tr>
								<tr>
									<th>#</th>
									<th>Tenant</th>
									<th>Unit</th>
									<th>Amount</th>
									<th>Paid On</th>
								</tr>
							</thead>
							<tbody>
								{payments.data?.slice(0, 10).map((payment, key) => (
									<tr key={key}>
										<td>{props.iterator(key, payments)}</td>
										<td>{payment.tenantName}</td>
										<td>{payment.unitName}</td>
										<td className="text-success">
											<small>KES</small> {payment.amount}
										</td>
										<td>{payment.paidOn}</td>
									</tr>
								))}
								<tr>
									<td colSpan="4"></td>
									<td className="text-end">
										<MyLink
											linkTo="/payments"
											text="view more"
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					{/* Recent Payments Table End */}
				</div>
			</div>

			<div className="row">
				<div className="col-sm-6">
					{/* Staff Table */}
					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th colSpan="5">
										<h4>Staff</h4>
									</th>
								</tr>
								<tr>
									<th>#</th>
									<th></th>
									<th>Name</th>
									<th>Phone</th>
									<th>Role</th>
								</tr>
							</thead>
							<tbody>
								{staff.data?.slice(0, 10).map((staffMember, key) => (
									<tr key={key}>
										<td>{props.iterator(key, staff)}</td>
										<td>
											<Img
												src={staffMember.avatar}
												className="rounded-circle"
												width="25px"
												height="25px"
												alt="Avatar"
											/>
										</td>
										<td>{staffMember.name}</td>
										<td>{staffMember.phone}</td>
										<td>
											{staffMember.roleNames?.map((role, key) => (
												<span key={key}>
													{key != 0 && <span className="mx-1">|</span>}
													{role}
												</span>
											))}
										</td>
									</tr>
								))}
								<tr>
									<td colSpan="4"></td>
									<td className="text-end">
										<MyLink
											linkTo="/properties"
											text="view more"
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					{/* Staff Table End */}
				</div>
			</div>
		</React.Fragment>
	)
}

export default index
