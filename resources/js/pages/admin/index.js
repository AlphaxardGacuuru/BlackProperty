import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"

import Bar from "@/components/Charts/Bar"
import Doughnut from "@/components/Charts/Doughnut"
import Pie from "@/components/Charts/Pie"
import PropertyDoughnut from "@/components/Dashboard/PropertyDoughnut"
import TenancyDoughnut from "@/components/Dashboard/TenancyDoughnut"
import RentDoughnut from "@/components/Dashboard/RentDoughnut"
import WaterDoughnut from "@/components/Dashboard/WaterDoughnut"
import ServiceChargeDoughnut from "@/components/Dashboard/ServiceChargeDoughnut"
import WaterUsageDoughnut from "@/components/Dashboard/WaterUsagePie"
import WaterUsagePie from "@/components/Dashboard/WaterUsagePie"
import TenancyBar from "@/components/Dashboard/TenancyBar"
import IncomeBar from "@/components/Dashboard/IncomeBar"

const index = (props) => {
	const location = useLocation()
	
	let superPropertyId = location.pathname.match("/super/") ? "All" : ""

	const months = props.months.filter((month) => month != "Select Month")
	const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

	const [dashboard, setDashboard] = useState(
		props.getLocalStorage("dashboard")?.length
			? props.getLocalStorage("dashboard")
			: {
					units: {
						totalOccupied: 0,
						totalUnoccupied: 0,
						percentage: 0,
						list: [],
						tenantsThisYear: {
							labels: months,
							data: data,
						},
						vacanciesThisYear: {
							labels: months,
							data: data,
						},
					},
					rent: {
						paid: 0,
						due: 0,
						total: "0",
						percentage: 0,
						paidThisYear: {
							labels: months,
							data: data,
						},
						unpaidThisYear: {
							labels: months,
							data: data,
						},
					},
					water: {
						paid: 0,
						due: 0,
						total: "0",
						usageTwoMonthsAgo: 0,
						usageLastMonth: 0,
						percentage: 0,
						paidThisYear: {
							labels: months,
							data: data,
						},
						unpaidThisYear: {
							labels: months,
							data: data,
						},
					},
					serviceCharge: {
						paid: 0,
						due: 0,
						total: "0",
						percentage: 0,
						paidThisYear: {
							labels: months,
							data: data,
						},
						unpaidThisYear: {
							labels: months,
							data: data,
						},
					},
			  }
	)

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
				[...props.auth.propertyIds, ...props.auth.assignedPropertyIds].length
					? [...props.auth.propertyIds, ...props.auth.assignedPropertyIds, superPropertyId]
					: [0]
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
			Axios.get(`api/dashboard/${props.selectedPropertyId},${superPropertyId}`)
				.then((res) => {
					// Reset Data
					setDashboard([])

					setDashboard(res.data.data)
					props.setLocalStorage("dashboard", res.data.data)
				})
				.catch(() => props.setErrors(["Failed to fetch Dashboard"]))

			// Fetch Payments
			props.getPaginated(
				`payments?propertyId=${props.selectedPropertyId},${superPropertyId}`,
				setPayments
			)

			// Fetch Staff
			props.getPaginated(
				`staff?propertyId=${props.selectedPropertyId},${superPropertyId}`,
				setStaff
			)
		}
	}, [props.selectedPropertyId])

	return (
		<React.Fragment>
			<div className="d-flex justify-content-start align-items-start flex-wrap">
				{/* Property Doughnut */}
				<PropertyDoughnut dashboardProperties={dashboardProperties} />
				{/* Property Doughnut End */}
				{/* Tenancy Doughnut */}
				<TenancyDoughnut
					dashboard={dashboard}
					dashboardProperties={dashboardProperties}
				/>
				{/* Tenancy Doughnut End */}
				{/* Rent Doughnut */}
				<RentDoughnut dashboard={dashboard} />
				{/* Rent Doughnut End */}
				{/* Water Doughnut */}
				<WaterDoughnut dashboard={dashboard} />
				{/* Water Doughnut End */}
				{/* Service Charge Doughnut */}
				<ServiceChargeDoughnut dashboard={dashboard} />
				{/* Service Charge Doughnut End */}
				{/* Water Usage Pie */}
				<WaterUsagePie dashboard={dashboard} />
				{/* Water Usage Pie End */}
			</div>

			<div
				className="row"
				style={{ minHeight: "400px" }}>
				<div className="col-sm-6">
					{/* Tenancy This Year */}
					<TenancyBar dashboard={dashboard} />
					{/* Tenancy This Year End */}
				</div>
				<div className="col-sm-6">
					{/* Income Bar Start */}
					<IncomeBar dashboard={dashboard} />
					{/* Income Bar End */}
				</div>
			</div>

			{/*
			 * Tables
			 */}

			<div className="row">
				<div className="col-sm-6">
					{/* Units Table */}
					<div className="table-responsive">
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
											linkTo="/units"
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
					<div className="table-responsive">
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
											linkTo="/staff"
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
