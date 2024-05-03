import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	var history = useHistory()

	/*
	 * Get Previous Month
	 */
	const previousMonth = () => {
		var currentDate = new Date()

		// Calculate the date of the previous month
		var previousMonthDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() - 1,
			1
		)

		// Format the date as "YYYY-MM-DD"
		var previousMonthDateString = previousMonthDate.toISOString().slice(0, 10)

		return previousMonthDateString
	}

	const [tenants, setTenants] = useState([])
	const types = ["rent", "water", "service"]
	const months = [
		{ id: "01", name: "January" },
		{ id: "02", name: "February" },
		{ id: "03", name: "March" },
		{ id: "04", name: "April" },
		{ id: "05", name: "May" },
		{ id: "06", name: "June" },
		{ id: "07", name: "July" },
		{ id: "08", name: "August" },
		{ id: "09", name: "September" },
		{ id: "10", name: "October" },
		{ id: "11", name: "November" },
		{ id: "12", name: "December" },
	]

	const [userUnitIds, setUserUnitIds] = useState([])
	const [type, setType] = useState()
	const [month, setMonth] = useState({
		year: previousMonth().substring(0, 4),
		month: previousMonth().substring(5, 7),
	})
	const [loading, setLoading] = useState()

	// Fetch Tenants
	const fetchTenants = async () => {
		try {
			const promises = props.auth.propertyIds.map((id) => {
				return Axios.get(`api/tenants/by-property-id/${id}`).then(
					(res) => res.data.data
				)
			})
			const results = await Promise.all(promises)
			const allTenants = results.flat() // Flatten the array of arrays
			setTenants(allTenants)
		} catch (error) {
			console.error("Error fetching tenants:", error)
		}
	}

	// Get Invoices
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Invoice",
			path: ["invoices", "create"],
		})

		// Fetch Tenants
		fetchTenants()
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
		Axios.post("/api/invoices", {
			userUnitIds: userUnitIds,
			type: type,
			month: `${month.year}-${month.month}-01`,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Invoices
				setTimeout(() => history.push(`/admin/invoices`), 500)
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
					{/* Type */}
					<select
						type="text"
						name="type"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setType(e.target.value)}
						required={true}>
						<option value="">Select Invoice Type</option>
						{types.map((type, key) => (
							<option
								key={key}
								value={type}>
								{type}
							</option>
						))}
					</select>
					{/* Type End */}

					<div className="d-flex">
						{/* Tenants */}
						<select
							name="userUnitId"
							className="form-control mb-2 me-2"
							onChange={(e) => {
								if (e.target.value == "all") {
									setUserUnitIds(tenants.map((tenant) => tenant.userUnitId))
								} else {
									handleUserUnitIds(Number.parseInt(e.target.value))
								}
							}}
							disabled={userUnitIds.length > 0}
							required={true}>
							<option value="">Select Tenant</option>
							<option value="all">All</option>
							{tenants.map((tenant, key) => (
								<option
									key={key}
									value={tenant.userUnitId}
									className="text-primary"
									selected={tenant.userUnitId == userUnitIds[0]}>
									{tenant.name}
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
								{tenants.map((tenant, key2) => (
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

					{/* Month */}
					<div className="d-flex justify-content-start mb-2">
						<input
							type="number"
							defaultValue={previousMonth().substring(0, 4)}
							min="2000"
							max={previousMonth().substring(0, 4)}
							className="form-control me-2"
							onChange={(e) =>
								setMonth({ year: e.target.value, month: month.month })
							}
						/>

						<select
							className="form-control"
							onChange={(e) =>
								setMonth({ year: month.year, month: e.target.value })
							}>
							{months.map((month, key) => (
								<option
									key={key}
									value={month.id}
									selected={month.id == previousMonth().substring(5, 7)}>
									{month.name}
								</option>
							))}
						</select>
					</div>
					{/* Month End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="create invoice"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/invoices`}
							icon={<BackSVG />}
							text="back to invoices"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
