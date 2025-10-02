import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"

const edit = (props) => {
	var { id } = useParams()

	const [visitorAdmission, setVisitorAdmission] = useState({})
	const [tenants, setTenants] = useState([])

	const [firstName, setFirstName] = useState()
	const [middleName, setMiddleName] = useState()
	const [lastName, setLastName] = useState()
	const [nationalID, setNationalID] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [propertyId, setPropertyId] = useState()
	const [tenantId, setTenantId] = useState()

	const [loading, setLoading] = useState()

	// Get Visitor Admissions
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Visitor Admission",
			path: ["visitor-admissions", "edit"],
		})

		// Fetch Visitor Admission
		props.get(`visitor-admissions/${id}`, setVisitorAdmission)

		// Fetch Tenants
		props.get(
			`tenants?propertyId=${props.auth.propertyIds}&idAndName=true`,
			setTenants
		)
	}, [])

	useEffect(() => {
		if (visitorAdmission.propertyId) {
			setPropertyId(visitorAdmission.propertyId)
		}
	}, [visitorAdmission])
	console.info(propertyId)

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/visitor-admissions/${id}`, {
			firstName: firstName,
			middleName: middleName,
			lastName: lastName,
			nationalID: nationalID,
			email: email,
			phone: phone,
			propertyId: propertyId,
			tenantId: tenantId,
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
					{/* First Name Start */}
					<label htmlFor="">First Name</label>
					<input
						type="text"
						name="name"
						placeholder="First Name"
						className="form-control mb-2"
						defaultValue={visitorAdmission.firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required={true}
					/>
					{/* First Name End */}

					{/* Middle Name Start */}
					<label htmlFor="">Middle Name</label>
					<input
						type="text"
						name="name"
						placeholder="Middle Name"
						className="form-control mb-2"
						defaultValue={visitorAdmission.middleName}
						onChange={(e) => setMiddleName(e.target.value)}
						required={true}
					/>
					{/* Middle Name End */}

					{/* Last Name Start */}
					<label htmlFor="">Last Name</label>
					<input
						type="text"
						name="name"
						placeholder="Last Name"
						className="form-control mb-2"
						defaultValue={visitorAdmission.lastName}
						onChange={(e) => setLastName(e.target.value)}
						required={true}
					/>
					{/* Last Name End */}

					{/* National ID Start */}
					<label htmlFor="">National ID</label>
					<input
						type="number"
						name="name"
						placeholder="National ID"
						className="form-control mb-2"
						defaultValue={visitorAdmission.nationalID}
						onChange={(e) => setNationalID(e.target.value)}
						required={true}
					/>
					{/* National ID End */}

					{/* Email Start */}
					<label htmlFor="">Email</label>
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="form-control mb-2 me-2"
						defaultValue={visitorAdmission.email}
						onChange={(e) => setEmail(e.target.value)}
						required={true}
					/>
					{/* Email End */}

					{/* Phone Start */}
					<label htmlFor="">Phone</label>
					<div className="d-flex align-items-center bg-white mb-2">
						{/* <div className="p-2">+254</div> */}
						<input
							type="text"
							id="phone"
							name="phone"
							pattern="[0-9]{10}"
							className="form-control has-validation"
							placeholder="0712345678"
							defaultValue={visitorAdmission.phone}
							onChange={(e) => setPhone(e.target.value)}
							required={true}
							title="Please enter a valid 10-digit phone number"
						/>
					</div>
					{/* Phone End */}

					{/* Property */}
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
									selected={property.id == visitorAdmission.propertyId}>
									{property.name}
								</option>
							))}
					</select>
					{/* Property End */}

					{/* Tenant */}
					<label htmlFor="">Tenant</label>
					<select
						type="text"
						name="type"
						placeholder="Location"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setTenantId(e.target.value)}
						required={true}>
						{[{ id: "", name: "Select Tenant" }]
							.concat(
								tenants.filter((tenant) => tenant.propertyId == propertyId)
							)
							.map((tenant, key) => (
								<option
									key={key}
									value={tenant.userUnitId}
									selected={tenant.userUnitId == visitorAdmission.tenantId}>
									{tenant.name}
								</option>
							))}
					</select>
					{/* Tenant End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="request visitor admission"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo={`/visitor-admissions`}
							icon={<BackSVG />}
							text="go to visitor admissions"
						/>
					</div>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
