import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	const history = useHistory()

	const [tenants, setTenants] = useState([])

	const [propertyId, setPropertyId] = useState()
	const [userUnitIds, setUserUnitIds] = useState([])
	const [description, setDescription] = useState()
	const [amount, setAmount] = useState()
	const [month, setMonth] = useState(props.currentMonth)
	const [year, setYear] = useState(props.currentYear)
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({
			name: "Create Credit Note",
			path: ["credit-notes", "create"],
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

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/credit-notes", {
			userUnitIds: userUnitIds,
			description: description,
			amount: amount,
			month: month,
			year: year,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])

				// Redirect to Deductions
				setTimeout(() => history.push(`/admin/credit-notes`), 500)
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

					{/* Amount */}
					<label htmlFor="">Amount</label>
					<input
						type="text"
						placeholder="20000"
						className="form-control mb-2"
						onChange={(e) => {
							let value = props.formatToCommas(e)

							setAmount(value)
						}}
						required={true}
					/>
					{/* Amount End */}

					{/* Description */}
					<label htmlFor="">Description</label>
					<textarea
						placeholder="For the Paint Job"
						className="form-control mb-2"
						rows="5"
						onChange={(e) => setDescription(e.target.value)}
						required={true}></textarea>
					{/* Description End */}

					<div className="d-flex justify-content-start mb-2">
						{/* Month */}
						<select
							className="form-control me-2"
							onChange={(e) => setMonth(e.target.value)}
							required={true}>
							{props.months.map((month, key) => (
								<option
									key={key}
									value={key}
									selected={key == props.currentMonth}>
									{month}
								</option>
							))}
						</select>
						{/* Month End */}

						{/* Year */}
						<select
							className="form-control"
							onChange={(e) => setYear(e.target.value)}>
							{props.years.map((year, key) => (
								<option
									key={key}
									value={year}
									selected={key == props.currentYear}>
									{year}
								</option>
							))}
						</select>
						{/* Year End */}
					</div>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="create credit note"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo={`/credit-notes`}
							icon={<BackSVG />}
							text="go to credit notes"
						/>
					</div>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
