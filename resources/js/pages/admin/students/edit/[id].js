import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const edit = (props) => {
	var { id } = useParams()

	const [student, setStudent] = useState({})
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [facultyId, setFacultyId] = useState()
	const [departmentId, setDepartmentId] = useState()
	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Student", path: ["students", "edit"] })

		Axios.get(`/api/students/${id}`).then((res) => {
			setStudent(res.data.data)
			setFacultyId(res.data.data.facultyId.toString())
		})
		props.get("faculties", setFaculties)
		props.get("departments", setDepartments)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/students/${id}`, {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
			facultyId: facultyId,
			departmentId: departmentId,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
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
						placeholder={student.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						name="email"
						placeholder={student.email}
						className="form-control mb-2 me-2"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="tel"
						name="phone"
						placeholder={student.phone}
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
							selected={student.gender == "male"}>
							Male
						</option>
						<option
							value="female"
							selected={student.gender == "female"}>
							Female
						</option>
					</select>

					<select
						name="facultyId"
						className="form-control mb-3 me-2"
						onChange={(e) => setFacultyId(e.target.value)}>
						<option value="">Select Faculty</option>
						{faculties.map((faculty, key) => (
							<option
								key={key}
								value={faculty.id}
								selected={student.facultyId == faculty.id}>
								{faculty.name}
							</option>
						))}
					</select>

					<select
						name="departmentId"
						className="form-control mb-3 me-2"
						onChange={(e) => setDepartmentId(e.target.value)}>
						<option value="">Select Department</option>
						{departments
							.filter((department) => department.facultyId == facultyId)
							.map((department, key) => (
								<option
									key={key}
									value={department.id}
									selected={student.departmentId == department.id}>
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

					<center>
						<MyLink
							linkTo="/students"
							text="back to students"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
