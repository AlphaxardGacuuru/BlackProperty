import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"
import EditSVG from "@/svgs/EditSVG"

const create = (props) => {
	const { unitId } = useParams()
	var history = useHistory()

	const types = ["rent", "water", "service_charge"]

	const [unit, setUnit] = useState({})

	const [type, setType] = useState()
	const [month, setMonth] = useState(props.currentMonth)
	const [year, setYear] = useState(props.currentYear)
	const [loading, setLoading] = useState()

	// Get Invoices
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Create Invoice",
			path: ["units", `units/${unitId}/show`, "invoices", "create"],
		})
		// Fetch Unit
		props.get(`units/${unitId}`, setUnit)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		if (showServiceChargeError()) {
			setLoading(false)
			return props.setErrors(["Property has no Service Charge"])
		}

		Axios.post("/api/invoices", {
			userUnitIds: [unit.currentUserUnitId],
			type: type,
			month: month,
			year: year,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])

				// Check if readings saved
				if (res.data.message.match("successfully")) {
					// Redirect to Invoices
					setTimeout(() => history.push(`/admin/invoices`), 500)
				}
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	const showServiceChargeError = () => {
		var serviceCharge = props.properties.find(
			(property) => property.id == unit.propertyId
		)?.serviceCharge

		var noServiceCharge = serviceCharge < 1

		if (type == "service_charge" && noServiceCharge) {
			return true
		} else {
			return false
		}
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					{/* No Service Charge Error */}
					{showServiceChargeError() && (
						<React.Fragment>
							<h4 className="bg-warning-subtle text-center mb-2 p-2">
								{
									props.properties.find(
										(property) => property.id == unit.propertyId
									).name
								}{" "}
								doesn't have Service Charge!
							</h4>

							<MyLink
								linkTo={`/properties/${unit.propertyId}/edit`}
								icon={<EditSVG />}
								text="add service charge"
								className="btn-sm w-100 mb-5"
							/>
						</React.Fragment>
					)}
					{/* No Service Charge Error End */}

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
								{type
									.split("_")
									.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(" ")}
							</option>
						))}
					</select>
					{/* Type End */}

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
							text="create invoices"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-2">
						<MyLink
							linkTo={`/units/${unitId}/show`}
							icon={<BackSVG />}
							text="back to unit"
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo={`/invoices`}
							icon={<BackSVG />}
							text="go to invoices"
						/>
					</div>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
