import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})

	const [name, setName] = useState()
	const [rent, setRent] = useState()
	const [deposit, setDeposit] = useState()
	const [serviceCharge, setServiceCharge] = useState({
		service: 0,
		electricity: 0,
		garbage: 0,
		security: 0,
		internet: 0,
		cleaning: 0,
		parking: 0,
	})
	const [type, setType] = useState()
	const [bedrooms, setBedrooms] = useState()
	const [size, setSize] = useState({})
	const [ensuite, setEnsuite] = useState()
	const [dsq, setDsq] = useState()
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Unit",
			path: ["units", "edit"],
		})

		// Fetch Unit
		Axios.get(`api/units/${id}`)
			.then((res) => {
				setUnit(res.data.data)
				setType(res.data.data.type)
			})
			.catch((err) => props.getErrors(err))
	}, [])

	const getDeposit = (value) => {
		var rent = value
		var formula = props.properties.find(
			(property) => property == unit.propertyId
		).depositFormula

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
			serviceCharge: serviceCharge,
			type: type,
			bedrooms: bedrooms,
			// Check size is not empty object
			size: Object.keys(size).length ? size : null,
			ensuite: ensuite,
			dsq: dsq,
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
						type="text"
						placeholder="20000"
						defaultValue={unit.rent}
						className="form-control mb-2 me-2"
						onChange={(e) => {
							let value = props.formatToCommas(e)

							setRent(value)
							setDeposit(getDeposit(value))
						}}
					/>

					<label htmlFor="">Deposit</label>
					<input
						type="text"
						placeholder="5000"
						defaultValue={unit.deposit}
						className="form-control mb-2 me-2"
						onChange={(e) => {
							let value = props.formatToCommas(e)

							setDeposit(value)
						}}
					/>

					<label
						htmlFor=""
						className="fw-bold text-center w-100 mt-2">
						Service Charges
					</label>

					{/* Service Charges Start */}
					<div className="d-flex justify-content-start">
						{/* Service Charge Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Service Charge</label>
							<input
								type="text"
								placeholder="5,000"
								min="0"
								step="0.1"
								className="form-control mb-2"
								defaultValue={unit.serviceCharge?.service?.toLocaleString()}
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, service: value })
								}}
							/>
						</div>
						{/* Service Charge End */}
						{/* Electricity Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Electricity</label>
							<input
								type="text"
								placeholder="5,000"
								min="0"
								step="0.1"
								className="form-control mb-2"
								defaultValue={unit.serviceCharge?.electricity?.toLocaleString()}
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, electricity: value })
								}}
							/>
						</div>
						{/* Electricity End */}
						{/* Garbage Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Garbage</label>
							<input
								type="text"
								placeholder="5,000"
								min="0"
								step="0.1"
								className="form-control mb-2"
								defaultValue={unit.serviceCharge?.garbage?.toLocaleString()}
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, garbage: value })
								}}
							/>
						</div>
					</div>
					<div className="d-flex justify-content-start">
						{/* Garbage End */}
						{/* Security Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Security</label>
							<input
								type="text"
								placeholder="5,000"
								min="0"
								step="0.1"
								className="form-control mb-2"
								defaultValue={unit.serviceCharge?.security?.toLocaleString()}
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, security: value })
								}}
							/>
						</div>
						{/* Security End */}
						{/* Internet Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Internet</label>
							<input
								type="text"
								placeholder="5,000"
								min="0"
								step="0.1"
								className="form-control mb-2"
								defaultValue={unit.serviceCharge?.internet?.toLocaleString()}
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, internet: value })
								}}
							/>
						</div>
						{/* Internet End */}
						{/* Cleaning Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Cleaning</label>
							<input
								type="text"
								placeholder="5,000"
								min="0"
								step="0.1"
								className="form-control mb-2"
								defaultValue={unit.serviceCharge?.cleaning?.toLocaleString()}
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, cleaning: value })
								}}
							/>
						</div>
						{/* Cleaning End */}
					</div>
					<div className="d-flex justify-content-start">
						{/* Parking Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Parking</label>
							<input
								type="text"
								placeholder="5,000"
								min="0"
								step="0.1"
								className="form-control mb-2"
								defaultValue={unit.serviceCharge?.parking?.toLocaleString()}
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, parking: value })
								}}
							/>
						</div>
						{/* Parking End */}
						<div className="flex-grow-1 me-2 mb-2 invisible">
							<label htmlFor="">Parking</label>
							<input
								type="text"
								placeholder="5,000"
								min="0"
								step="0.1"
								className="form-control mb-2"
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, parking: value })
								}}
							/>
						</div>
						<div className="flex-grow-1 me-2 mb-2 invisible">
							<label htmlFor="">Parking</label>
							<input
								type="text"
								placeholder="5,000"
								min="0"
								step="0.1"
								className="form-control mb-2"
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, parking: value })
								}}
							/>
						</div>
					</div>
					{/* Service Charges End */}

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
									value={type.id}
									selected={type.id == unit.type}>
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
								name="bedroom"
								placeholder="2"
								min="0"
								defaultValue={parseInt(unit.bedrooms)}
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
									name="size"
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
									name="size"
									className="form-control"
									onChange={(e) =>
										setSize({ value: size.value, unit: e.target.value })
									}
									required={true}>
									<option value="">Select Unit</option>
									<option
										value="m&sup2;"
										defaultValue={unit.size?.value}
										selected={unit.size?.unit == "meters_squared"}>
										m&sup2;
									</option>
									<option
										value="ft&sup2;"
										defaultValue={unit.size?.value}
										selected={unit.size?.unit == "square_feet"}>
										ft&sup2;
									</option>
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
								required={true}
								defaultValue={unit.ensuite}
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
								<option
									value="yes"
									selected={unit.dsq == 1}>
									Yes
								</option>
								<option
									value="no"
									selected={unit.dsq == 0}>
									No
								</option>
							</select>
						</div>
					</div>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update"
							loading={loading}
						/>
					</div>

					<center>
						<MyLink
							linkTo={`/units`}
							icon={<BackSVG />}
							text="back to units"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
