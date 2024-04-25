import React, { useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"

import HeroIcon from "@/components/Core/HeroIcon"

import PersonSVG from "@/svgs/PersonSVG"

const InstructorList = (props) => {
	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [dateQuery, setDateQuery] = useState("")

	/*
	 * Delete Instructor
	 */
	const onDeleteInstructor = (instructorId) => {
		Axios.delete(`/api/instructors/${instructorId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setCourse && props.get(`courses/${id}`, props.setCourse)
				props.setFaculty && props.get(`faculties/${id}`, props.setFaculty)
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
							<span className="fs-4">{props.instructors?.length}</span>
							<h4>Total Instructors</h4>
						</div>
						<HeroIcon>
							<PersonSVG />
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
					{/* Date */}
					{/* <div className="flex-grow-1">
							<input
								id=""
								type="date"
								name="daterange"
								placeholder="Search by Date Joined"
								className="form-control"
								onChange={(e) => setDateQuery(e.target.value)}
							/>
						</div> */}
					{/* Date End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			<div className="table-responsive">
				<table className="table table-hover">
					<thead>
						{location.pathname.match("/admin/") && (
							<tr>
								<th colSpan="4"></th>
								<th className="text-end">
									<MyLink
										linkTo="/instructors/create"
										text="add instructor"
									/>
								</th>
							</tr>
						)}
						<tr>
							<th>#</th>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{props.instructors
							?.filter((instructor) => {
								var name = instructor.name.toLowerCase()
								var query = nameQuery.toLowerCase()

								return name.match(query)
							})
							.filter((instructor) => {
								if (genderQuery) {
									return instructor.gender == genderQuery
								} else {
									return true
								}
							})
							.map((instructor, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>
										<Img
											src={instructor.avatar}
											className="rounded-circle"
											width="25px"
											height="25px"
											alt="Avatar"
										/>
									</td>
									<td>{instructor.name}</td>
									<td>{instructor.email}</td>
									<td>
										<div className="d-flex justify-content-end">
											{location.pathname.match("/admin/") && (
												<React.Fragment>
													<MyLink
														linkTo={`/instructors/${instructor.id}/show`}
														text="view"
														className="btn-sm me-1"
													/>

													<MyLink
														linkTo={`/instructors/${instructor.id}/edit`}
														text="edit"
														className="btn-sm"
													/>

													<div className="mx-1">
														{/* Confirm Delete Modal End */}
														<div
															className="modal fade"
															id={`deleteInstructorModal${key}`}
															tabIndex="-1"
															aria-labelledby="deleteModalLabel"
															aria-hidden="true">
															<div className="modal-dialog">
																<div className="modal-content">
																	<div className="modal-header">
																		<h1
																			id="deleteModalLabel"
																			className="modal-title fs-5 text-danger">
																			Delete Instructor
																		</h1>
																		<button
																			type="button"
																			className="btn-close"
																			data-bs-dismiss="modal"
																			aria-label="Close"></button>
																	</div>
																	<div className="modal-body text-start text-wrap text-start">
																		Are you sure you want to delete{" "}
																		{instructor.name}.
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
																			onClick={() =>
																				onDeleteInstructor(instructor.id)
																			}>
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
															data-bs-target={`#deleteInstructorModal${key}`}>
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

export default InstructorList
