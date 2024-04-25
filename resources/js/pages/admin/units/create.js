import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	var { id } = useParams()
	var history = useHistory()

	const [name, setName] = useState()
	const [instructors, setInstructors] = useState([])

	const [code, setCode] = useState()
	const [description, setDescription] = useState()
	const [year, setYear] = useState()
	const [semester, setSemester] = useState()
	const [credits, setCredits] = useState()
	const [instructorIds, setInstructorIds] = useState([])
	const [loading, setLoading] = useState()

	// Get Instructors
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Unit",
			path: ["courses", `courses/${id}/show`, "create"],
		})
		// Fetch Instructors
		props.get(`instructors?idAndName=true&courseId=${id}`, setInstructors)
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
		Axios.post("/api/units", {
			name: name,
			code: code,
			description: description,
			year: parseInt(year),
			semester: parseInt(semester),
			credits: credits,
			// instructorIds: instructorIds,
			courseId: id,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Units
				setTimeout(() => history.push(`/admin/courses/${id}/show`), 500)
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
						placeholder="Name"
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>

					<input
						type="text"
						name="code"
						placeholder="Code"
						className="form-control mb-2 me-2"
						onChange={(e) => setCode(e.target.value)}
						required={true}
					/>

					<textarea
						type="text"
						name="description"
						placeholder="Description"
						className="form-control mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}
						required={true}></textarea>

					<input
						type="number"
						name="year"
						placeholder="Year"
						className="form-control mb-2 me-2"
						onChange={(e) => setYear(e.target.value)}
					/>

					<input
						type="number"
						name="semester"
						placeholder="Semester"
						className="form-control mb-2 me-2"
						onChange={(e) => setSemester(e.target.value)}
					/>

					<input
						type="number"
						name="credtis"
						placeholder="Credits"
						className="form-control mb-2 me-2"
						onChange={(e) => setCredits(e.target.value)}
						required={true}
					/>

					{/* <div className="d-flex">
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
									className="text-primary">
									{instructor.name}
								</option>
							))}
						</select>
						<span
							className="text-primary"
							style={{ cursor: "pointer" }}
							onClick={() => setInstructorIds(instructorIds.slice(0, 0))}>
							<CloseSVG />
						</span>
					</div> */}

					{/* {instructorIds.map((input, key) => (
						<div
							className="d-flex"
							key={key}>
							<select
								name="instructorId"
								className="form-control mb-3 me-2"
								onChange={(e) =>
									handleInstructorIds(Number.parseInt(e.target.value))
								}
								disabled={instructorIds.length > key + 1}>
								<option value="">Select Instructor</option>
								{instructors.map((instructor, key) => (
									<option
										key={key}
										value={
											!instructorIds.includes(instructor.id) && instructor.id
										}
										className={
											instructorIds.includes(instructor.id)
												? "text-secondary"
												: "text-primary"
										}>
										{instructor.name}
									</option>
								))}
							</select>
							<span
								className={
									key == instructorIds.length - 1 ? "invisible" : "text-primary"
								}
								style={{ cursor: "pointer" }}
								onClick={() =>
									setInstructorIds(instructorIds.slice(0, key - 1))
								}>
								<CloseSVG />
							</span>
						</div>
					))} */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							btnText="add unit"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/courses/${id}/show`}
							text="back to course"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
