import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import BackSVG from "@/svgs/BackSVG"

const create = (props) => {
	var history = useHistory()

	const [name, setName] = useState()
	const [location, setLocation] = useState()
	const [rentMultiple, setRentMultiple] = useState(0)
	const [additionalCharges, setAdditionalCharges] = useState(0)
	const [serviceCharge, setServiceCharge] = useState(0)
	const [waterBillRate, setWaterBillRate] = useState(0)
	const [invoiceDate, setInvoiceDate] = useState(0)
	const [email, setEmail] = useState(true)
	const [sms, setSms] = useState(false)
	const [loading, setLoading] = useState()

	// Get Properties
	useEffect(() => {
		// Set page
		props.setPage({ name: "Add Property", path: ["properties", "create"] })
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/properties", {
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
				// Redirect to Properties
				setTimeout(() => history.push("/admin/properties"), 500)
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
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
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>

					<label htmlFor="">Location</label>
					<input
						type="text"
						placeholder="Roysambu"
						className="form-control mb-2 me-2"
						onChange={(e) => setLocation(e.target.value)}
						required={true}
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
						className="form-control mb-2 me-2"
						onChange={(e) => setRentMultiple(e.target.value)}
						required={true}
					/>

					<label htmlFor="">Additional Charges to Deposit</label>
					<input
						type="number"
						placeholder="2000"
						min="0"
						className="form-control mb-2 me-2"
						onChange={(e) => setAdditionalCharges(e.target.value)}
					/>

					<label htmlFor="">Service Charge</label>
					<input
						type="number"
						placeholder="5000"
						min="0"
						step="0.1"
						className="form-control mb-2 me-2"
						onChange={(e) => setServiceCharge(e.target.value)}
					/>

					<label htmlFor="">Water Bill Rate</label>
					<input
						type="number"
						placeholder="1.5"
						min="0"
						step="0.1"
						className="form-control mb-2 me-2"
						onChange={(e) => setWaterBillRate(e.target.value)}
						required={true}
					/>

					<label htmlFor="">Invoice Date</label>
					<input
						type="number"
						placeholder="5"
						min="1"
						max="30"
						step="1"
						className="form-control mb-2 me-2"
						onChange={(e) => setInvoiceDate(e.target.value)}
						required={true}
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
								defaultChecked={true}
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
							text="add property"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo="/properties"
							icon={<BackSVG />}
							text="back to properties"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
