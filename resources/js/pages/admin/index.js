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
		setDashboard([])
		setDashboardProperties([])
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
			data: dashboard.tenants?.tenantsThisYear?.data,
			backgroundColor: "rgba(40, 167, 69, 0.8)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "50",
			stack: "Stack 0",
		},
		{
			label: " Vacancies this month",
			data: dashboard.tenants?.vacanciesThisYear?.data,
			backgroundColor: "rgba(255, 205, 86, 1)",
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
			backgroundColor: "rgba(40, 167, 69, 0.8)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
			stack: "Stack 1",
		},
		{
			label: " Due Rent",
			data: dashboard.rent?.unpaidThisYear?.data,
			backgroundColor: "rgba(255, 205, 86, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
			stack: "Stack 1",
		},
		{
			label: " Paid Water Bill",
			data: dashboard.water?.paidThisYear?.data,
			backgroundColor: "rgba(54, 162, 235, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
			stack: "Stack 2",
		},
		{
			label: " Due Water Bill",
			data: dashboard.water?.unpaidThisYear?.data,
			backgroundColor: "rgba(255, 205, 86, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
			stack: "Stack 2",
		},
		{
			label: " Paid Service Charge",
			data: dashboard.serviceCharge?.paidThisYear?.data,
			backgroundColor: "rgba(153, 102, 255, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
			stack: "Stack 3",
		},
		{
			label: " Due Service Charge",
			data: dashboard.serviceCharge?.unpaidThisYear?.data,
			backgroundColor: "rgba(255, 205, 86, 1)",
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: 2,
			borderRadius: "0",
			barThickness: "30",
			stack: "Stack 3",
		},
	]

	var doughnutUnits = [
		{
			label: "",
			data: [dashboard.units?.totalOccupied, dashboard.units?.totalUnoccupied],
			backgroundColor: ["rgba(40, 167, 69, 0.8)", "rgba(255, 205, 86, 1)"],
		},
	]

	var doughnutRent = [
		{
			label: " KES",
			data: [dashboard.rent?.paidThisMonth, dashboard.rent?.dueThisMonth],
			backgroundColor: ["rgba(40, 167, 69, 0.8)", "rgba(255, 205, 86, 1)"],
		},
	]

	var doughnutWater = [
		{
			label: " KES",
			data: [dashboard.water?.paidThisMonth, dashboard.water?.dueThisMonth],
			backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(255, 205, 86, 1)"],
		},
	]

	var doughnutServiceCharge = [
		{
			label: " KES",
			data: [
				dashboard.serviceCharge?.paidThisMonth,
				dashboard.serviceCharge?.dueThisMonth,
			],
			backgroundColor: ["rgba(153, 102, 255, 1)", "rgba(255, 205, 86, 1)"],
		},
	]

	return (
		<React.Fragment>
			<div className="row">
				{/* Property Count */}
				<div className="col-sm-4">
					<div className="card shadow-sm p-4 mb-2">
						<center className="my-5 py-5">
							<h4>Total Properties</h4>
							<h1 className="display-1">{dashboardProperties.total}</h1>
						</center>
					</div>
				</div>
				{/* Property Count End */}
				{/* Property Doughnut */}
				<div className="col-sm-4">
					<div className="card shadow-sm p-2 mb-2">
						<center>
							{dashboardProperties.names && (
								<Doughnut
									labels={dashboardProperties.names}
									datasets={doughnutProperties}
									cutout="50%"
									size="25em"
								/>
							)}
						</center>
					</div>
				</div>
				{/* Property Doughnut End */}
				{/* Property List */}
				<div className="col-sm-4">
					{/* All */}
					<div
						className={`card shadow-sm p-2 mb-1 ${
							propertyId == props.auth.propertyIds &&
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

			<div className="row">
				{/* Tenancy This Year */}
				<div className="col-sm-8">
					<h4 className="my-3">Tenancy This Year</h4>
					{/* Bar Graph*/}
					<div className="card shadow-sm mb-2 rounded hidden-scroll">
						{dashboard.tenants && (
							<Bar
								labels={dashboard.tenants?.tenantsThisYear.labels}
								datasets={barGraphTenants}
							/>
						)}
					</div>
					{/* Bar Graph End */}
				</div>

				{/* Doughnut */}
				<div className="col-sm-4">
					<h4 className="my-3">Current Occupancy</h4>
					<div className="card shadow-sm p-4 mb-2">
						<center>
							<h5>Total Units</h5>
							<h6>
								<small className="me-1">KES</small>
								{dashboard.units?.totalOccupied +
									dashboard.units?.totalUnoccupied}
							</h6>
							{dashboard.units && (
								<Doughnut
									labels={["Occupied Units", "Unoccupied Units"]}
									datasets={doughnutUnits}
								/>
							)}
						</center>
					</div>
				</div>
				{/* Doughnut End */}
				{/* Tenancy This Year End */}

				{/* Income Month */}
				<div className="col-sm-12">
					<h4 className="my-3">Income this month</h4>
					<div className="d-flex justify-content-between">
						<div className="card shadow-sm p-4">
							<center>
								<h5>Rent</h5>
								<h6>
									<small className="me-1">KES</small>
									{dashboard.rent?.total}
								</h6>
								{dashboard.rent && (
									<Doughnut
										labels={["Paid Rent", "Due Rent"]}
										datasets={doughnutRent}
										cutout="60%"
										size="25em"
									/>
								)}
							</center>
						</div>
						<div className="card shadow-sm p-4">
							<center>
								<h5>Water Bill</h5>
								<h6>
									<small className="me-1">KES</small>
									{dashboard.water?.total}
								</h6>
								{dashboard.rent && (
									<Doughnut
										labels={["Paid Water Bill", "Due Water Bill"]}
										datasets={doughnutWater}
										cutout="60%"
										size="25em"
									/>
								)}
							</center>
						</div>
						<div className="card shadow-sm p-4">
							<center>
								<h5>Service Charge</h5>
								<h6>
									<small className="me-1">KES</small>
									{dashboard.serviceCharge?.total}
								</h6>
								{dashboard.rent && (
									<Doughnut
										labels={["Paid Service Charge", "Due Service Charge"]}
										datasets={doughnutServiceCharge}
										cutout="60%"
										size="25em"
									/>
								)}
							</center>
						</div>
					</div>
				</div>
				{/* Income Month End */}

				{/* Income This Year */}
				{/* Bar Graph */}
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
				{/* Bar Graph End */}

				{/* Staff Table */}
				<div className="col-sm-4">
					<h4 className="my-3">Staff</h4>

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
							</tbody>
						</table>
					</div>
				</div>
				{/* Staff Table End */}
				{/* Income This Year End */}

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
			</div>
		</React.Fragment>
	)
}

export default index
