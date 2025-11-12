import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"
import BackSVG from "@/svgs/BackSVG"

const create = (props) => {
	const history = useHistory()

	const [tenants, setTenants] = useState([])
	const [email, setEmail] = useState(true)
	const [sms, setSms] = useState(false)

	const [message, setMessage] = useState("")
	const [propertyId, setPropertyId] = useState()
	const [userUnitIds, setUserUnitIds] = useState([])
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({
			name: "Create Announcement",
			path: ["announcements", "create"],
		})

		// Fetch Tenants
		props.get(
			`tenants?propertyId=${props.auth.propertyIds}&idAndName=true`,
			setTenants
		)
	}, [])

	/*
	 * Handle UserUnit selects
	 */
	const handleUserUnitIds = (id) => {
		if (id) {
			var exists = userUnitIds.includes(id)

			var newUserUnitIds = exists
				? userUnitIds.filter((item) => item != id)
				: [...userUnitIds, id]

			setUserUnitIds(newUserUnitIds)
		}
	}

	const onSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		const channels = [email ? "email" : null, sms ? "sms" : null].filter(
			Boolean
		)

		// Create Announcement
		Axios.post("/api/announcements", {
			message: message,
			channels: channels,
			userUnitIds: userUnitIds,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Redirect to announcements list
				history.push("/admin/announcements")
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					{/* Message */}
					<label htmlFor="message">Message</label>
					<div className="card shadow-sm p-4 mb-2">
						<label htmlFor="message">Dear Tenant,</label>
						<textarea
							name="message"
							placeholder="Write your Announcement here"
							rows="10"
							className="form-control text-capitalize mb-2 me-2"
							onChange={(e) => setMessage(e.target.value)}
							required={true}></textarea>
						<label htmlFor="message">
							Thank you for choosing Black Property!
						</label>
						<label htmlFor="message">
							Regards,
							<br />
							Black Property.
						</label>
					</div>
					{/* Message End */}

					{/* Channel Start */}
					<label htmlFor="">Announcement Channel</label>
					<div className="d-flex justify-content-start ms-4 mb-2">
						{/* Email Switch Start */}
						<div className="form-check form-switch me-5">
							<input
								id="email"
								className="form-check-input"
								type="checkbox"
								role="switch"
								onChange={(e) => setEmail(e.target.checked)}
								defaultChecked={true}
							/>
							<label
								className="form-check-label"
								htmlFor="email">
								Email
							</label>
						</div>
						{/* Email Switch End */}
						{/* SMS Switch Start */}
						{/* <div className="form-check form-switch">
							<input
								id="sms"
								className="form-check-input me-2"
								type="checkbox"
								role="switch"
								onChange={(e) => setSms(e.target.checked)}
							/>
							<label
								className="form-check-label"
								htmlFor="sms">
								SMS
							</label>
						</div> */}
						{/* SMS Switch End */}
					</div>
					{/* Channel End */}

					{/* Properties */}
					<select
						name="property"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setPropertyId(e.target.value)}
						required={true}>
						<option value="">Select Property</option>
						{props.properties.map((property, key) => (
							<option
								key={key}
								value={property.id}>
								{property.name}
							</option>
						))}
					</select>
					{/* Properties End */}

					<h6 className="text-center mb-2">
						{userUnitIds.length} tenants selected
					</h6>

					{/* Tenants */}
					<div className="d-flex">
						<select
							name="userUnitId"
							className="form-control mb-2 me-2"
							onChange={(e) => {
								if (e.target.value == "all") {
									setUserUnitIds(
										tenants
											.filter((tenant) => tenant.propertyId == propertyId)
											.map((tenant) => tenant.userUnitId)
									)
								} else {
									handleUserUnitIds(Number.parseInt(e.target.value))
								}
							}}
							disabled={userUnitIds.length > 0}
							required={true}>
							<option value="">Select Tenant</option>
							{/* Show option "All" if propertyId is selected */}
							{propertyId && <option value="all">All</option>}

							{tenants
								.filter((tenant) => tenant.propertyId == propertyId)
								.map((tenant, key) => (
									<option
										key={key}
										value={tenant.userUnitId}
										className="text-primary"
										selected={tenant.userUnitId == userUnitIds[0]}>
										{tenant.name} - {tenant.unitName}
									</option>
								))}
						</select>
						{/* Close Icon */}
						<span
							className="text-primary"
							style={{ cursor: "pointer" }}
							onClick={() => setUserUnitIds(userUnitIds.slice(0, 0))}>
							<CloseSVG />
						</span>
						{/* Close Icon End */}
					</div>

					{userUnitIds.map((input, key1) => (
						<div
							className="d-flex"
							key={key1}>
							<select
								name="userUnitId"
								className="form-control mb-2 me-2"
								onChange={(e) =>
									handleUserUnitIds(Number.parseInt(e.target.value))
								}
								disabled={userUnitIds.length > key1 + 1}>
								<option value="">Select Tenant</option>
								{tenants
									.filter((tenant) => tenant.propertyId == propertyId)
									.map((tenant, key2) => (
										<option
											key={key2}
											value={
												!userUnitIds.includes(tenant.userUnitId) &&
												tenant.userUnitId
											}
											className={
												userUnitIds.includes(tenant.userUnitId)
													? "text-secondary"
													: "text-primary"
											}
											selected={tenant.userUnitId == userUnitIds[key1 + 1]}>
											{tenant.name}
										</option>
									))}
							</select>
							{/* Close Icon */}
							<span
								className={
									key1 == userUnitIds.length - 1
										? "invisible text-primary"
										: "text-primary"
								}
								style={{ cursor: "pointer" }}
								onClick={() =>
									setUserUnitIds(
										userUnitIds.filter((userUnitId, index) => index != key1 + 1)
									)
								}>
								<CloseSVG />
							</span>
							{/* Close Icon End */}
						</div>
					))}
					{/* Tenants End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="create announcement"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo={`/invoices`}
							icon={<BackSVG />}
							text="go to announcements"
						/>
					</div>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
