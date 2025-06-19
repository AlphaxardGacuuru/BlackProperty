import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import BackSVG from "@/svgs/BackSVG"

const create = (props) => {
	var history = useHistory()

	const [propertyId, setPropertyId] = useState()
	const [name, setName] = useState()
	const [rent, setRent] = useState()
	const [deposit, setDeposit] = useState("")
	const [type, setType] = useState("")
	const [bedrooms, setBedrooms] = useState()
	const [size, setSize] = useState({})
	const [ensuite, setEnsuite] = useState(0)
	const [dsq, setDsq] = useState()
	const [loading, setLoading] = useState()

	// Get Units
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Unit",
			path: ["units", "create"],
		})
	}, [])

	const getDeposit = (e) => {
		var rent = e.target.value
		var formula = props.properties.find(
			(property) => property.id == propertyId
		)?.depositFormula

		rent = rent > 0 ? rent : 0
		// Evaluate the formula
		return eval(formula?.replace("r", rent))
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/units", {
			propertyId: propertyId,
			name: name,
			rent: rent,
			deposit: deposit.toString(),
			type: type,
			bedrooms: bedrooms,
			size: size,
			ensuite: ensuite,
			dsq: dsq,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Units
				setTimeout(() => history.push(`/admin/units`), 500)
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
									value={property.id}>
									{property.name}
								</option>
							))}
					</select>

					<label htmlFor="">Name</label>
					<input
						type="text"
						placeholder="A1"
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>

					<label htmlFor="">Rent</label>
					<input
						type="number"
						placeholder="20000"
						className="form-control mb-2 me-2"
						onChange={(e) => {
							setRent(e.target.value)
							setDeposit(getDeposit(e))
						}}
						required={true}
					/>

					<label htmlFor="">Deposit</label>
					<input
						type="number"
						placeholder="5000"
						defaultValue={deposit}
						className="form-control mb-2 me-2"
						onChange={(e) => setDeposit(e.target.value)}
						required={true}
					/>

					<label htmlFor="">Type</label>
					<select
						type="text"
						name="type"
						placeholder="Location"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setType(e.target.value)}
						required={true}>
						{[{ id: "", name: "Select Type" }]
							.concat(props.apartmentTypes)
							.map((type, key) => (
								<option
									key={key}
									value={type.id}>
									{type.name}
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
									<option value="m&sup2;">m&sup2;</option>
									<option value="ft&sup2;">ft&sup2;</option>
								</select>
							</div>
							{/* Size End */}
						</React.Fragment>
					)}

					<div className="d-flex justify-content-between">
						<div className="w-100 me-2">
							<label htmlFor="">Ensuite</label>
							<input
								type="number"
								placeholder="2"
								className="form-control mb-2 me-2"
								onChange={(e) => setEnsuite(e.target.value)}
								defaultValue={0}
								required={true}
							/>
						</div>

						<div className="w-100">
							<label htmlFor="">DSQ</label>
							<select
								type="number"
								className="form-control"
								onChange={(e) => setDsq(e.target.value == "yes" ? true : false)}
								required={true}>
								<option value="">Select DSQ</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</select>
						</div>
					</div>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="add unit"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/units`}
							icon={<BackSVG />}
							text="back to units"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
