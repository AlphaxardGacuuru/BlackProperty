import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import TenantSVG from "@/svgs/TenantSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"
import LogoutSVG from "@/svgs/LogoutSVG"

const TenantList = (props) => {
	const location = useLocation()

	/*
	 * Vacate Tenant
	 */
	const onVacate = (tenantId, unitId) => {
		Axios.put(`/api/tenants/${tenantId}`, {
			unitId: unitId,
			vacate: true,
		})
			.then((res) => {
				props.setMessages([`${res.data.data.name} Vacated Successfully`])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
				// State to Update
				props.stateToUpdate()
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-2">
						<HeroHeading
							heading="Total Tenants"
							data={props.tenants.meta?.total}
						/>
						<HeroIcon>
							<TenantSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			<br />

			{/* Filters */}
			<div className="card shadow-sm p-4">
				<div className="d-flex flex-wrap">
					{/* Name */}
					<div className="flex-grow-1 me-2 mb-2">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							placeholder="Search by Name"
							className="form-control"
							onChange={(e) => props.setNameQuery(e.target.value)}
						/>
					</div>
					{/* Name End */}
					{/* Phone */}
					<div className="flex-grow-1 me-2 mb-2">
						<label htmlFor="phone">Phone</label>
						<input
							type="number"
							name="phone"
							placeholder="Search by Phone"
							className="form-control"
							onChange={(e) => props.setPhoneQuery(e.target.value)}
						/>
					</div>
					{/* Phone End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="6"></th>
							<th className="d-flex justify-content-end">
								{location.pathname.match("/admin/tenants") && (
									<MyLink
										linkTo={`/tenants/create`}
										icon={<PlusSVG />}
										text="add tenants"
									/>
								)}

								{location.pathname.match("/units/") && (
									<MyLink
										linkTo={`/tenants/${props.unitId}/create`}
										icon={<PlusSVG />}
										text="add tenant"
									/>
								)}
							</th>
						</tr>
						<tr>
							<th>#</th>
							<th></th>
							<th>Name</th>
							<th>Phone</th>
							<th>Unit</th>
							<th>Move In Date</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					{props.tenants.data?.length > 0 ? (
						<tbody>
							{props.tenants.data?.map((tenant, key) => (
								<tr key={key}>
									<td>{props.iterator(key, props.tenants)}</td>
									<td>
										<Img
											src={tenant.avatar}
											className="rounded-circle"
											style={{ minWidth: "3em", height: "3em" }}
											alt="Avatar"
										/>
									</td>
									<td>{tenant.name}</td>
									<td>{tenant.phone}</td>
									<td>{tenant.unitName}</td>
									<td>{tenant.occupiedAt}</td>
									<td>
										<div className="d-flex justify-content-center">
											<React.Fragment>
												<MyLink
													linkTo={`/units/${tenant.unitId}/show`}
													icon={<ViewSVG />}
													text="View Unit"
													className="btn-sm"
												/>

												<MyLink
													linkTo={`/tenants/${tenant.id}/show`}
													icon={<ViewSVG />}
													className="btn-sm ms-1"
												/>

												<MyLink
													linkTo={`/tenants/${tenant.id}/edit`}
													icon={<EditSVG />}
													className="btn-sm mx-1"
												/>

												<div>
													{/* Confirm Vacate Modal End */}
													<div
														className="modal fade"
														id={`vacateModal${key}`}
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
																	Are you sure you want to Vacate {tenant.name}.
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
																		onClick={() =>
																			onVacate(tenant.id, tenant.unitId)
																		}>
																		<span className="me-1">
																			{<LogoutSVG />}
																		</span>
																		Vacate {tenant.name}
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
														data-bs-target={`#vacateModal${key}`}>
														<LogoutSVG /> Vacate tenant
													</button>
													{/* Button trigger modal End */}
												</div>
											</React.Fragment>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td
									colSpan="8"
									className="p-0">
									<div className="bg-white text-center w-100 py-5">
										<img
											src="/img/no-data-found.jpg"
											alt="No entries found"
											style={{ width: "30%", height: "auto" }}
										/>
									</div>
								</td>
							</tr>
						</tbody>
					)}
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.tenants}
					getPaginated={props.getPaginated}
					setState={props.setTenants}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default TenantList
