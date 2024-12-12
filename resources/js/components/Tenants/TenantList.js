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
						<input
							type="text"
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
						{location.pathname.match("/units/") && (
							<tr>
								<th colSpan="7"></th>
								<th className="text-end">
									<MyLink
										linkTo={`/tenants/${props.unitId}/create`}
										icon={<PlusSVG />}
										text="add tenant"
									/>
								</th>
							</tr>
						)}
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
												linkTo={`/tenants/${tenant.id}/edit`}
												icon={<EditSVG />}
												className="btn-sm"
											/>

											<div className="mx-1">
												{/* Confirm Vacate Modal End */}
												<div
													className="modal fade"
													id={`vacateModal${key}`}
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
																Are you sure you want to vacate {tenant.name}.
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
																	onClick={() => props.onVacate(tenant.id, tenant.unitId)}>
																	<span className="me-1">{<LogoutSVG />}</span>
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
