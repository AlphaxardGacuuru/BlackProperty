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
	var { id } = useParams()

	const [property, setProperty] = useState({})

	const [name, setName] = useState()
	const [rent, setRent] = useState()
	const [deposit, setDeposit] = useState()
	const [type, setType] = useState("apartment")
	const [loading, setLoading] = useState()

	// Get Units
	useEffect(() => {
		// Set page
		props.setPage({ name: "Add Unit", path: ["units", "create"] })
		// Fetch Property
		props.get(`properties/${id}`, setProperty)
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
		Axios.post("/api/units", {
			propertyId: id,
			name: name,
			rent: rent,
			deposit: deposit.toString(),
			type: type,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Units
				setTimeout(() => history.push(`/admin/properties/${id}/show`), 500)
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
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>

					<input
						type="number"
						name="rent"
						placeholder="Rent"
						className="form-control mb-2 me-2"
						onChange={(e) => {
							setRent(e.target.value)
							setDeposit(getDeposit(e))
						}}
						required={true}
					/>

					<input
						type="number"
						name="deposit"
						placeholder="Deposit"
						defaultValue={deposit}
						className="form-control mb-2 me-2"
						onChange={(e) => setDeposit(e.target.value)}
						required={true}
					/>

					<select
						type="text"
						name="type"
						placeholder="Location"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setType(e.target.value)}
						required={true}>
						{apartments.map((apartment, key) => (
							<option
								key={key}
								value={apartment}>
								{apartment}
							</option>
						))}
					</select>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							btnText="add unit"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo="/units"
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
