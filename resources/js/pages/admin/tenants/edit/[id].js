import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	var { id } = useParams()

	const [tenant, setTenant] = useState({})
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Tenant", path: ["tenants", "edit"] })

		Axios.get(`/api/tenants/${id}`).then((res) => {
			setTenant(res.data.data)
			setFacultyId(res.data.data.facultyId.toString())
			setDepartmentId(res.data.data.departmentId.toString())
			setCourseIds(res.data.data.courseIds)
		})
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/tenants/${id}`, {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
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
		<div className="row">
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="name"
						defaultValue={tenant.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						name="email"
						defaultValue={tenant.email}
						className="form-control mb-2 me-2"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="tel"
						name="phone"
						defaultValue={tenant.phone}
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
							selected={tenant.gender == "male"}>
							Male
						</option>
						<option
							value="female"
							selected={tenant.gender == "female"}>
							Female
						</option>
					</select>

					<center className="mt-4 mb-5">
						<Btn
							btnText="update"
							loading={loading}
						/>

						<br />
						<br />

						<MyLink
							linkTo="/tenants"
							icon={<BackSVG />}
							text="back to tenants"
						/>
					</center>
				</form>
			</div>
		</div>
	)
}

export default edit
