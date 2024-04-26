import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"

import PaginationLinks from "@/components/Core/PaginationLinks"

import UnitSVG from "@/svgs/UnitSVG"
import HeroIcon from "@/components/Core/HeroIcon"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import DeleteSVG from "@/svgs/DeleteSVG"
import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	// Get Units
	const [units, setUnits] = useState([])
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Units", path: ["units"] })
		props.get("units", setUnits)
	}, [])

	/*
	 * Delete
	 */
	const onDelete = (unitId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/units/${unitId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				setUnits(
					units.filter((unit) => unit.id != unitId)
				)
			})
			.catch((err) => {
				// Toggle loader
				setLoading(true)
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Data */}
				<div className="card shadow-sm p-2">
					<div className="d-flex justify-content-between">
						{/* Total */}
						<div className="d-flex justify-content-between w-100 align-items-center mx-4">
							<div>
								<h4>Total Units</h4>
								<span className="fs-4">{units.length}</span>
							</div>
							<HeroIcon>
								<UnitSVG />
							</HeroIcon>
						</div>
						{/* Total End */}
					</div>
				</div>
				{/* Data End */}

				<br />

				<div className="table-responsive">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="4"></th>
								<th className="text-end">
									<MyLink
										linkTo="/units/create"
										icon={<PlusSVG />}
										text="add unit"
									/>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<td>Name</td>
								<td className="text-success">Rent (KES)</td>
								<td className="text-success">Deposit (KES)</td>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{units.map((unit, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{unit.name}</td>
									<td className="text-success">{unit.rent}</td>
									<td className="text-success">{unit.deposit}</td>
									<td className="text-end">
										<div className="d-flex">
											<MyLink
												linkTo={`/units/${unit.id}/show`}
												icon={<ViewSVG />}
												text="view"
												className="btn-sm me-1"
											/>

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
													id={`deleteModal${key}`}
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
																	className="btn btn-light rounded-0"
																	data-bs-dismiss="modal">
																	Close
																</button>
																<button
																	type="button"
																	className="btn btn-danger rounded-0"
																	data-bs-dismiss="modal"
																	onClick={() => onDelete(unit.id)}>
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
													data-bs-target={`#deleteModal${key}`}>
													<span className="me-1">{<DeleteSVG />}</span>Delete
												</button>
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* Pagination Links */}
					<PaginationLinks
						list={units}
						getPaginated={props.getPaginated}
						setState={setUnits}
					/>
					{/* Pagination Links End */}
				</div>
			</div>
		</div>
	)
}

export default index
