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
	const { unitId } = useParams()
	var history = useHistory()

	const [unit, setUnit] = useState({})

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

	const [type, setType] = useState()
	const [reading, setReading] = useState()
	const [month, setMonth] = useState(props.currentMonth)
	const [year, setYear] = useState(props.currentYear)
	const [loading, setLoading] = useState()

	// Get Water Readings
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Water Reading",
			path: ["units", `units/${unitId}/show`, "water-readings", "create"],
		})

		// Fetch Tenants
		props.get(`units/${unitId}`, setUnit)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/water-readings", {
			type: type,
			waterReadings: [
				{
					userUnitId: unit.currentUserUnitId,
					reading: reading,
				},
			],
			month: month,
			year: year,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])

				// Check if readings saved
				if (res.data.message.match("Successfully")) {
					// Redirect to Deductions
					setTimeout(() => history.push(`/admin/units/${unitId}/show`), 500)
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
					{/* Water Reading Start */}
					<label
						htmlFor=""
						className="ms-1 mb-1">
						{unit.name}
					</label>
					<input
						type="number"
						placeholder="8"
						className="form-control mb-2"
						onChange={(e) => setReading(e.target.value)}
					/>
					{/* Water Reading End */}

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

					<div className="d-flex justify-content-center mb-2">
						<MyLink
							linkTo={`/units/${unitId}/show`}
							icon={<BackSVG />}
							text="back to unit"
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
