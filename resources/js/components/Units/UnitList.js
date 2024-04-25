import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import HeroIcon from "@/components/Core/HeroIcon"

import UnitSVG from "@/svgs/UnitSVG"

const UnitList = (props) => {
	const location = useLocation()

	const [loading, setLoading] = useState()

	/*
	 * Self Enroll
	 */
	const selfEnrollUnit = (unitId) => {
		// Show loader
		setLoading(true)

		Axios.put(`/api/students/${props.auth.id}`, {
			unitId: unitId,
			sessionId: props.session.id,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

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
							<span className="fs-4">{props.units?.length}</span>
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
			<div className="table-responsive">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Code</th>
							<th>Year</th>
							<th>Semester</th>
							<th>Credits</th>
							<th>Action</th>
						</tr>
						{props.units?.map((unit, key) => (
							<tr
								key={key}
								className={
									key == 0 && props.auth.id == props.userId
										? "table-danger"
										: ""
								}>
								<td>{key + 1}</td>
								<td>{unit.name}</td>
								<td>{unit.code}</td>
								<td>{unit.year}</td>
								<td>{unit.semester}</td>
								<td>{unit.credits}</td>
								<td>
									<div className="d-flex justify-content-end">
										{props.auth.unitIds?.includes(unit.id) ||
										props.auth.accountType == "staff" ? (
											<div className="d-flex justify-content-end">
												<MyLink
													linkTo={`/units/${unit.id}/show`}
													text="view"
													className="btn-sm me-1"
												/>
											</div>
										) : (
											<React.Fragment>
												{props.auth.accountType == "student" &&
													props.auth.courseId == props.courseId &&
													unit.year == props.session.year &&
													unit.semester == props.session.semester && (
														<div className="d-flex justify-content-end">
															<Btn
																btnText="self enroll"
																btnClass="btn-sm btn-success me-2"
																onClick={() => selfEnrollUnit(unit.id)}
																loading={loading}
															/>
														</div>
													)}
											</React.Fragment>
										)}

										{location.pathname.match("/admin/") && (
											<React.Fragment>
												<MyLink
													linkTo={`/units/${unit.id}/edit`}
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
																		Delete Course
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
														data-bs-target={`#deleteUnitModal${key}`}>
														Delete
													</button>
												</div>
											</React.Fragment>
										)}
									</div>
								</td>
							</tr>
						))}
					</thead>
				</table>
			</div>
			{/* Table End */}
		</div>
	)
}

export default UnitList
