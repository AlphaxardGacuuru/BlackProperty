import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import StaffSVG from "@/svgs/StaffSVG"
import HeroIcon from "@/components/Core/HeroIcon"

const index = (props) => {
	// Get Staff
	const [staff, setStaff] = useState([])
	const [roles, setRoles] = useState([])
	const [loading, setLoading] = useState()
	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [dateQuery, setDateQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Staff", path: ["staff"] })
		props.get("staff", setStaff)
	}, [])

	/*
	 * Delete
	 */
	const onDelete = (staffId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/staff/${staffId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				setStaff(staff.filter((staff) => staff.id != staffId))
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
								<span className="fs-4">{staff.length}</span>
								<h4>Total Staff</h4>
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
						{/* Role */}
						<div className="flex-grow-1 me-2 mb-2">
							<select
								id=""
								type="text"
								name="name"
								placeholder="Search by Role"
								className="form-control me-2"
								onChange={(e) => setRoleQuery(e.target.value)}>
								<option value="">Search by Role</option>
								{roles.map((role, key) => (
									<option
										key={key}
										value="male">
										{role.name}
									</option>
								))}
							</select>
						</div>
						{/* Role End */}
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
							<tr>
								<th colSpan="8"></th>
								<th className="text-end">
									<MyLink
										linkTo="/staff/create"
										text="add staff"
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
								<th>Role</th>
								<th>Date Joined</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{staff
								.filter((staff) => {
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
										<td>{staff.email}</td>
										<td>{staff.phone}</td>
										<td className="text-capitalize">{staff.gender}</td>
										<td>
											{staff.roleNames.map((role, key) => (
												<span key={key}>| {role}</span>
											))}
										</td>
										<td>{staff.createdAt}</td>
										<td className="text-end">
											<div className="d-flex">
												<MyLink
													linkTo={`/staff/${staff.id}/edit`}
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
																		Delete Staff
																	</h1>
																	<button
																		type="button"
																		className="btn-close"
																		data-bs-dismiss="modal"
																		aria-label="Close"></button>
																</div>
																<div className="modal-body text-start text-start text-wrap">
																	Are you sure you want to delete {staff.name}.
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
																		onClick={() => onDelete(staff.id)}>
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
				</div>
			</div>
		</div>
	)
}

export default index
