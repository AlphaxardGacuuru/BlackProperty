import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"

import Bar from "@/components/Charts/Bar"
import Doughnut from "@/components/Charts/Doughnut"

const index = (props) => {
	const [propertyId, setPropertyId] = useState(props.auth.propertyIds)

	const [dashboard, setDashboard] = useState(props.getLocalStorage("dashboard"))
	const [dashboardProperties, setDashboardProperties] = useState(
		props.getLocalStorage("dashboardProperties")
	)
	const [staff, setStaff] = useState([])
	const [payments, setPayments] = useState([])

	useEffect(() => {
		if (!dashboard.units) {
			setDashboard([])
			setDashboardProperties([])
		}

		// Set page
		props.setPage({ name: "Dashboard", path: ["/dashboard"] })
		// Fetch Dashboard
		props.get(`dashboard/${propertyId}`, setDashboard, "dashboard")
		// Fetch Dashboard Properties
		props.get(
			`dashboard/properties/${props.auth.propertyIds}`,
			setDashboardProperties,
			"dashboardProperties"
		)
		// Fetch Payments
		props.getPaginated(`payments/by-property-id/${propertyId}`, setPayments)
		// Fetch Staff
		props.getPaginated(`staff/by-property-id/${propertyId}`, setStaff)
	}, [propertyId])

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
			barThickness: "30",
			stack: "Stack 1",
		},
		{
			label: " Due Rent",
			data: dashboard.rent?.unpaidThisYear?.data,
			backgroundColor: "rgba(40, 167, 69, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
			stack: "Stack 1",
		},
		{
			label: " Paid Water Bill",
			data: dashboard.water?.paidThisYear?.data,
			backgroundColor: "rgba(75, 192, 192, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
			stack: "Stack 2",
		},
		{
			label: " Due Water Bill",
			data: dashboard.water?.unpaidThisYear?.data,
			backgroundColor: "rgba(75, 192, 192, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
			stack: "Stack 2",
		},
		{
			label: " Paid Service Charge",
			data: dashboard.serviceCharge?.paidThisYear?.data,
			backgroundColor: "rgba(201, 203, 207, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
			stack: "Stack 3",
		},
		{
			label: " Due Service Charge",
			data: dashboard.serviceCharge?.unpaidThisYear?.data,
			backgroundColor: "rgba(201, 203, 207, 0.5)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
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
			data: [dashboard.rent?.paidThisMonth, dashboard.rent?.dueThisMonth],
			backgroundColor: ["rgba(40, 167, 69, 1)", "rgba(40, 167, 69, 0.5)"],
		},
	]

	var doughnutWater = [
		{
			label: " KES",
			data: [dashboard.water?.paidThisMonth, dashboard.water?.dueThisMonth],
			backgroundColor: ["rgba(75, 192, 192, 1)", "rgba(75, 192, 192, 0.5)"],
		},
	]

	var doughnutServiceCharge = [
		{
			label: " KES",
			data: [
				dashboard.serviceCharge?.paidThisMonth,
				dashboard.serviceCharge?.dueThisMonth,
			],
			backgroundColor: ["rgba(201, 203, 207, 1)", "rgba(201, 203, 207, 0.5)"],
		},
	]

	const occupancyPercentage = Math.trunc(
		(dashboard.units?.totalOccupied /
			(dashboard.units?.totalOccupied + dashboard.units?.totalUnoccupied)) *
			100
	)

	const rentPercentage = Math.trunc(
		(dashboard.rent?.paidThisMonth / dashboard.rent?.dueThisMonth) * 100
	)

	const waterBillPercentage = Math.trunc(
		(dashboard.water?.paidThisMonth / dashboard.water?.dueThisMonth) * 100
	)

	const serviceChargePercentage = Math.trunc(
		(dashboard.serviceCharge?.paidThisMonth /
			dashboard.serviceCharge?.dueThisMonth) *
			100
	)

	return (
		<React.Fragment>
			<div className="row">
				{/* Property Doughnut */}
				<div className="col-sm-4">
					<div className="card shadow-sm p-2 mb-2">
						<center>
							<div className="middle1">
								<h1>{dashboardProperties.total}</h1>
							</div>
							{dashboardProperties.names && (
								<Doughnut
									labels={dashboardProperties.names}
									datasets={doughnutProperties}
									cutout="50%"
									size="25em"
								/>
							)}
							<h6 className="mb-3">
								Total Units:{" "}
								{dashboardProperties.units?.reduce(
									(unitCount, acc) => unitCount + acc
								)}
							</h6>
						</center>
					</div>
				</div>
				{/* Property Doughnut End */}
				{/* Property List */}
				<div className="col-sm-4">
					{/* All */}
					<div
						className={`card shadow-sm p-2 mb-1 ${
							propertyId.length == props.auth.propertyIds.length &&
							"border-top-0 border-end-0 border-bottom-0 border-5 border-secondary"
						}`}
						style={{ cursor: "pointer" }}
						onClick={() => setPropertyId(props.auth.propertyIds)}>
						All
					</div>
					{/* All End */}

					{/* List */}
					{dashboardProperties.ids?.map((id, key) => (
						<div
							key={key}
							className={`card shadow-sm p-2 mb-1 ${
								id == propertyId &&
								"border-top-0 border-end-0 border-bottom-0 border-5 border-secondary"
							}`}
							style={{ cursor: "pointer" }}
							onClick={() => setPropertyId(id)}>
							{dashboardProperties.names[key]}
						</div>
					))}
					{/* List End */}
				</div>
				{/* Property List End */}
			</div>

			{/*
			 * Tenancy
			 */}

			<div className="row">
				<div className="col-sm-8">
					{/* Tenancy This Year */}
					<h4 className="my-3">Tenancy This Year</h4>
					<div className="card shadow-sm mb-2 rounded hidden-scroll">
						{dashboard.units && (
							<Bar
								labels={dashboard.units?.tenantsThisYear.labels}
								datasets={barGraphTenants}
							/>
						)}
					</div>
					{/* Tenancy This Year End */}
				</div>
				<div className="col-sm-4">
					{/* Tenancy This Month */}
					<h4 className="my-3">Current Occupancy</h4>
					<div className="card shadow-sm text-center p-4 mb-2">
						<div className="middle1">
							<h1>
								{occupancyPercentage}
								<small className="fs-1">%</small>
							</h1>
						</div>
						<center>
							{dashboard.units && (
								<Doughnut
									labels={["Occupied Units", "Unoccupied Units"]}
									datasets={doughnutUnits}
								/>
							)}
							<div className="d-flex justify-content-center pb-3">
								<h6>
									Total:
									{dashboard.units?.totalOccupied +
										dashboard.units?.totalUnoccupied}
								</h6>
							</div>
						</center>
					</div>
					{/* Tenancy This Month End */}
				</div>

				{/*
				 * Income
				 */}

				<div className="row">
					<div className="col-sm-8">
						<h4 className="my-3">Income This Year</h4>
						<div className="card shadow-sm hidden-scroll">
							{dashboard.rent && (
								<Bar
									labels={dashboard.rent?.paidThisYear.labels}
									datasets={barGraphRent}
								/>
							)}
						</div>
					</div>
					<div className="col-sm-4">
						<h4 className="my-3">Income this month</h4>
						<div className="d-flex justify-content-between flex-wrap">
							<div className="card shadow-sm text-center mb-2">
								<div className="middle2">
									<h2>
										{rentPercentage}
										<small className="fs-6">%</small>
									</h2>
								</div>
								{dashboard.rent && (
									<Doughnut
										labels={["Paid Rent", "Due Rent"]}
										datasets={doughnutRent}
										cutout="60%"
										size="14.5em"
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
							<div className="card shadow-sm text-center mb-2">
								<div className="middle2">
									<h2>
										{waterBillPercentage}
										<small className="fs-6">%</small>
									</h2>
								</div>
								{dashboard.water && (
									<Doughnut
										labels={["Paid Water Bill", "Due Water Bill"]}
										datasets={doughnutWater}
										cutout="60%"
										size="14.5em"
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
							<div className="card shadow-sm text-center mb-2">
								<div className="middle2">
									<h2>
										{serviceChargePercentage}
										<small className="fs-6">%</small>
									</h2>
								</div>
								{dashboard.serviceCharge && (
									<Doughnut
										labels={["Paid Service Charge", "Due Service Charge"]}
										datasets={doughnutServiceCharge}
										cutout="60%"
										size="14.5em"
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
						</div>
					</div>
				</div>

				{/*
				 * Tables
				 */}

				<div className="row">
					<div className="col-sm-6">
						<h4 className="my-3">Units</h4>

						{/* Table */}
						<div className="table-responsive mb-5">
							<table className="table table-hover">
								<thead>
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
						</div>
						{/* Table End */}
					</div>

					<div className="col-sm-6">
						<h4 className="my-3">Recent Payments</h4>

						{/* Recent Payments Table */}
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
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
						<h4 className="my-3">Staff</h4>

						{/* Staff Table */}
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
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
			</div>
		</React.Fragment>
	)
}

export default index
