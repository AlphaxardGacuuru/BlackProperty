import React from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import HeroIcon from "@/components/Core/HeroIcon"

import BillableSVG from "@/svgs/BillableSVG"

const BillableList = (props) => {
	const location = useLocation()

	/*
	 * Delete Billable
	 */
	const onDeleteBillable = (billableId) => {
		Axios.delete(`/api/billables/${billableId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setCourse && props.get(`courses/${id}`, props.setCourse)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{props.billables?.length}</span>
							<h4>Total Billables</h4>
						</div>
						<HeroIcon>
							<BillableSVG />
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
						{location.pathname.match("/admin/") && (
							<tr>
								<th colSpan="6"></th>
								<th className="text-end">
									<MyLink
										linkTo="/billables/create"
										text="add billable"
									/>
								</th>
							</tr>
						)}
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Year</th>
							<th>Semester</th>
							{location.pathname.match("/admin/") && <th>Action</th>}
						</tr>
					</thead>
					<tbody>
						{props.billables?.map((billable, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td>{billable.name}</td>
								<td>{billable.description}</td>
								<td>{billable.price}</td>
								<td>{billable.year}</td>
								<td>{billable.semester}</td>
								{location.pathname.match("/admin/") && (
									<td>
										<div className="d-flex justify-content-end">
											<MyLink
												linkTo={`/billables/${billable.id}/edit`}
												text="edit"
												className="btn-sm"
											/>

											<div className="mx-1">
												{/* Confirm Delete Modal End */}
												<div
													className="modal fade"
													id={`deleteBillableModal${key}`}
													tabIndex="-1"
													aria-labelledby="deleteModalLabel"
													aria-hidden="true">
													<div className="modal-dialog">
														<div className="modal-content">
															<div className="modal-header">
																<h1
																	id="deleteModalLabel"
																	className="modal-title fs-5 text-danger">
																	Delete Billable
																</h1>
																<button
																	type="button"
																	className="btn-close"
																	data-bs-dismiss="modal"
																	aria-label="Close"></button>
															</div>
															<div className="modal-body text-start text-wrap text-start">
																Are you sure you want to delete {billable.name}.
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
																	onClick={() => onDeleteBillable(billable.id)}>
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
													className="btn btn-sm btn-outline-danger rounded-pill"
													data-bs-toggle="modal"
													data-bs-target={`#deleteBillableModal${key}`}>
													Delete
												</button>
											</div>
										</div>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default BillableList
