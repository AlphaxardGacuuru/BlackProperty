import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const edit = (props) => {
	var { id } = useParams()

	const [course, setCourse] = useState({})

	const [name, setName] = useState()
	const [description, setDescription] = useState()
	const [duration, setDuration] = useState()
	const [price, setPrice] = useState()
	const [facultyId, setFacultyId] = useState()
	const [departmentId, setDepartmentId] = useState()
	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])
	const [loading, setLoading] = useState()

	// Get Courses and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Course", path: ["courses", "edit"] })
		props.get("departments", setDepartments)

		Axios.get(`/api/courses/${id}`).then((res) => {
			setCourse(res.data.data)
			setDepartmentId(res.data.data.departmenrId.toString())
		})
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/courses/${id}`, {
			name: name,
			description: description,
			duration: duration,
			price: price,
			departmentId: departmentId,
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
						defaultValue={course.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>

					<textarea
						type="text"
						name="description"
						defaultValue={course.description}
						className="form-control mb-2 me-2"
						rows="10"
						onChange={(e) => setDescription(e.target.value)}></textarea>

					<input
						type="number"
						name="duration"
						defaultValue={course.duration}
						className="form-control mb-2 me-2"
						onChange={(e) => setDuration(e.target.value)}
					/>

					<input
						type="number"
						name="price"
						defaultValue={course.price}
						className="form-control mb-2 me-2"
						onChange={(e) => setPrice(e.target.value)}
					/>

					<select
						name="departmentId"
						className="form-control mb-3 me-2"
						onChange={(e) => setDepartmentId(e.target.value)}>
						<option value="">Select Department</option>
						{departments.map((department, key) => (
							<option
								key={key}
								value={department.id}
								selected={course.departmentId == department.id}>
								{department.name}
							</option>
						))}
					</select>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							btnText="update"
							loading={loading}
						/>
					</div>

					<center className="mb-5">
						<MyLink
							linkTo="/courses"
							text="back to courses"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
