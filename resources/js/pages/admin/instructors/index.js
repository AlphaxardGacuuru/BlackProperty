import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"
import PaginationLinks from "@/components/Core/PaginationLinks"

import PersonSVG from "@/svgs/PersonSVG"
import HeroIcon from "@/components/Core/HeroIcon"

const index = (props) => {
	// Get Instructors
	const [instructors, setInstructors] = useState([])
	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])
	const [loading, setLoading] = useState()

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [facultyQuery, setFacultyQuery] = useState("")
	const [departmentQuery, setDepartmentQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Instructors", path: ["instructors"] })
		props.getPaginated("instructors", setInstructors)
		props.get("faculties", setFaculties)
		props.get("departments", setDepartments)
	}, [])

	/*
	 * Delete
	 */
	const onDelete = (instructorId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/instructors/${instructorId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				props.getPaginated("instructors", setInstructors)
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
								<span className="fs-4">{instructors.meta?.total}</span>
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
						{/* Faculty */}
						<div className="flex-grow-1 me-2 mb-2">
							<select
								id=""
								type="text"
								name="name"
								placeholder="Search by Faculty"
								className="form-control me-2"
								onChange={(e) => setFacultyQuery(e.target.value)}>
								<option value="">Search by Faculty</option>
								{faculties.map((faculty, key) => (
									<option
										key={key}
										value={faculty.id}>
										{faculty.name}
									</option>
								))}
							</select>
						</div>
						{/* Faculty End */}
						{/* Department */}
						<div className="flex-grow-1 me-2 mb-2">
							<select
								id=""
								type="text"
								name="name"
								placeholder="Search by Gender"
								className="form-control me-2"
								onChange={(e) => setDepartmentQuery(e.target.value)}>
								<option value="">Search by Department</option>
								{departments.map((department, key) => (
									<option
										key={key}
										value={department.id}>
										{department.name}
									</option>
								))}
							</select>
						</div>
						{/* Department End */}
					</div>
				</div>
				{/* Filters End */}

				<br />

				<div className="table-responsive mb-5 pb-2">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="9"></th>
								<th className="text-end">
									<MyLink
										linkTo="/instructors/create"
										text="add instructor"
									/>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th></th>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Gender</th>
								<th>Faculty</th>
								<th>Department</th>
								<th>Date Joined</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{instructors.data
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
								.filter((instructor) => {
									if (facultyQuery) {
										return instructor.facultyId == facultyQuery
									} else {
										return true
									}
								})
								.filter((instructor) => {
									if (departmentQuery) {
										return instructor.departmentId == departmentQuery
									} else {
										return true
									}
								})
								.map((instructor, key) => (
									<tr key={key}>
										<td>{props.iterator(key, instructors)}</td>
										<td>
											<Img
												src={instructor.avatar}
												className="rounded-circle"
												style={{ width: "7em" }}
												alt="Avatar"
											/>
										</td>
										<td>{instructor.name}</td>
										<td>{instructor.email}</td>
										<td>{instructor.phone}</td>
										<td className="text-capitalize">{instructor.gender}</td>
										<td>{instructor.facultyName}</td>
										<td>{instructor.departmentName}</td>
										<td>{instructor.createdAt}</td>
										<td className="text-end">
											<div className="d-flex">
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
																		Delete Instructor
																	</h1>
																	<button
																		type="button"
																		className="btn-close"
																		data-bs-dismiss="modal"
																		aria-label="Close"></button>
																</div>
																<div className="modal-body text-start text-wrap">
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
																		onClick={() => onDelete(instructor.id)}>
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
														data-bs-target={`#deleteModal${key}`}>
														Delete
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
						list={instructors}
						getPaginated={props.getPaginated}
						setState={setInstructors}
					/>
					{/* Pagination Links End */}
				</div>
			</div>
		</div>
	)
}

export default index
