import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	var history = useHistory()

	const [tenants, setTenants] = useState([])

	const types = [
		{
			id: "council",
			name: "Council",
		},
		{
			id: "borehole",
			name: "Borehole",
		},
		{
			id: "tanker",
			name: "Tanker",
		},
	]

	const [propertyId, setPropertyId] = useState()
	const [type, setType] = useState()
	const [waterReadings, setWaterReadings] = useState([])
	const [month, setMonth] = useState(props.currentMonth)
	const [year, setYear] = useState(props.currentYear)
	const [loading, setLoading] = useState()

	// Get Water Readings
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Water Reading",
			path: ["water-readings", "create"],
		})

		// Fetch Tenants
		props.get(
			`tenants?propertyId=${props.auth.propertyIds}&occupied=true&idAndName=true`,
			setTenants
		)
	}, [])

	/*
	 * Handle Water Readings
	 */
	const handleWaterReadings = (reading, userUnitId) => {
		var exists = waterReadings.some(
			(waterReading) => waterReading.userUnitId == userUnitId
		)

		var newWaterReadings

		if (exists) {
			if (reading) {
				newWaterReadings = [
					...waterReadings.filter(
						(waterReading) => waterReading.userUnitId != userUnitId
					),
					{
						userUnitId: userUnitId,
						reading: reading,
					},
				]
			} else {
				newWaterReadings = waterReadings.filter(
					(waterReading) => waterReading.userUnitId != userUnitId
				)
			}
		} else {
			newWaterReadings = [
				...waterReadings,
				{
					userUnitId: userUnitId,
					reading: reading,
				},
			]
		}

		setWaterReadings(newWaterReadings)
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/water-readings", {
			type: type,
			waterReadings: waterReadings,
			month: month,
			year: year,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])

				// Check if readings saved
				if (res.data.message.match("Successfully")) {
					// Redirect to Water Readings
					setTimeout(() => history.push(`/admin/water-readings`), 500)
				}
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
					<div className="d-flex">
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

						{/* Type */}
						<select
							name="type"
							className="form-control text-capitalize mb-2 me-2"
							onChange={(e) => setType(e.target.value)}
							required={true}>
							<option value="">Select Type</option>
							{types.map((type, key) => (
								<option
									key={key}
									value={type.id}>
									{type.name}
								</option>
							))}
						</select>
						{/* Type End */}
					</div>

					{/* Tenants */}
					<div className="d-flex justify-content-center flex-wrap mb-2">
						{tenants
							.filter((tenant) => tenant.propertyId == propertyId)
							.map((tenant, key) => (
								<div
									key={key}
									className="mx-1">
									<label
										htmlFor=""
										className="ms-1 mb-1">
										{tenant.unitName}
									</label>
									<input
										type="number"
										className="form-control mb-1"
										onChange={(e) =>
											handleWaterReadings(e.target.value, tenant.userUnitId)
										}
									/>
								</div>
							))}
					</div>
					{/* Tenants End */}

					<div className="d-flex justify-content-start mb-2">
						{/* Month */}
						<select
							className="form-control me-2"
							onChange={(e) => setMonth(e.target.value)}>
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
							text="add water readings"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo={`/water-readings`}
							icon={<BackSVG />}
							text="back to water readings"
						/>
					</div>
					<div className="col-sm-2"></div>
				</form>
			</div>
		</div>
	)
}

export default create
