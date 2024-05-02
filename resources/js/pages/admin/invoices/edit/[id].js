import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	var { id } = useParams()

	const [invoice, setInvoice] = useState({})
	const [property, setProperty] = useState({})

	const [name, setName] = useState()
	const [rent, setRent] = useState()
	const [deposit, setDeposit] = useState()
	const [type, setType] = useState()
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Invoice",
			path: ["properties", "edit"],
		})

		// Fetch Invoice
		Axios.get(`api/invoices/${id}`).then((res) => {
			// Set page
			props.setPage({
				name: "Edit Invoice",
				path: [
					"properties",
					`properties/${res.data.data.propertyId}/show`,
					"edit",
				],
			})

			setInvoice(res.data.data)
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
		Axios.put(`/api/invoices/${id}`, {
			name: name,
			rent: rent,
			deposit: deposit?.toString(),
			type: type,
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
					<input
						type="text"
						name="name"
						placeholder="Name"
						defaultValue={invoice.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>

					<input
						type="number"
						name="rent"
						placeholder="Rent"
						defaultValue={invoice.rent?.replace(/,/g, "")}
						className="form-control mb-2 me-2"
						onChange={(e) => {
							setRent(e.target.value)
							setDeposit(getDeposit(e))
						}}
					/>

					<input
						type="number"
						name="deposit"
						placeholder="Deposit"
						defaultValue={deposit}
						className="form-control mb-2 me-2"
						onChange={(e) => setDeposit(e.target.value)}
					/>

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
								selected={invoice.type == apartment}>
								{apartment}
							</option>
						))}
					</select>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update"
							loading={loading}
						/>
					</div>

					<center>
						<MyLink
							linkTo={`/properties/${invoice.propertyId}/show`}
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
