import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	var { id } = useParams()

	const [staff, setStaff] = useState({})
	const [roles, setRoles] = useState([])
	const [userRoles, setUserRoles] = useState([])

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [propertyId, setPropertyId] = useState()
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Staff", path: ["staff", "edit"] })
		// Fetch Staff
		Axios.get(`api/staff/${id}`)
			.then((res) => {
				setStaff(res.data.data)
				setUserRoles(res.data.data.roles.map((role) => role.id))
				// Set page
				props.setPage({
					name: "Edit Staff",
					path: [
						"properties",
						`properties/${res.data.data.propertyId}/show`,
						"edit",
					],
				})
			})
			.catch((err) => props.getErrors(err))
			
		// Fetch Roles
		props.get("roles", setRoles)
	}, [])

	// Handle Permission checkboxes
	const handleUserRoles = (roleId) => {
		var exists = userRoles.includes(roleId)

		var newRoles = exists
			? userRoles.filter((item) => item != roleId)
			: [...userRoles, roleId]

		setUserRoles(newRoles)
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/staff/${id}`, {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
			userRoles: userRoles,
			propertyId: propertyId,
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
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<form onSubmit={onSubmit}>
					<div className="row">
						<div className="col-sm-6">
							<label htmlFor="">Name</label>
							<input
								type="text"
								name="name"
								placeholder="John Doe"
								defaultValue={staff.name}
								className="form-control mb-2 me-2"
								onChange={(e) => setName(e.target.value)}
							/>
							</div>
						<div className="col-sm-6">

							<label htmlFor="">Email</label>
							<input
								type="text"
								placeholder="johndoe@gmail.com"
								defaultValue={staff.email}
								className="form-control mb-2 me-2"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>

					<label htmlFor="">Phone</label>
					<input
						type="tel"
						placeholder="0722123456"
						defaultValue={staff.phone}
						className="form-control mb-2 me-2"
						onChange={(e) => setPhone(e.target.value)}
					/>

					<label htmlFor="">Gender</label>
					<select
						name="gender"
						className="form-control mb-3 me-2"
						onChange={(e) => setGender(e.target.value)}>
						<option value="">Select Gender</option>
						<option
							value="male"
							selected={staff.gender == "male"}>
							Male
						</option>
						<option
							value="female"
							selected={staff.gender == "female"}>
							Female
						</option>
					</select>

					{/* Property Start */}
					<label htmlFor="">Property</label>
					<select
						type="text"
						name="type"
						placeholder="Location"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setPropertyId(e.target.value)}
						required={true}>
						{[{ id: "", name: "Select Property" }]
							.concat(props.properties)
							.map((property, key) => (
								<option
									key={key}
									value={property.id}
									selected={property.id == staff.propertyId}>
									{property.name}
								</option>
							))}
					</select>
					{/* Property End */}

					{/* Roles */}
					<div className="form-group mt-4">
						<label
							htmlFor=""
							className="fw-bold ms-1">
							Roles
						</label>
						<div className="d-flex justify-content-start align-items-end flex-wrap">
							{roles.map((role, key) => (
								<div
									key={key}
									className="m-1 px-2">
									<label key={key}>
										<input
											type="checkbox"
											id=""
											name="entities"
											defaultChecked={staff.roleNames?.includes(role.name)}
											onClick={(e) => handleUserRoles(role.id)}
										/>
										<span className="text-capitalize me-2"> {role.name}</span>
									</label>
								</div>
							))}
						</div>
					</div>
					{/* Roles End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update"
							loading={loading}
						/>
					</div>

					<center className="mb-5">
						<MyLink
							linkTo={`/staff`}
							icon={<BackSVG />}
							text="back to staff"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
			<div className="col-sm-2"></div>
		</div>
	)
}

export default edit
