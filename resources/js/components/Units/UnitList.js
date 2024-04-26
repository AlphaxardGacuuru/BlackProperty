import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import HeroIcon from "@/components/Core/HeroIcon"

import PaginationLinks from "@/components/Core/PaginationLinks"

import UnitSVG from "@/svgs/UnitSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import DeleteSVG from "@/svgs/DeleteSVG"
import PlusSVG from "@/svgs/PlusSVG"

const UnitList = (props) => {
	const location = useLocation()

	/*
	 * Delete Unit
	 */
	const onDeleteUnit = (unitId) => {
		Axios.delete(`/api/units/${unitId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`courses/${props.courseId}`, props.setCourse)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{props.units.data?.length}</span>
							<h4>Total Units</h4>
						</div>
						<HeroIcon>
							<UnitSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			{/* Table */}
			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="4"></th>
							<th className="text-end">
								<MyLink
									linkTo={`/properties/${props.propertyId}/create`}
									icon={<PlusSVG />}
									text="add unit"
								/>
							</th>
						</tr>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Rent (KES)</th>
							<th>Deposit (KES)</th>
							<th className="text-center">Action</th>
						</tr>
						{props.units.data?.map((unit, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td>{unit.name}</td>
								<td className="text-success">{unit.rent}</td>
								<td className="text-success">{unit.deposit}</td>
								<td>
									<div className="d-flex justify-content-end">
										<div className="d-flex justify-content-end">
											<MyLink
												linkTo={`/units/${unit.id}/show`}
												icon={<ViewSVG />}
												text="view"
												className="btn-sm me-1"
											/>
										</div>

										<MyLink
											linkTo={`/units/${unit.id}/edit`}
											icon={<EditSVG />}
											text="edit"
											className="btn-sm"
										/>

										<div className="mx-1">
											{/* Confirm Delete Modal End */}
											<div
												className="modal fade"
												id={`deleteUnitModal${key}`}
												tabIndex="-1"
												aria-labelledby="deleteModalLabel"
												aria-hidden="true">
												<div className="modal-dialog">
													<div className="modal-content">
														<div className="modal-header">
															<h1
																id="deleteModalLabel"
																className="modal-title fs-5 text-danger">
																Delete Unit
															</h1>
															<button
																type="button"
																className="btn-close"
																data-bs-dismiss="modal"
																aria-label="Close"></button>
														</div>
														<div className="modal-body text-start text-wrap">
															Are you sure you want to delete {unit.name}.
														</div>
														<div className="modal-footer justify-content-between">
															<button
																type="button"
																className="btn btn-light rounded-pill"
																data-bs-dismiss="modal">
																Close
															</button>
															<button
																type="button"
																className="btn btn-danger rounded-pill"
																data-bs-dismiss="modal"
																onClick={() => onDeleteUnit(unit.id)}>
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
												className="btn btn-sm btn-danger rounded-0"
												data-bs-toggle="modal"
												data-bs-target={`#deleteUnitModal${key}`}>
												<span className="me-1">{<DeleteSVG />}</span>Delete
											</button>
										</div>
									</div>
								</td>
							</tr>
						))}
					</thead>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.units}
					getPaginated={props.getPaginated}
					setState={props.setUnits}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default UnitList
