import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"

import HeroIcon from "@/components/Core/HeroIcon"
import InstructorList from "@/components/Instructors/InstructorList"
import StudentList from "@/components/Students/StudentList"

import DepartmentSVG from "@/svgs/DepartmentSVG"

const show = (props) => {
	var { id } = useParams()

	const [faculty, setFaculty] = useState({})
	const [tab, setTab] = useState("departments")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Faculty", path: ["faculties", "view"] })
		props.get(`faculties/${id}`, setFaculty)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	/*
	 * Delete Department
	 */
	const onDeleteDepartment = (departmentId) => {
		Axios.delete(`/api/departments/${departmentId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`faculties/${id}`, setFaculty)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card mb-2 p-4 text-center shadow">
					<h4>{faculty.name}</h4>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"departments"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("departments")}>
						Departments
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"instructors"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("instructors")}>
						Instructors
					</div>
					<div
						className={`card flex-grow-1 text-center mb-2 py-2 px-4 ${active(
							"students"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("students")}>
						Students
					</div>
				</div>
				{/* Tabs End */}

				{/* Departments Tab */}
				<div className={activeTab("departments")}>
					{/* Data */}
					<div className="card shadow-sm mb-2 p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{faculty.departments?.length}</span>
									<h4>Total Departments</h4>
								</div>
								<HeroIcon>
									<DepartmentSVG />
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
									<th colSpan="2">Departments</th>
									<th className="text-end">
										<MyLink
											linkTo={`/departments/${id}/create`}
											text="add department"
										/>
									</th>
								</tr>
								<tr>
									<td>#</td>
									<td>Name</td>
									<td>Action</td>
								</tr>
								{faculty?.departments?.map((department, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{department.name}</td>
										<td>
											<div className="d-flex justify-content-start">
												<MyLink
													linkTo={`/departments/${department.id}/edit`}
													text="edit"
													className="btn-sm"
												/>

												<div className="mx-1">
													{/* Confirm Delete Modal End */}
													<div
														className="modal fade"
														id={`deleteDepartmentModal${key}`}
														tabIndex="-1"
														aria-labelledby="deleteModalLabel"
														aria-hidden="true">
														<div className="modal-dialog">
															<div className="modal-content">
																<div className="modal-header">
																	<h1
																		id="deleteModalLabel"
																		className="modal-title fs-5 text-danger">
																		Delete Faculty
																	</h1>
																	<button
																		type="button"
																		className="btn-close"
																		data-bs-dismiss="modal"
																		aria-label="Close"></button>
																</div>
																<div className="modal-body text-start text-wrap">
																	Are you sure you want to delete{" "}
																	{department.name}.
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
																			onDeleteDepartment(department.id)
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
														data-bs-target={`#deleteDepartmentModal${key}`}>
														Delete
													</button>
												</div>
											</div>
										</td>
									</tr>
								))}
							</thead>
						</table>
					</div>
					{/* Table End */}
				</div>
				{/* Departments Tab End */}

				{/* Instructors Tab */}
				<InstructorList
					{...props}
					instructors={faculty.instructors}
					activeTab={activeTab("instructors")}
					setFaculty={setFaculty}
				/>
				{/* Instructors Tab End */}

				{/* Students Tab */}
				<StudentList
					{...props}
					students={faculty.students}
					activeTab={activeTab("students")}
					setFaculty={setFaculty}
				/>
				{/* Students Tab End */}
			</div>
		</div>
	)
}

export default show
