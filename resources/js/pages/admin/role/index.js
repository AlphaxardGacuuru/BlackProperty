import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import PersonGearSVG from "@/svgs/PersonGearSVG"
import HeroIcon from "@/components/Core/HeroIcon"

const index = (props) => {
	// Get Role
	const [roles, setRoles] = useState([])
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Roles", path: ["role"] })
		props.get("roles", setRoles)
	}, [])

	/*
	 * Delete
	 */
	const onDelete = (roleId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/roles/${roleId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				setRoles(roles.filter((role) => role.id != roleId))
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
								<span className="fs-4">{roles.length}</span>
								<h4>Total Roles</h4>
							</div>
							<HeroIcon>
								<PersonGearSVG />
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
										linkTo="/roles/create"
										text="add role"
									/>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Description</th>
								<th>Permissions</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{roles.map((role, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{role.name}</td>
									<td>{role.description}</td>
									<td>
										<div className="d-flex flex-wrap">
											{role.permissions.map((permission, key) => (
												<div
													key={key}
													className="text-primary p-1">
													| {permission}
												</div>
											))}
										</div>
									</td>
									<td className="text-end">
										<div className="d-flex">
											<MyLink
												linkTo={`/roles/${role.id}/edit`}
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
																	Delete Role
																</h1>
																<button
																	type="button"
																	className="btn-close"
																	data-bs-dismiss="modal"
																	aria-label="Close"></button>
															</div>
															<div className="modal-body text-start text-wrap">
																Are you sure you want to delete {role.name}.
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
																	onClick={() => onDelete(role.id)}>
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
