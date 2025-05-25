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
	const [waterReading, setWaterReading] = useState({})
	const [reading, setReading] = useState()
	const [month, setMonth] = useState()
	const [year, setYear] = useState()

	const [loading, setLoading] = useState()

	// Get Water Readings
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Water Reading",
			path: ["water-readings", "edit"],
		})

		// Fetch Water Reading
		Axios.get(`api/water-readings/${id}`)
			.then((res) => {
				setWaterReading(res.data.data)
				setType(res.data.data.type)
				setReading(res.data.data.reading)
				setMonth(res.data.data.month)
				setYear(res.data.data.year)
			})
			.catch((err) => props.setErrors(["Failed to fetch Water Reading"]))
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.put(`/api/water-readings/${id}`, {
			type: type,
			reading: reading,
			month: month,
			year: year,
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
					<h5 className="ms-1 mb-2">{waterReading.unitName}</h5>

					{/* Type */}
					<select
						name="type"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setType(e.target.value)}
						disabled={true}>
						<option value="">Select Type</option>
						{types.map((type, key) => (
							<option
								key={key}
								value={type.id}
								selected={type.id == waterReading.type}>
								{type.name}
							</option>
						))}
					</select>
					{/* Type End */}

					{/* Reading */}
					<input
						type="number"
						defaultValue={waterReading.reading}
						className="form-control mb-2"
						onChange={(e) => setReading(e.target.value)}
					/>
					{/* Reading End */}

					<div className="d-flex justify-content-start mb-2">
						{/* Month */}
						<select
							className="form-control me-2"
							onChange={(e) => setMonth(e.target.value)}
							disabled={true}>
							{props.months.map((month, key) => (
								<option
									key={key}
									value={key}
									selected={key == waterReading.month}>
									{month}
								</option>
							))}
						</select>
						{/* Month End */}

						{/* Year */}
						<select
							className="form-control"
							onChange={(e) => setYear(e.target.value)}
							disabled={true}>
							{props.years.map((year, key) => (
								<option
									key={key}
									value={year}
									selected={key == waterReading.currentYear}>
									{year}
								</option>
							))}
						</select>
						{/* Year End */}
					</div>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update water reading"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-2">
						<MyLink
							linkTo={`/units/${waterReading.unitId}/show`}
							icon={<BackSVG />}
							text="back to unit"
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/water-readings`}
							icon={<BackSVG />}
							text="back to water readings"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
