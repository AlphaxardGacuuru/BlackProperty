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
	const [invoiceDate, setInvoiceDate] = useState()
	const [email, setEmail] = useState()
	const [sms, setSms] = useState()
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

		Axios.get(`api/properties/${id}`)
			.then((res) => {
				const data = res.data.data
				// Set Property
				setProperty(data)
				setName(data.name)
				setLocation(data.location)
				setRentMultiple(data.depositFormula.split("*")[1])
				setAdditionalCharges(data.depositFormula.split("+")[1])
				setServiceCharge(data.serviceCharge)
				setWaterBillRate(data.waterBillRate)
				var extractedInvoiceDate = data.invoiceDate.replace(
					/(st|nd|rd|th)$/i,
					""
				)
				extractedInvoiceDate = parseInt(extractedInvoiceDate, 10)
				console.log(extractedInvoiceDate)
				setInvoiceDate(extractedInvoiceDate)
				setEmail(data.email)
				setSms(data.sms)
			})
			.catch((err) => ["Failed to fetch Property"])
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
			invoiceDate: invoiceDate,
			email: email,
			sms: sms,
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
						step="0.1"
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
						step="0.1"
						defaultValue={property.serviceCharge}
						className="form-control mb-2 me-2"
						onChange={(e) => setServiceCharge(e.target.value)}
					/>

					<label htmlFor="">Water Bill Rate</label>
					<input
						type="number"
						placeholder="1.5"
						min="0"
						step="0.1"
						defaultValue={property.waterBillRate}
						className="form-control mb-2 me-2"
						onChange={(e) => setWaterBillRate(e.target.value)}
					/>

					<label htmlFor="">Invoice Date</label>
					<input
						type="number"
						placeholder="5"
						min="1"
						max="30"
						step="1"
						defaultValue={invoiceDate}
						className="form-control mb-2 me-2"
						onChange={(e) => setInvoiceDate(e.target.value)}
					/>

					<label htmlFor="">Invoice Channel</label>
					<div className="d-flex justify-content-start ms-4">
						{/* Email Switch Start */}
						<div class="form-check form-switch me-5">
							<input
								id="email"
								class="form-check-input"
								type="checkbox"
								role="switch"
								onChange={(e) => setEmail(e.target.checked)}
								defaultChecked={email}
							/>
							<label
								class="form-check-label"
								htmlFor="email">
								Email
							</label>
						</div>
						{/* Email Switch End */}
						{/* SMS Switch Start */}
						<div class="form-check form-switch">
							<input
								id="sms"
								class="form-check-input me-2"
								type="checkbox"
								role="switch"
								onChange={(e) => setSms(e.target.checked)}
								defaultChecked={sms}
							/>
							<label
								class="form-check-label"
								htmlFor="sms">
								SMS
							</label>
						</div>
						{/* SMS Switch End */}
					</div>

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
