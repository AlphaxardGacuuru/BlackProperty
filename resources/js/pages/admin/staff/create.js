import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import Countries from "@/components/Core/Countries"

const create = (props) => {
	var history = useHistory()

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [originLocation, setOriginLocation] = useState()
	const [currentLocation, setCurrentLocation] = useState()
	const [roles, setRoles] = useState([])
	const [userRoles, setUserRoles] = useState([])
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Add Staff", path: ["staff", "create"] })
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
		Axios.post("/api/staff", {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
			originLocation: originLocation,
			currentLocation: currentLocation,
			userRoles: userRoles,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Staff
				setTimeout(() => history.push("/admin/staff"), 500)
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
						name="email"
						placeholder="Email"
						className="form-control mb-2 me-2"
						onChange={(e) => setEmail(e.target.value)}
						required={true}
					/>
					<input
						type="tel"
						name="phone"
						placeholder="Phone"
						className="form-control mb-2 me-2"
						onChange={(e) => setPhone(e.target.value)}
						required={true}
					/>

					<select
						name="gender"
						className="form-control mb-3 me-2"
						onChange={(e) => setGender(e.target.value)}
						required={true}>
						<option value="">Select Gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>

					<select
						type="text"
						name="nationality"
						className="form-control mb-2 me-2"
						onChange={(e) => setOriginLocation(e.target.value)}
						required={true}>
						<option value="">Nationality</option>
						{Countries().map((country, key) => (
							<option
								key={key}
								value={country}>
								{country}
							</option>
						))}
					</select>

					<select
						type="text"
						name="currentLocation"
						className="form-control mb-2 me-2"
						onChange={(e) => setCurrentLocation(e.target.value)}
						required={true}>
						<option value="">Current Country</option>
						{Countries().map((country, key) => (
							<option
								key={key}
								value={country}>
								{country}
							</option>
						))}
					</select>

					{/* Roles */}
					<div className="form-group">
						<label htmlFor="">Roles</label>
						<div className="d-flex justify-content-center flex-wrap">
							{roles.map((role, key) => (
								<div
									key={key}
									className="border-bottom m-1 p-2">
									<label key={key}>
										<input
											type="checkbox"
											id=""
											name="entities"
											onChange={(e) => handleUserRoles(role.id)}
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
							btnText="add staff"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo="/staff"
							text="back to staff"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
