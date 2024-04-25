import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import PlusSVG from "@/svgs/PlusSVG"
import CloseSVG from "@/svgs/CloseSVG"

import Countries from "@/components/Core/Countries"

const edit = (props) => {
	var { id } = useParams()

	const [instructor, setInstructor] = useState({})
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [education, setEducation] = useState()
	const [originLocation, setOriginLocation] = useState()
	const [currentLocation, setCurrentLocation] = useState()
	const [facultyId, setFacultyId] = useState()
	const [departmentId, setDepartmentId] = useState()
	const [courseId, setCourseId] = useState()
	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])
	const [courses, setCourses] = useState([])
	const [courseIds, setCourseIds] = useState([])
	const [loading, setLoading] = useState()

	var educationList = ["phd", " masters", "degree", "certificate"]

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Instructor", path: ["instructors", "edit"] })

		Axios.get(`/api/instructors/${id}`).then((res) => {
			setInstructor(res.data.data)
			setFacultyId(res.data.data.facultyId.toString())
			setDepartmentId(res.data.data.departmentId.toString())
			setCourseIds(res.data.data.courseIds)
		})
		props.get("faculties", setFaculties)
		props.get("departments", setDepartments)
		props.get("courses?idAndName=true", setCourses)
	}, [])

	/*
	 * Handle Instructor selects
	 */
	const handleCourseIds = (id) => {
		if (id) {
			var exists = courseIds.includes(id)

			var newCourseIds = exists
				? courseIds.filter((item) => item != id)
				: [...courseIds, id]

			setCourseIds(newCourseIds)
		}
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/instructors/${id}`, {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
			education: education,
			originLocation: originLocation,
			currentLocation: currentLocation,
			facultyId: facultyId,
			departmentId: departmentId,
			courseIds: courseIds,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Reload page
				window.location.reload()
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="col-sm-2"></div>
					<div className="col-sm-4">
						<input
							type="text"
							name="name"
							defaultValue={instructor.name}
							className="form-control mb-2 me-2"
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							name="email"
							defaultValue={instructor.email}
							className="form-control mb-2 me-2"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="tel"
							name="phone"
							defaultValue={instructor.phone}
							className="form-control mb-2 me-2"
							onChange={(e) => setPhone(e.target.value)}
						/>

						<select
							name="gender"
							className="form-control mb-3 me-2"
							onChange={(e) => setGender(e.target.value)}>
							<option value="">Select Gender</option>
							<option
								value="male"
								selected={instructor.gender == "male"}>
								Male
							</option>
							<option
								value="female"
								selected={instructor.gender == "female"}>
								Female
							</option>
						</select>

						<select
							type="text"
							name="nationality"
							className="form-control mb-2 me-2"
							onChange={(e) => setOriginLocation(e.target.value)}>
							<option value="">Nationality</option>
							{Countries().map((country, key) => (
								<option
									key={key}
									value={country}
									selected={instructor.originLocation == country}>
									{country}
								</option>
							))}
						</select>

						<select
							type="text"
							name="currentLocation"
							className="form-control mb-2 me-2"
							onChange={(e) => setCurrentLocation(e.target.value)}>
							<option value="">Current Country</option>
							{Countries().map((country, key) => (
								<option
									key={key}
									value={country}
									selected={instructor.currentLocation == country}>
									{country}
								</option>
							))}
						</select>
					</div>

					<div className="col-sm-4">
						<select
							name="education"
							className="form-control mb-3 me-2 text-capitalize"
							onChange={(e) => setEducation(e.target.value)}>
							<option value="">Select Education</option>
							{educationList.map((education, key) => (
								<option
									key={key}
									value={education}
									className="text-capitalize"
									selected={instructor.education == education}>
									{education}
								</option>
							))}
						</select>

						<select
							name="facultyId"
							className="form-control mb-3 me-2"
							onChange={(e) => setFacultyId(e.target.value)}>
							<option value="remove">Select Faculty</option>
							{faculties.map((faculty, key) => (
								<option
									key={key}
									value={faculty.id}
									selected={instructor.facultyId == faculty.id}>
									{faculty.name}
								</option>
							))}
						</select>

						<select
							name="departmentId"
							className="form-control mb-3 me-2"
							onChange={(e) => setDepartmentId(e.target.value)}>
							<option value="remove">Select Department</option>
							{departments
								.filter((department) => department.facultyId == facultyId)
								.map((department, key) => (
									<option
										key={key}
										value={department.id}
										selected={instructor.departmentId == department.id}>
										{department.name}
									</option>
								))}
						</select>

						<div className="d-flex">
							<select
								name="courseId"
								className="form-control mb-3 me-2"
								onChange={(e) =>
									handleCourseIds(Number.parseInt(e.target.value))
								}
								disabled={courseIds.length > 0}>
								<option value="">Select Course</option>
								{courses
									.filter((course) => course.departmentId == departmentId)
									.map((course, key) => (
										<option
											key={key}
											value={course.id}
											className="text-primary"
											selected={course.id == courseIds[0]}>
											{course.name}
										</option>
									))}
							</select>
							{/* Close Icon */}
							<span
								className="text-primary"
								style={{ cursor: "pointer" }}
								onClick={() => setCourseIds(courseIds.slice(0, 0))}>
								<CloseSVG />
							</span>
							{/* Close Icon End */}
						</div>

						{courseIds.map((input, key1) => (
							<div
								className="d-flex"
								key={key1}>
								<select
									name="courseId"
									className="form-control mb-3 me-2"
									onChange={(e) =>
										handleCourseIds(Number.parseInt(e.target.value))
									}
									disabled={courseIds.length > key1 + 1}>
									<option value="">Select Course</option>
									{courses
										.filter((course) => course.departmentId == departmentId)
										.map((course, key2) => (
											<option
												key={key2}
												value={!courseIds.includes(course.id) && course.id}
												className={
													courseIds.includes(course.id)
														? "text-secondary"
														: "text-primary"
												}
												selected={course.id == courseIds[key1 + 1]}>
												{course.name}
											</option>
										))}
								</select>
								{/* Close Icon */}
								<span
									className={
										key1 == courseIds.length - 1
											? "invisible text-primary"
											: "text-primary"
									}
									style={{ cursor: "pointer" }}
									onClick={() =>
										setCourseIds(
											courseIds.filter((courseId, index) => index != key1 + 1)
										)
									}>
									<CloseSVG />
								</span>
								{/* Close Icon End */}
							</div>
						))}
					</div>
					<div className="col-sm-2"></div>
				</div>

				<center className="mt-4 mb-5">
					<Btn
						btnText="update"
						loading={loading}
					/>

					<br />
					<br />

					<MyLink
						linkTo="/instructors"
						text="back to instructors"
					/>
				</center>
			</form>
		</div>
	)
}

export default edit
