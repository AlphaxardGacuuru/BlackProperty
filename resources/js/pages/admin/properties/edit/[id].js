import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	var { id } = useParams()

	const [property, setProperty] = useState({})
	const [name, setName] = useState()
	const [location, setLocation] = useState()
	const [rentMultiple, setRentMultiple] = useState(0)
	const [additionalCharges, setAdditionalCharges] = useState(0)
	const [serviceCharge, setServiceCharge] = useState()
	const [waterBillRate, setWaterBillRate] = useState()
	const [loading, setLoading] = useState()

	// Extract Rent Multiple and Additional Charges
	var formula = []

	if (property.depositFormula) {
		// Remove "r*"
		formula = property.depositFormula.replace("r*", "")
		// Split the formula by the "+" sign
		formula = formula?.split("+")
	}

	// Get Properties
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Property",
			path: ["properties", `properties/${id}/show`, "edit"],
		})

		props.get(`properties/${id}`, setProperty)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/properties/${id}`, {
			name: name,
			location: location,
			depositFormula: `r*${rentMultiple}+${additionalCharges}`,
			serviceCharge: serviceCharge,
			waterBillRate: waterBillRate,
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
				<form
					onSubmit={onSubmit}
					className="mb-5">
					<label htmlFor="">Name</label>
					<input
						type="text"
						placeholder="Zuko Apartments"
						defaultValue={property.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>

					<label htmlFor="">Location</label>
					<input
						type="text"
						placeholder="Roysambu"
						defaultValue={property.location}
						className="form-control mb-2 me-2"
						onChange={(e) => setLocation(e.target.value)}
					/>

					<label
						htmlFor=""
						className="text-primary mt-2">
						Deposit Calculation
					</label>

					<br />

					<label htmlFor="">Rent Multiple</label>
					<input
						type="number"
						placeholder="2"
						min="0"
						defaultValue={formula[0]}
						className="form-control mb-2 me-2"
						onChange={(e) => setRentMultiple(e.target.value)}
					/>

					<label htmlFor="">Additional Charges to Deposit</label>
					<input
						type="number"
						placeholder="2000"
						min="0"
						defaultValue={formula[1]}
						className="form-control mb-2 me-2"
						onChange={(e) => setAdditionalCharges(e.target.value)}
						required={true}
					/>

					<label htmlFor="">Service Charge</label>
					<input
						type="number"
						placeholder="5000"
						min="0"
						defaultValue={property.serviceCharge}
						className="form-control mb-2 me-2"
						onChange={(e) => setServiceCharge(e.target.value)}
					/>

					<label htmlFor="">Water Bill Rate</label>
					<input
						type="number"
						placeholder="1.5"
						min="0"
						defaultValue={property.waterBillRate}
						className="form-control mb-2 me-2"
						onChange={(e) => setWaterBillRate(e.target.value)}
					/>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update"
							loading={loading}
						/>
					</div>

					<center>
						<MyLink
							linkTo="/properties"
							icon={<BackSVG />}
							text="back to properties"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
