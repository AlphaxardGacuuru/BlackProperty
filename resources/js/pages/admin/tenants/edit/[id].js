import React, { useEffect, useState } from "react"
import {
	useHistory,
	useLocation,
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
	const location = useLocation()

	const isInTenant = location.pathname.match("/tenant/")

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

		props.get(`tenants/${id}`, setTenant)
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
					{/* Name Start */}
					<label htmlFor="">Name</label>
					<input
						type="text"
						name="name"
						defaultValue={tenant.name}
						className="form-control mb-2"
						onChange={(e) => setName(e.target.value)}
					/>
					{/* Name End */}

					{/* Email Start */}
					<label htmlFor="">Email</label>
					<input
						type="text"
						name="email"
						defaultValue={tenant.email}
						className="form-control mb-2"
						onChange={(e) => setEmail(e.target.value)}
						disabled={true}
					/>
					{/* Name End */}

					{/* Phone Start */}
					<label htmlFor="">Phone</label>
					<input
						type="tel"
						name="phone"
						defaultValue={tenant.phone}
						className="form-control mb-2"
						onChange={(e) => setPhone(e.target.value)}
					/>
					{/* Phone End */}

					{/* Gender Start */}
					<label htmlFor="">Gender</label>
					<select
						name="gender"
						className="form-control mb-3"
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
					{/* Gender End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update"
							className="mb-2"
							loading={loading}
						/>
					</div>
				</form>

				{isInTenant ? (
					<div className="d-flex justify-content-center mb-1">
						<MyLink
							linkTo={`/tenants/${props.auth.id}/show`}
							icon={<BackSVG />}
							text="back to dashboard"
							className="mb-2"
						/>
					</div>
				) : (
					<React.Fragment>
						<div className="d-flex justify-content-center mb-1">
							<MyLink
								linkTo={`/units/${tenant.unitId}/show`}
								icon={<BackSVG />}
								text="back to unit"
								className="mb-2"
							/>
						</div>
						<div className="d-flex justify-content-center mb-2">
							<MyLink
								linkTo={`/tenants`}
								icon={<BackSVG />}
								text="back to tenants"
								className="mb-2"
							/>
						</div>
					</React.Fragment>
				)}
			</div>
		</div>
	)
}

export default edit
