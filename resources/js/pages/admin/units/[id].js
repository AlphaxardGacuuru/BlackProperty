import React, { useEffect, useState } from "react"
import {
	useLocation,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"
import DiscussionForum from "@/components/Units/DiscussionForum"
import Submission from "@/components/Units/Submission"
import HeroIcon from "@/components/Core/HeroIcon"
import InstructorList from "@/components/Instructors/InstructorList"
import StudentList from "@/components/Students/StudentList"

import MaterialSVG from "@/svgs/MaterialSVG"

const show = (props) => {
	var { id } = useParams()
	const location = useLocation()

	const [unit, setUnit] = useState({})
	const [syllabus, setSyllabus] = useState([])
	const [tab, setTab] = useState("materials")
	const [materialTab, setMaterialTab] = useState("Learning Guide")
	const [richText, setRichText] = useState("")
	const [week, setWeek] = useState("")
	const [isActive, setIsActive] = useState()

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")

	const [unitSession] = (props.auth?.unitSessions || [{}])
		.filter((unitSession) => unitSession.unitId == id)
		.map((unitSession) => unitSession)

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Unit", path: ["courses", "view"] })
		// Fetch Unit
		Axios.get(`api/units/${id}`)
			.then((res) => {
				// Set page
				props.setPage({
					name: "View Unit",
					path: ["courses", `courses/${res.data.data.courseId}/show`, "view"],
				})
				setUnit(res.data.data)
			})
			.catch((err) => props.setErrors([`Failed to fetch unit/${id}`]))
		// Fetch Materials
		props.get(`materials/by-unit-id/${id}`, setSyllabus)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const materialActive = (activeTab) => {
		return activeTab == materialTab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	/*
	 * Handle Material Change
	 */
	const handleMaterialTab = (title, richText, syllabusWeek, isActive) => {
		// Check Type of material clicked
		if (title == "Learning Guide") {
			setMaterialTab("Learning Guide")
			setRichText(richText)
		} else if (title == "Discussion Forum") {
			setMaterialTab("Discussion Forum")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "Written Assignment") {
			setMaterialTab("Written Assignment")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "Learning Reflection") {
			setMaterialTab("Learning Reflection")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		}
	}

	/*
	 * Delete Instructor
	 */
	const onDeleteInstructor = (instructorId) => {
		Axios.delete(`/api/instructors/${instructorId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`units/${id}`, setUnit)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Student
	 */
	const onDeleteStudent = (studentId) => {
		Axios.delete(`/api/students/${studentId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`units/${id}`, setUnit)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Material
	 */
	const onDeleteMaterial = (materialId) => {
		Axios.delete(`/api/materials/${materialId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`materials/by-unit-id/${id}`, setSyllabus)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card shadow mb-2 p-4 text-center">
					<h4>{unit.name}</h4>
					<h6>{unit.description}</h6>
					<h6>Year {unit.year}</h6>
					<h6>Semester {unit.semester}</h6>
					<h6>Credit {unit.credits}</h6>
				</div>

				{/* Materials Tab */}
				<div>
					{/* Data */}
					<div className="card shadow mb-2 p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{syllabus.length}</span>
									<h4>Total Weeks</h4>
								</div>
								<HeroIcon>
									<MaterialSVG />
								</HeroIcon>
							</div>
							{/* Total End */}
						</div>
					</div>
					{/* Data End */}

					{/* Weeks */}
					<div className="card shadow mb-2">
						<div className="d-flex justify-content-between p-2 px-4 align-items-center">
							<h5>Learning Resources</h5>
							{location.pathname.match("/admin/") && (
								<div>
									<MyLink
										linkTo={`/materials/${id}/create`}
										text="add learning resources"
									/>
								</div>
							)}
						</div>
					</div>
					<div
						className="accordion shadow mb-5"
						id="accordionPanelsStayOpenExample">
						{syllabus.map((syllabus, key) => (
							<div
								key={key}
								className="accordion-item">
								<h2 className="accordion-header">
									<button
										className={`accordion-button ${
											!syllabus.isActive && "collapsed"
										}`}
										type="button"
										data-bs-toggle="collapse"
										data-bs-target={`#panelsStayOpen-${key}`}
										aria-expanded="true"
										aria-controls={`panelsStayOpen-${key}`}>
										<div className="d-flex justify-content-start w-100 me-2">
											<div className="me-2">Week {syllabus.week}</div>
											<div
												className={`${
													location.pathname.match("/admin/")
														? "border-primary text-primary"
														: location.pathname.match("/instructor/")
														? "border-danger text-danger"
														: "border-success text-success"
												} border rounded-pill me-2 px-2`}>
												{syllabus.range}
											</div>
											{syllabus.isActive && (
												<div
													className={`${
														location.pathname.match("/admin/")
															? "border-primary text-primary"
															: location.pathname.match("/instructor/")
															? "border-danger text-danger"
															: "border-success text-success"
													} border rounded-pill me-2 px-2`}>
													Current
												</div>
											)}
										</div>
									</button>
								</h2>
								<div
									id={`panelsStayOpen-${key}`}
									className={`accordion-collapse collapse ${
										syllabus.isActive && "show"
									}`}>
									<div className="accordion-body p-1">
										{/* Table */}
										<div className="table-responsive">
											<table className="table table-hover table-borderless">
												<tbody>
													{syllabus.materials.map((material, key) => (
														<tr key={key}>
															<td>{material.title}</td>
															<td>
																<div className="d-flex justify-content-end">
																	<Btn
																		btnText="view"
																		btnClass="btn-sm me-1"
																		onClick={() =>
																			handleMaterialTab(
																				material.title,
																				material.richText,
																				syllabus.week,
																				syllabus.isActive
																			)
																		}
																	/>

																	{location.pathname.match("/admin/") && (
																		<React.Fragment>
																			<MyLink
																				linkTo={`/materials/${material.id}/edit`}
																				text="edit"
																				className="btn-sm"
																			/>
																			<div className="mx-1">
																				{/* Confirm Delete Modal End */}
																				<div
																					className="modal fade"
																					id={`deleteMaterialModal${material.id}`}
																					tabIndex="-1"
																					aria-labelledby="deleteModalLabel"
																					aria-hidden="true">
																					<div className="modal-dialog">
																						<div className="modal-content">
																							<div className="modal-header">
																								<h1
																									id="deleteModalLabel"
																									className="modal-title fs-5 text-danger">
																									Delete Learning Resource
																								</h1>
																								<button
																									type="button"
																									className="btn-close"
																									data-bs-dismiss="modal"
																									aria-label="Close"></button>
																							</div>
																							<div className="modal-body text-start text-wrap">
																								Are you sure you want to delete{" "}
																								{material.title}.
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
																										onDeleteMaterial(
																											material.id
																										)
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
																					data-bs-target={`#deleteMaterialModal${material.id}`}>
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
										{/* Table End */}
									</div>
								</div>
							</div>
						))}
					</div>
					{/* Weeks End */}
				</div>
				{/* Materials Tab End */}
			</div>

			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"materials"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("materials")}>
						Learning Resources
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
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"students"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("students")}>
						Students
					</div>
				</div>
				{/* Tabs End */}

				{/* Materials Tab */}
				<div className={activeTab("materials")}>
					{/* Material Tabs */}
					<div className="d-flex justify-content-between flex-wrap mb-2">
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Learning Guide"
							)}`}>
							Learning Guide
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Discussion Forum"
							)}`}>
							Discussion Forum
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Written Assignment"
							)}`}>
							Written Assignment
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Learning Reflection"
							)}`}>
							Learning Reflection
						</div>
					</div>
					{/* Material Tabs End */}

					{/* Materials Tab */}
					<div className="card shadow-sm mb-2 py-5 p-2">
						{richText ? (
							<div
								dangerouslySetInnerHTML={{ __html: richText }}
								className="px-5"
							/>
						) : (
							<div className="d-flex justify-content-center p-5 text-muted">
								Nothing to show
							</div>
						)}
					</div>
					{/* Materials Tab End */}

					{/* Discussion Forum */}
					{materialTab == "Discussion Forum" && isActive && (
						<DiscussionForum
							{...props}
							sessionId={unitSession?.sessionId}
							unitId={unitSession?.unitId}
							week={week}
						/>
					)}
					{/* Discussion Forum End */}

					{/* Submission */}
					{(materialTab == "Written Assignment" ||
						materialTab == "Learning Reflection") &&
						isActive && (
							<Submission
								{...props}
								sessionId={unitSession?.sessionId}
								unitId={id}
								week={week}
								materialTab={materialTab}
							/>
						)}
					{/* Submission End */}
				</div>
				{/* Materials Tab End */}

				{/* Instructors Tab */}
				<InstructorList
					{...props}
					instructors={unit.instructors}
					activeTab={activeTab("instructors")}
				/>
				{/* Instructors Tab End */}

				{/* Students Tab */}
				<StudentList
					{...props}
					students={unit.students}
					activeTab={activeTab("students")}
				/>
				{/* Students Tab End */}
			</div>
		</div>
	)
}

export default show
