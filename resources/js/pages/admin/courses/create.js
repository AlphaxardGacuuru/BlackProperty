import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const create = (props) => {
	var history = useHistory()

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
		props.setPage({ name: "Add Course", path: ["courses", "create"] })
		props.get("departments", setDepartments)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/courses", {
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
				// Redirect to Courses
				setTimeout(() => history.push("/admin/courses"), 500)
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

					<textarea
						type="text"
						name="description"
						placeholder="Description"
						className="form-control mb-2 me-2"
						rows="10"
						onChange={(e) => setDescription(e.target.value)}
						required={true}></textarea>

					<input
						type="number"
						name="duration"
						placeholder="Duration in months"
						className="form-control mb-2 me-2"
						onChange={(e) => setDuration(e.target.value)}
						required={true}
					/>

					<input
						type="number"
						name="price"
						placeholder="Price"
						className="form-control mb-2 me-2"
						onChange={(e) => setPrice(e.target.value)}
						required={true}
					/>

					<select
						name="departmentId"
						className="form-control mb-3 me-2"
						onChange={(e) => setDepartmentId(e.target.value)}
						required={true}>
						<option value="">Select Department</option>
						{departments.map((department, key) => (
							<option
								key={key}
								value={department.id}>
								{department.name}
							</option>
						))}
					</select>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							btnText="add course"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo="/courses"
							text="back to courses"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
