import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import CloseSVG from "@/svgs/CloseSVG"

const edit = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})
	const [instructors, setInstructors] = useState([])
	const [session, setSession] = useState({})

	const [name, setName] = useState()
	const [code, setCode] = useState()
	const [description, setDescription] = useState()
	const [year, setYear] = useState()
	const [semester, setSemester] = useState()
	const [credits, setCredits] = useState()
	const [instructorIds, setInstructorIds] = useState([])
	const [loading, setLoading] = useState()

	// Get Units
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Unit", path: ["units", "edit"] })
		// Fetch Unit
		Axios.get(`/api/units/${id}`).then((res) => {
			var unit = res.data.data

			// Set page
			props.setPage({
				name: "Edit Learning Resource",
				path: ["courses", `courses/${unit.courseId}/show`, "create"],
			})

			setUnit(unit)
			setInstructorIds(unit.instructors.map((instructor) => instructor.id))

			// Fetch Instructors
			props.get(
				`instructors?idAndName=true&courseId=${unit.courseId}`,
				setInstructors
			)

			// Fetch Session
			Axios.get(`api/sessions/by-course-id/${unit.courseId}`)
				.then((res) => setSession(res.data.data))
				.catch((err) => props.getErrors(err))
		})
	}, [])

	/*
	 * Handle Instructor selects
	 */
	const handleInstructorIds = (id) => {
		if (id) {
			var exists = instructorIds.includes(id)

			var newInstructorIds = exists
				? instructorIds.filter((item) => item != id)
				: [...instructorIds, id]

			setInstructorIds(newInstructorIds)
		}
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/units/${id}`, {
			name: name,
			code: parseInt(code),
			description: description,
			year: parseInt(year),
			semester: parseInt(semester),
			credits: credits,
			instructorIds: instructorIds,
			sessionId: session.id,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Reload Window
				window.location.reload()
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="name"
						defaultValue={unit.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>

					<input
						type="text"
						name="code"
						defaultValue={unit.code}
						className="form-control mb-2 me-2"
						onChange={(e) => setCode(e.target.value)}
					/>

					<textarea
						type="text"
						name="description"
						defaultValue={unit.description}
						className="form-control mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}></textarea>

					<input
						type="number"
						name="year"
						defaultValue={unit.year}
						className="form-control mb-2 me-2"
						onChange={(e) => setYear(e.target.value)}
					/>

					<input
						type="number"
						name="semester"
						defaultValue={unit.semester}
						className="form-control mb-2 me-2"
						onChange={(e) => setSemester(e.target.value)}
					/>

					<input
						type="number"
						name="credtis"
						defaultValue={unit.credits}
						className="form-control mb-2 me-2"
						onChange={(e) => setCredits(e.target.value)}
					/>

					<div className="d-flex">
						<select
							name="instructorId"
							className="form-control mb-3 me-2"
							onChange={(e) =>
								handleInstructorIds(Number.parseInt(e.target.value))
							}
							disabled={instructorIds.length > 0}>
							<option value="">Select Instructor</option>
							{instructors.map((instructor, key) => (
								<option
									key={key}
									value={instructor.id}
									className="text-primary"
									selected={instructor.id == instructorIds[0]}>
									{instructor.name}
								</option>
							))}
						</select>
						{/* Close Icon */}
						<span
							className="text-primary"
							style={{ cursor: "pointer" }}
							onClick={() => setInstructorIds(instructorIds.slice(0, 0))}>
							<CloseSVG />
						</span>
						{/* Close Icon End */}
					</div>

					{instructorIds.map((input, key1) => (
						<div
							className="d-flex"
							key={key1}>
							<select
								name="instructorId"
								className="form-control mb-3 me-2"
								onChange={(e) =>
									handleInstructorIds(Number.parseInt(e.target.value))
								}
								disabled={instructorIds.length > key1 + 1}>
								<option value="">Select Instructor</option>
								{instructors.map((instructor, key2) => (
									<option
										key={key2}
										value={
											!instructorIds.includes(instructor.id) && instructor.id
										}
										className={
											instructorIds.includes(instructor.id)
												? "text-secondary"
												: "text-primary"
										}
										selected={instructor.id == instructorIds[key1 + 1]}>
										{instructor.name}
									</option>
								))}
							</select>
							{/* Close Icon */}
							<span
								className={
									key1 == instructorIds.length - 1
										? "invisible text-primary"
										: "text-primary"
								}
								style={{ cursor: "pointer" }}
								onClick={() =>
									setInstructorIds(
										instructorIds.filter(
											(instructorId, index) => index != key1 + 1
										)
									)
								}>
								<CloseSVG />
							</span>
							{/* Close Icon End */}
						</div>
					))}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							btnText="update"
							loading={loading}
						/>
					</div>

					<center>
						<MyLink
							linkTo={`/courses/${unit.courseId}/show`}
							text="back to course"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
