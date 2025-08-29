import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"
import UnitStatementList from "@/components/Units/UnitStatementList"
import UnitWaterReadingList from "@/components/Units/UnitWaterReadingList"
import UnitInvoiceList from "@/components/Units/UnitInvoiceList"
import UnitPaymentList from "@/components/Units/UnitPaymentList"
import UnitCreditNoteList from "@/components/Units/UnitCreditNoteList"
import UnitDeductionList from "@/components/Units/UnitDeductionList"
import TenantScore from "@/components/Charts/TenantScore"

import PlusSVG from "@/svgs/PlusSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import DeleteSVG from "@/svgs/DeleteSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import CloseSVG from "@/svgs/CloseSVG"

const show = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})
	const [tenants, setTenants] = useState([])

	const [tab, setTab] = useState("statements")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Unit", path: ["units", "view"] })
		// Fetch Unit
		props.get(`units/${id}`, setUnit)
		// Fetch Tenants
		props.getPaginated(
			`tenants?propertyId=${props.auth.propertyIds}&unitId=${id}&vacated=true`,
			setTenants
		)
	}, [])

	/*
	 * Vacate Tenant
	 */
	const onVacate = (tenantId) => {
		Axios.put(`/api/tenants/${tenantId}`, {
			unitId: id,
			vacate: true,
		})
			.then((res) => {
				props.setMessages([`${res.data.data.name} Vacated Successfully`])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
				// Fetch Unit
				props.get(`units/${id}`, setUnit)
				// Fetch Tenants
				props.getPaginated(`tenants?unitId=${id}&vacated=true`, setTenants)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Tenant
	 */
	const onDeleteTenant = (tenantId, unitId) => {
		Axios.post(`/api/tenants/${tenantId}`, {
			unitId: unitId,
			_method: "DELETE",
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
				// Fetch Unit
				props.get(`units/${id}`, setUnit)
				// Fetch Tenants
				props.getPaginated(`tenants?unitId=${id}&vacated=true`, setTenants)
			})
			.catch((err) => props.getErrors(err))
	}

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
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
					<h6 className="text-capitalize">Type: {unit.type}</h6>
					<h6 className="text-capitalize">
						{unit.bedrooms
							? `${unit.bedrooms} Bed`
							: `Size: ${unit.size?.value} ${unit.size?.unit}`}
					</h6>
					<h6>Ensuite: {unit.ensuite}</h6>
					<h6>DSQ: {unit.dsq ? "Yes" : "No"}</h6>
					<hr />
					<div className="d-flex justify-content-end">
						{unit.status == "vacant" && (
							<MyLink
								linkTo={`/units/${id}/tenants/create`}
								icon={<PlusSVG />}
								text="add tenant"
							/>
						)}
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
						<div className="d-flex justify-content-center">
							{/* View Start */}
							<MyLink
								linkTo={`/tenants/${unit.tenantId}/show`}
								icon={<ViewSVG />}
								className="btn-sm me-1"
							/>
							{/* View End */}

							{/* Edit Start */}
							<MyLink
								linkTo={`/tenants/${unit.tenantId}/edit`}
								icon={<EditSVG />}
								className="btn-sm me-1"
							/>
							{/* Edit End */}

							{/* Confirm Vacate Modal End */}
							<div
								className="modal fade"
								id={`vacateModal`}
								tabIndex="-1"
								aria-labelledby="deleteModalLabel"
								aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content bg-warning rounded-0">
										<div className="modal-header border-0">
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
										<div className="modal-body text-start text-wrap border-0">
											Are you sure you want to Vacate {unit.tenantName}.
										</div>
										<div className="modal-footer justify-content-between border-0">
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
								className="mysonar-btn btn-2 mb-2 me-1"
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
									<div className="modal-content bg-danger rounded-0">
										<div className="modal-header border-0">
											<h1
												id="deleteModalLabel"
												className="modal-title text-white fs-5">
												Delete Tenant
											</h1>

											{/* Close Start */}
											<span
												type="button"
												className="text-white"
												data-bs-dismiss="modal">
												<CloseSVG />
											</span>
											{/* Close End */}
										</div>
										<div className="modal-body text-start text-white text-wrap border-0">
											Are you sure you want to Delete {unit.tenantName}. All
											associated Invoices, Payments, Credit Notes and Deductions
											will be deleted.
										</div>
										<div className="modal-footer justify-content-between border-0">
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
												onClick={() => onDeleteTenant(unit.tenantId, unit.id)}>
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

				{/* Tenant Score Start */}
				{unit.tenantName && <TenantScore {...props} />}
				{/* Tenant Score End */}

				{/* Past Tenant List */}
				<div className="table-responsive mb-5">
					<table className="table bg-white table-hover">
						<thead>
							<tr>
								<th colSpan="3">
									<h4>Past Tenants</h4>
								</th>
							</tr>
							<tr>
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
										<td>{tenant.name}</td>
										<td>{tenant.vacatedAt}</td>
										<td className="d-flex justify-content-end">
											<MyLink
												linkTo={`/tenants/${tenant.userUnitId}/show`}
												icon={<ViewSVG />}
												className="btn-sm ms-1"
											/>

											<div className="mx-1">
												<DeleteModal
													index={`tenant${key}`}
													model={tenant}
													modelName="Tenant"
													onDelete={onDeleteTenant}
												/>
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
							"statements"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("statements")}>
						Statements
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
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"invoices"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("invoices")}>
						Invoices
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"payments"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("payments")}>
						Payments
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"credit_notes"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("credit_notes")}>
						Credit Notes
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"deductions"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("deductions")}>
						Deductions
					</div>
				</div>
				{/* Tabs End */}

				{/* Tab Content Start */}
				{tab == "statements" && (
					<UnitStatementList
						{...props}
						unit={unit}
					/>
				)}

				{tab == "water_readings" && (
					<UnitWaterReadingList
						{...props}
						unit={unit}
					/>
				)}

				{tab == "invoices" && (
					<UnitInvoiceList
						{...props}
						unit={unit}
					/>
				)}

				{tab == "payments" && (
					<UnitPaymentList
						{...props}
						unit={unit}
					/>
				)}

				{tab == "credit_notes" && (
					<UnitCreditNoteList
						{...props}
						unit={unit}
					/>
				)}

				{tab == "deductions" && (
					<UnitDeductionList
						{...props}
						unit={unit}
					/>
				)}
				{/* Tab Content End */}
			</div>
		</div>
	)
}

export default show
