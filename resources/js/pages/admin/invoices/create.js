import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	var history = useHistory()

	const [tenants, setTenants] = useState([])

	const types = ["rent", "water", "service"]

	const [tenantIds, setTenantIds] = useState([])
	const [type, setType] = useState()
	const [loading, setLoading] = useState()

	// Get Invoices
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Invoice",
			path: ["invoices", "create"],
		})

		// Fetch Tenants
		props.auth.propertyIds.forEach((id) => {
			Axios.get(`api/tenants/by-property-id/${id}`).then((res) => {
				setTenants([...tenants, ...res.data.data])
			})
		})
	}, [])

	/*
	 * Handle Instructor selects
	 */
	const handleTenantIds = (id) => {
		if (id) {
			var exists = tenantIds.includes(id)

			var newTenantIds = exists
				? tenantIds.filter((item) => item != id)
				: [...tenantIds, id]

			setTenantIds(newTenantIds)
		}
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/invoices", {
			tenantIds: tenantIds,
			type: type,
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
					<div className="d-flex">
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

						{/* Tenants */}
						<select
							name="tenantId"
							className="form-control mb-2 me-2"
							onChange={(e) => {
								if (e.target.value == "all") {
									setTenantIds(["all"])
								} else {
									handleTenantIds(Number.parseInt(e.target.value))
								}
							}}
							disabled={tenantIds.length > 0}
							required={true}>
							<option value="">Select Tenant</option>
							<option value="all">All</option>
							{tenants.map((tenant, key) => (
								<option
									key={key}
									value={tenant.id}
									className="text-primary"
									selected={tenant.id == tenantIds[0]}>
									{tenant.name}
								</option>
							))}
						</select>
						{/* Close Icon */}
						<span
							className="text-primary"
							style={{ cursor: "pointer" }}
							onClick={() => setTenantIds(tenantIds.slice(0, 0))}>
							<CloseSVG />
						</span>
						{/* Close Icon End */}
					</div>

					{tenantIds.map((input, key1) => (
						<div
							className="d-flex"
							key={key1}>
							<select
								name="tenantId"
								className="form-control mb-2 me-2"
								onChange={(e) =>
									handleTenantIds(Number.parseInt(e.target.value))
								}
								disabled={tenantIds.length > key1 + 1}>
								<option value="">Select Tenant</option>
								{tenants.map((tenant, key2) => (
									<option
										key={key2}
										value={!tenantIds.includes(tenant.id) && tenant.id}
										className={
											tenantIds.includes(tenant.id)
												? "text-secondary"
												: "text-primary"
										}
										selected={tenant.id == tenantIds[key1 + 1]}>
										{tenant.name}
									</option>
								))}
							</select>
							{/* Close Icon */}
							<span
								className={
									key1 == tenantIds.length - 1
										? "invisible text-primary"
										: "text-primary"
								}
								style={{ cursor: "pointer" }}
								onClick={() =>
									setTenantIds(
										tenantIds.filter((tenantId, index) => index != key1 + 1)
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
							text="add invoice"
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
