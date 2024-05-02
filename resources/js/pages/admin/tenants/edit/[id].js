import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import DeleteSVG from "@/svgs/DeleteSVG"
import LogoutSVG from "@/svgs/LogoutSVG"

const edit = (props) => {
	var { id } = useParams()
	var history = useHistory()

	const [tenant, setTenant] = useState({})
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Tenant", path: ["properties", "edit"] })

		Axios.get(`/api/tenants/${id}`).then((res) => {
			setTenant(res.data.data)
			// Set page
			props.setPage({
				name: "Edit Tenant",
				path: [
					"properties",
					`properties/${res.data.data.propertyId}/show`,
					`units/${res.data.data.unitId}/show`,
					"edit",
				],
			})
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
				// Refresh page
				props.get(`tenants/${id}`, setTenant)
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
						className="form-control mb-2"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						name="email"
						defaultValue={tenant.email}
						className="form-control mb-2"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="tel"
						name="phone"
						defaultValue={tenant.phone}
						className="form-control mb-2"
						onChange={(e) => setPhone(e.target.value)}
					/>

					<select
						name="gender"
						className="form-control mb-3 mb-2"
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

					<center>
						<Btn
							text="update"
							className="mb-2"
							loading={loading}
						/>
					</center>
				</form>

				<center>
					<MyLink
						linkTo={`/units/${tenant.unitId}/show`}
						icon={<BackSVG />}
						text="back to unit"
					/>
				</center>
			</div>
		</div>
	)
}

export default edit
