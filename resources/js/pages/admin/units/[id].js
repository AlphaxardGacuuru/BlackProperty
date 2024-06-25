import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import StatementList from "@/components/Statements/StatementList"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import PlusSVG from "@/svgs/PlusSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import DeleteSVG from "@/svgs/DeleteSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import PaginationLinks from "@/components/Core/PaginationLinks"
import WaterReadingList from "@/components/Water/WaterReadingList"

const show = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})
	const [tenants, setTenants] = useState([])
	const [rentStatements, setRentStatements] = useState([])
	const [waterStatements, setWaterStatements] = useState([])
	const [serviceChargeStatements, setServiceChargeStatements] = useState([])
	const [waterReadings, setWaterReadings] = useState([])

	const [tenant, setTenant] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")

	const [tab, setTab] = useState("rent")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Unit", path: ["properties", "view"] })
		// Fetch Units
		Axios.get(`api/units/${id}`).then((res) => {
			setUnit(res.data.data)
			props.setPage({
				name: "View Unit",
				path: [
					"properties",
					`properties/${res.data.data.propertyId}/show`,
					"view",
				],
			})
		})
		// Fetch Tenants
		props.getPaginated(`tenants/by-unit-id/${id}`, setTenants)
		// Fetch Statements
		props.getPaginated(`units/statements/${id}?type=rent`, setRentStatements)
		props.getPaginated(`units/statements/${id}?type=water`, setWaterStatements)
		props.getPaginated(
			`units/statements/${id}?type=service_charge`,
			setServiceChargeStatements
		)
	}, [])

	useEffect(() => {
		// Fetch Water Readings
		props.getPaginated(
			`water-readings/by-property-id/${props.auth.propertyIds}?
			tenant=${tenant}&
			unitId=${id}&
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setWaterReadings
		)
	}, [tenant, unit, startMonth, endMonth, startYear, endYear])

	/*
	 * Vacate Tenant
	 */
	const onVacate = (tenantId) => {
		Axios.put(`/api/tenants/${tenantId}`, {
			unitId: id,
			vacate: true,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Fetch Unit
				props.get(`units/${id}`, setUnit)
				// Fetch Tenants
				props.getPaginated(`tenants/by-unit-id/${id}`, setTenants)
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Tenant
	 */
	const onDeleteTenant = (tenantId) => {
		Axios.delete(`/api/tenants/${tenantId}?unitId=${id}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Fetch Unit
				props.get(`units/${id}`, setUnit)
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => props.getErrors(err))
	}

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	// Return Appropriate Statement
	const statements = (type) => {
		switch (type) {
			case "rent":
				return rentStatements
				break

			case "water":
				return waterStatements
				break

			default:
				return serviceChargeStatements
				break
		}
	}

	// Return Appropriate Statement Setter
	const setStatements = (type) => {
		switch (type) {
			case "rent":
				return rentStatements
				break

			case "water":
				return waterStatements
				break

			default:
				return serviceChargeStatements
				break
		}
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				{/* Unit Info */}
				<div className="card mb-2 p-4 text-center shadow-sm">
					<h4>{unit.name}</h4>
					<h6>
						Rent:
						<span className="mx-1 text-success">
							<small>KES</small> {unit.rent}
						</span>
					</h6>
					<h6>
						Deposit:
						<span className="mx-1 text-success">
							<small>KES</small> {unit.deposit}
						</span>
					</h6>
					<hr />
					<div className="d-flex justify-content-end">
						<MyLink
							linkTo={`/tenants/${id}/create`}
							icon={<PlusSVG />}
							text="add tenant"
						/>
					</div>
				</div>
				{/* Unit Info End */}

				{/* Tenant Info */}
				{unit.tenantName ? (
					<div className="card shadow-sm mb-2 p-2 text-center">
						<h4 className="mt-4">Current Tenant</h4>
						<div className="m-3">
							<Img
								src={unit.tenantAvatar ?? "/storage/avatars/male-avatar.png"}
								className="rounded-circle"
								width="100px"
								height="100px"
								alt="Avatar"
							/>
						</div>
						<h4>{unit.tenantName}</h4>
						<h6>{unit.tenantEmail}</h6>
						<h6>{unit.tenantPhone}</h6>
						<h6>{unit.tenantOccupiedAt}</h6>
						<hr />
						<div className="d-flex justify-content-between">
							<MyLink
								linkTo={`/tenants/${unit.tenantId}/edit`}
								icon={<EditSVG />}
								text="edit"
								className="btn-sm"
							/>

							{/* Confirm Vacate Modal End */}
							<div
								className="modal fade"
								id={`vacateModal`}
								tabIndex="-1"
								aria-labelledby="deleteModalLabel"
								aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content rounded-0">
										<div className="modal-header">
											<h1
												id="deleteModalLabel"
												className="modal-title fs-5">
												Vacate Tenant
											</h1>
											<button
												type="button"
												className="btn-close"
												data-bs-dismiss="modal"
												aria-label="Close"></button>
										</div>
										<div className="modal-body text-start text-wrap">
											Are you sure you want to vacate {unit.tenantName}.
										</div>
										<div className="modal-footer justify-content-between">
											<button
												type="button"
												className="mysonar-btn btn-2"
												data-bs-dismiss="modal">
												Close
											</button>
											<button
												type="button"
												className="mysonar-btn btn-2"
												data-bs-dismiss="modal"
												onClick={() => onVacate(unit.tenantId)}>
												<span className="me-1">{<LogoutSVG />}</span>
												Vacate {unit.tenantName}
											</button>
										</div>
									</div>
								</div>
							</div>
							{/* Confirm Vacate Modal End */}

							{/* Button trigger modal */}
							<button
								type="button"
								className="mysonar-btn btn-2 mb-2"
								data-bs-toggle="modal"
								data-bs-target={`#vacateModal`}>
								<LogoutSVG /> Vacate tenant
							</button>
							{/* Button trigger modal End */}

							{/* Confirm Delete Modal End */}
							<div
								className="modal fade"
								id={`deleteModal`}
								tabIndex="-1"
								aria-labelledby="deleteModalLabel"
								aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content rounded-0">
										<div className="modal-header">
											<h1
												id="deleteModalLabel"
												className="modal-title fs-5">
												Delete Tenant
											</h1>
											<button
												type="button"
												className="btn-close"
												data-bs-dismiss="modal"
												aria-label="Close"></button>
										</div>
										<div className="modal-body text-start text-wrap">
											Are you sure you want to delete {unit.tenantName}.
										</div>
										<div className="modal-footer justify-content-between">
											<button
												type="button"
												className="mysonar-btn btn-2"
												data-bs-dismiss="modal">
												Close
											</button>
											<button
												type="button"
												className="btn btn-danger rounded-0"
												data-bs-dismiss="modal"
												onClick={() => onDeleteTenant(unit.tenantId)}>
												<span className="me-1">{<DeleteSVG />}</span>
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
							{/* Confirm Delete Modal End */}

							{/* Button trigger modal */}
							<button
								type="button"
								className="mysonar-btn btn-2"
								data-bs-toggle="modal"
								data-bs-target={`#deleteModal`}>
								<span className="me-1">{<DeleteSVG />}</span>
								Delete
							</button>
							{/* Button trigger modal End */}
						</div>
					</div>
				) : (
					<div className="card shadow-sm mb-2 p-4 text-center">
						<h4 className="text-muted">Currently Vacant</h4>
					</div>
				)}
				{/* Tenant Info End */}

				{/* Past Tenant List */}
				<div className="table-responsive mb-5">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="4">
									<h4>Past Tenants</h4>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Vacated On</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{tenants.data
								?.filter((tenant) => tenant.vacatedAt)
								.map((tenant, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{tenant.name}</td>
										<td>{tenant.vacatedAt}</td>
										<td>
											<div className="d-flex justify-content-end">
												<React.Fragment>
													<MyLink
														linkTo={`/tenants/${tenant.id}/show`}
														icon={<ViewSVG />}
														text="view"
														className="btn-sm me-1"
													/>
												</React.Fragment>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
					{/* Pagination Links */}
					<PaginationLinks
						list={tenants}
						getPaginated={props.getPaginated}
						setState={setTenants}
					/>
					{/* Pagination Links End */}
				</div>
				{/* Past Tenant List End */}
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"rent"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("rent")}>
						Rent Statements
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"water"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("water")}>
						Water Statements
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"service_charge"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("service_charge")}>
						Service Charge Statements
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"water_readings"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("water_readings")}>
						Water Readings
					</div>
				</div>
				{/* Tabs End */}

				{tab == "rent" || tab == "water" || tab == "service_charge" ? (
					<StatementList
						{...props}
						statements={statements(tab)}
						setStatements={setStatements(tab)}
						tab={tab}
					/>
				) : (
					<WaterReadingList
						{...props}
						activeTab={activeTab("water_readings")}
						waterReadings={waterReadings}
						setWaterReadings={setWaterReadings}
						setTenant={setTenant}
						setUnit={setUnit}
						setStartMonth={setStartMonth}
						setEndMonth={setEndMonth}
						setStartYear={setStartYear}
						setEndYear={setEndYear}
					/>
				)}
			</div>
		</div>
	)
}

export default show
