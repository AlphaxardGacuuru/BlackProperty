import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})
	const [property, setProperty] = useState({})

	const [name, setName] = useState()
	const [rent, setRent] = useState()
	const [deposit, setDeposit] = useState()
	const [type, setType] = useState(unit.type)
	const [bedrooms, setBedrooms] = useState()
	const [size, setSize] = useState({})
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Unit",
			path: ["properties", "edit"],
		})

		// Fetch Unit
		Axios.get(`api/units/${id}`).then((res) => {
			// Set page
			props.setPage({
				name: "Edit Unit",
				path: [
					"properties",
					`properties/${res.data.data.propertyId}/show`,
					"edit",
				],
			})

			setUnit(res.data.data)
			// Fetch Property
			props.get(`properties/${res.data.data.propertyId}`, setProperty)
		})
	}, [])

	const apartments = ["apartment", "shop", "office"]

	const getDeposit = (e) => {
		var rent = e.target.value
		var formula = property.depositFormula
		// Evaluate the formula
		return eval(formula?.replace("r", rent))
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/units/${id}`, {
			name: name,
			rent: rent,
			deposit: deposit?.toString(),
			type: type,
			bedrooms: bedrooms,
			size: size,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Fetch unit
				props.get(`units/${id}`, setUnit)
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
				<form
					onSubmit={onSubmit}
					className="mb-5">
					<label htmlFor="">Name</label>
					<input
						type="text"
						placeholder="A1"
						defaultValue={unit.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>

					<label htmlFor="">Rent</label>
					<input
						type="number"
						placeholder="20000"
						defaultValue={unit.rent?.replace(/,/g, "")}
						className="form-control mb-2 me-2"
						onChange={(e) => {
							setRent(e.target.value)
							setDeposit(getDeposit(e))
						}}
					/>

					<label htmlFor="">Deposit</label>
					<input
						type="number"
						placeholder="5000"
						defaultValue={unit.deposit}
						className="form-control mb-2 me-2"
						onChange={(e) => setDeposit(e.target.value)}
					/>

					<label htmlFor="">Type</label>
					<select
						type="text"
						name="type"
						placeholder="Location"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setType(e.target.value)}>
						{apartments.map((apartment, key) => (
							<option
								key={key}
								value={apartment}
								selected={unit.type == apartment}>
								{apartment}
							</option>
						))}
					</select>

					{type == "apartment" ? (
						<React.Fragment>
							{/* Bedrooms */}
							<label htmlFor="">Bedrooms</label>
							<input
								type="number"
								placeholder="2"
								min="0"
								className="form-control mb-2 me-2"
								onChange={(e) => setBedrooms(e.target.value)}
								required={true}
							/>
							{/* Bedrooms End */}
						</React.Fragment>
					) : (
						<React.Fragment>
							{/* Size */}
							<label htmlFor="">Size</label>
							<div className="d-flex justify-content-between mb-2">
								<input
									type="number"
									placeholder="243"
									className="form-control me-2"
									defaultValue={unit.size?.value}
									onChange={(e) =>
										setSize({ value: e.target.value, unit: size.unit })
									}
									required={true}
								/>

								<select
									type="number"
									className="form-control"
									onChange={(e) =>
										setSize({ value: size.value, unit: e.target.value })
									}
									required={true}>
									<option value="">Select Unit</option>
									<option
										value="meters_squared"
										selected={unit.size?.unit == "meters_squared"}>
										m&sup2;
									</option>
									<option
										value="square_feet"
										selected={unit.size?.unit == "square_feet"}>
										ft&sup2;
									</option>
								</select>
							</div>
							{/* Size End */}
						</React.Fragment>
					)}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update"
							loading={loading}
						/>
					</div>

					<center>
						<MyLink
							linkTo={`/properties/${unit.propertyId}/show`}
							icon={<BackSVG />}
							text="back to property"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
