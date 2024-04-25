import React, { useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"

import HeroIcon from "@/components/Core/HeroIcon"

import StudentSVG from "@/svgs/StudentSVG"

const StudentList = (props) => {
	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [dateQuery, setDateQuery] = useState("")

	/*
	 * Delete Student
	 */
	const onDeleteStudent = (studentId) => {
		Axios.delete(`/api/students/${studentId}`)
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
							<span className="fs-4">{props.students?.length}</span>
							<h4>Total Instructors</h4>
						</div>
						<HeroIcon>
							<StudentSVG />
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
								<th colSpan="7"></th>
								<th className="text-end">
									<MyLink
										linkTo="/students/create"
										text="add student"
									/>
								</th>
							</tr>
						)}
						<tr>
							<th>#</th>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Gender</th>
							<th>Department</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{props.students
							?.filter((student) => {
								var name = student.name.toLowerCase()
								var query = nameQuery.toLowerCase()

								return name.match(query)
							})
							.filter((student) => {
								if (genderQuery) {
									return student.gender == genderQuery
								} else {
									return true
								}
							})
							.map((student, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>
										<Img
											src={student.avatar}
											className="rounded-circle"
											width="25px"
											height="25px"
											alt="Avatar"
										/>
									</td>
									<td>{student.name}</td>
									<td>{student.email}</td>
									<td>{student.phone}</td>
									<td className="text-capitalize">{student.gender}</td>
									<td>{student.departmentName}</td>
									<td>
										<div className="d-flex justify-content-end">
											{location.pathname.match("/admin/") && (
												<React.Fragment>
													<MyLink
														linkTo={`/students/${student.id}/show`}
														text="view"
														className="btn-sm me-1"
													/>

													<MyLink
														linkTo={`/students/${student.id}/edit`}
														text="edit"
														className="btn-sm"
													/>

													<div className="mx-1">
														{/* Confirm Delete Modal End */}
														<div
															className="modal fade"
															id={`deleteStudentModal${key}`}
															tabIndex="-1"
															aria-labelledby="deleteModalLabel"
															aria-hidden="true">
															<div className="modal-dialog">
																<div className="modal-content">
																	<div className="modal-header">
																		<h1
																			id="deleteModalLabel"
																			className="modal-title fs-5 text-danger">
																			Delete Student
																		</h1>
																		<button
																			type="button"
																			className="btn-close"
																			data-bs-dismiss="modal"
																			aria-label="Close"></button>
																	</div>
																	<div className="modal-body text-start text-wrap text-start">
																		Are you sure you want to delete{" "}
																		{student.name}.
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
																				onDeleteStudent(student.id)
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
															data-bs-target={`#deleteStudentModal${key}`}>
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

export default StudentList
