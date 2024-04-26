import React, { useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"

import HeroIcon from "@/components/Core/HeroIcon"

import StaffSVG from "@/svgs/StaffSVG"
import PlusSVG from "@/svgs/PlusSVG"

const StaffList = (props) => {
	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")

	/*
	 * Delete Staff
	 */
	const onDeleteStaff = (staffId) => {
		Axios.delete(`/api/staff/${staffId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setCourse && props.get(`courses/${courseId}`, props.setCourse)
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
							<span className="fs-4">{props.staff?.length}</span>
							<h4>Total Instructors</h4>
						</div>
						<HeroIcon>
							<StaffSVG />
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
							id=""
							type="text"
							name="name"
							placeholder="Search by Name"
							className="form-control"
							onChange={(e) => setNameQuery(e.target.value)}
						/>
					</div>
					{/* Name End */}
					{/* Gender */}
					<div className="flex-grow-1 me-2 mb-2">
						<select
							id=""
							type="text"
							name="name"
							placeholder="Search by Gender"
							className="form-control me-2"
							onChange={(e) => setGenderQuery(e.target.value)}>
							<option value="">Search by Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
					{/* Gender End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			<div className="table-responsive">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="6"></th>
							<th className="text-end">
								<MyLink
									linkTo={`/staff/${props.propertyId}/create`}
									icon={<PlusSVG />}
									text="add unit"
								/>
							</th>
						</tr>
						<tr>
							<th>#</th>
							<th></th>
							<th>Name</th>
							<th>Phone</th>
							<th>Role</th>
							<th>Date Joined</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{props.staff
							?.filter((staff) => {
								var name = staff.name.toLowerCase()
								var query = nameQuery.toLowerCase()

								return name.match(query)
							})
							.filter((staff) => {
								if (genderQuery) {
									return staff.gender == genderQuery
								} else {
									return true
								}
							})
							.map((staff, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>
										<Img
											src={staff.avatar}
											className="rounded-circle"
											width="25px"
											height="25px"
											alt="Avatar"
										/>
									</td>
									<td>{staff.name}</td>
									<td>{staff.phone}</td>
									<td>
										{staff.roleNames.map((role, key) => (
											<span key={key}>| {role}</span>
										))}
									</td>
									<td>
										<div className="d-flex justify-content-end">
											{location.pathname.match("/admin/") && (
												<React.Fragment>
													<MyLink
														linkTo={`/staff/${staff.id}/show`}
														icon={<ViewSVG />}
														text="view"
														className="btn-sm me-1"
													/>

													<MyLink
														linkTo={`/staff/${staff.id}/edit`}
														icon={<EditSVG />}
														text="edit"
														className="btn-sm"
													/>

													<div className="mx-1">
														{/* Confirm Delete Modal End */}
														<div
															className="modal fade"
															id={`deleteStaffModal${key}`}
															tabIndex="-1"
															aria-labelledby="deleteModalLabel"
															aria-hidden="true">
															<div className="modal-dialog">
																<div className="modal-content">
																	<div className="modal-header">
																		<h1
																			id="deleteModalLabel"
																			className="modal-title fs-5 text-danger">
																			Delete Staff
																		</h1>
																		<button
																			type="button"
																			className="btn-close"
																			data-bs-dismiss="modal"
																			aria-label="Close"></button>
																	</div>
																	<div className="modal-body text-start text-wrap text-start">
																		Are you sure you want to delete {staff.name}
																		.
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
																			onClick={() => onDeleteStaff(staff.id)}>
																			<span className="me-1">
																				{<DeleteSVG />}
																			</span>
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
															data-bs-target={`#deleteStaffModal${key}`}>
															<span className="me-1">{<DeleteSVG />}</span>
															Delete
														</button>
													</div>
												</React.Fragment>
											)}
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default StaffList
