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
					`properties/${res.data.data.unit.propertyId}/show`,
					`properties/unit/${res.data.data.unitId}/show`,
					"edit",
				],
			})
		})
	}, [])

	/*
	 * Vacate Tenant
	 */
	const onVacate = () => {
		Axios.put(`/api/tenants/${id}`, {
			unitId: tenant.unitId,
			vacate: true,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				history.push(`/admin/units/${tenant.unitId}/show`)
			})
			.catch((err) => props.getErrors(err))
	}

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
					{/* Confirm Delete Modal End */}
					<div
						className="modal fade"
						id={`deleteModal`}
						tabIndex="-1"
						aria-labelledby="deleteModalLabel"
						aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content rounded-0">
								<div className="modal-header">
									<h1
										id="deleteModalLabel"
										className="modal-title fs-5">
										Vacate Tenant
									</h1>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div>
								<div className="modal-body text-start text-wrap">
									Are you sure you want to vacate {tenant.name}.
								</div>
								<div className="modal-footer justify-content-between">
									<button
										type="button"
										className="mysonar-btn btn-2"
										data-bs-dismiss="modal">
										Close
									</button>
									<button
										type="button"
										className="mysonar-btn btn-2"
										data-bs-dismiss="modal"
										onClick={onVacate}>
										<span className="me-1">{<LogoutSVG />}</span>
										Vacate {tenant.name}
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* Confirm Delete Modal End */}

					{/* Button trigger modal */}
					<button
						type="button"
						className="mysonar-btn btn-2 mb-2"
						data-bs-toggle="modal"
						data-bs-target={`#deleteModal`}>
						<LogoutSVG /> Vacate tenant
					</button>

					<br />

					<MyLink
						linkTo="/tenants"
						icon={<BackSVG />}
						text="back to tenants"
					/>
				</center>
			</div>
		</div>
	)
}

export default edit
