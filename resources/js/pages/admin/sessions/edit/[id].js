import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const edit = (props) => {
	const { id } = useParams()

	const [session, setSession] = useState({})
	const [courses, setCourses] = useState([])
	const [courseNameQuery, setCourseNameQuery] = useState("")

	const [course, setCourse] = useState({})
	const [year, setYear] = useState()
	const [semester, setSemester] = useState()
	const [startsAt, setStartsAt] = useState()
	const [endsAt, setEndsAt] = useState()

	const [loading, setLoading] = useState()

	// Get Sessions and Departments
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Session",
			path: ["sessions", "edit"],
		})

		// Get Course
		Axios.get(`api/sessions/${id}`).then((res) => {
			setSession(res.data.data)
			setCourse({ id: res.data.data.courseId.toString(), name: res.data.data.courseName })
		})
		// Get Courses
		props.get("courses?idAndName=true", setCourses)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/sessions/${id}`, {
			courseId: course.id,
			year: year,
			semester: semester,
			startsAt: startsAt,
			endsAt: endsAt,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Reload
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
					{/* Course Unit */}
					<div className="dropdown mb-2">
						<button
							className="btn btn-outline-primary rounded-pill dropdown-toggle w-100"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							Select Course
						</button>
						<div className="dropdown-menu w-100 mt-2">
							<div className="border-bottom px-2">
								<input
									type="text"
									defaultValue="Search Name"
									className="form-control rounded-pill mb-2"
									onChange={(e) => setCourseNameQuery(e.target.value)}
								/>
							</div>
							<ul style={{ maxHeight: "400px", overflowY: "auto" }}>
								{courses
									.filter((course) => {
										var name = course.name.toLowerCase()
										var query = courseNameQuery.toLowerCase()

										return name.match(query)
									})
									.map((course, key) => (
										<li key={key}>
											<span
												key={key}
												className="dropdown-item"
												style={{ cursor: "pointer" }}
												onClick={() =>
													setCourse({
														id: course.id,
														name: course.name,
													})
												}>
												{course.name}
											</span>
										</li>
									))}
							</ul>
						</div>
					</div>
					<div className="text-primary text-center p-2">{course.name}</div>
					{/* Course Unit End */}

					<input
						type="number"
						name="year"
						defaultValue={session.year}
						className="form-control mb-2 me-2"
						onChange={(e) => setYear(parseInt(e.target.value))}
					/>

					<input
						type="number"
						name="semester"
						defaultValue={session.semester}
						className="form-control mb-2 me-2"
						onChange={(e) => setSemester(parseInt(e.target.value))}
					/>

					<label
						htmlFor="startsAt"
						className="ms-1">
						Starts At
					</label>
					<input
						type="datetime-local"
						name="startsAt"
						defaultValue={session.startsAt}
						className="form-control mb-2 me-2"
						onChange={(e) => setStartsAt(e.target.value)}
					/>

					<label
						htmlFor="startsAt"
						className="ms-1">
						Ends At
					</label>
					<input
						type="datetime-local"
						name="endsAt"
						defaultValue={session.endsAt}
						className="form-control mb-2 me-2"
						onChange={(e) => setEndsAt(e.target.value)}
					/>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							btnText="update session"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo="/sessions"
							text="back to sessions"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
