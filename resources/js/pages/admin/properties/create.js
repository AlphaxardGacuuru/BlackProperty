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
	const [serviceCharge, setServiceCharge] = useState({
		service: 0,
		electricity: 0,
		garbage: 0,
		security: 0,
		internet: 0,
		cleaning: 0,
		parking: 0,
	})
	const [waterBillRate, setWaterBillRate] = useState({
		council: 0,
		borehole: 0,
		tanker: 0,
	})
	const [invoiceDate, setInvoiceDate] = useState(0)
	const [invoiceReminderDuration, setInvoiceReminderDuration] = useState(0)
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
			invoiceReminderDuration: invoiceReminderDuration,
			email: email,
			sms: sms,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Properties
				setTimeout(() => history.push("/admin/properties"), 500)
				// Fetch Auth to fetch new properties
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
						className="fw-bold text-center w-100 mt-2">
						Deposit Calculation
					</label>

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
						type="text"
						placeholder="2000"
						min="0"
						className="form-control mb-2 me-2"
						onChange={(e) => {
							let value = props.formatToCommas(e)

							setAdditionalCharges(value)
						}}
					/>

					<label
						htmlFor=""
						className="fw-bold text-center w-100 mt-2">
						Service Charges
					</label>

					{/* Service Charges Start */}
					<div className="d-flex justify-content-start flex-wrap">
						{/* Service Charge Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Service Charge</label>
							<input
								type="text"
								placeholder="5,000"
								min="0"
								step="0.1"
								className="form-control mb-2"
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
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, garbage: value })
								}}
							/>
						</div>
					</div>
					<div className="d-flex justify-content-start flex-wrap">
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
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setServiceCharge({ ...serviceCharge, cleaning: value })
								}}
							/>
						</div>
						{/* Cleaning End */}
					</div>
					<div className="d-flex justify-content-start flex-wrap">
						{/* Parking Start */}
						<div className="flex-grow-1 me-2 mb-2">
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
						<div className="flex-grow-1 mb-2 invisible">
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

					<label
						htmlFor=""
						className="fw-bold text-center w-100 mt-2">
						Water Bill Rate
					</label>

					{/* Water Billing Rate Start */}
					<div className="d-flex justify-content-between">
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Council</label>
							{/* Council Start */}
							<input
								type="number"
								placeholder="1.5"
								min="0"
								step="0.1"
								className="form-control"
								onChange={(e) =>
									setWaterBillRate({
										council: e.target.value,
										borehole: waterBillRate.borehole,
										tanker: waterBillRate.tanker,
									})
								}
								required={true}
							/>
						</div>
						{/* Council End */}
						{/* Borehole Start */}
						<div className="flex-grow-1 mb-2 me-2">
							<label htmlFor="">Borehole</label>
							<input
								type="number"
								placeholder="2.5"
								min="0"
								step="0.1"
								className="form-control"
								onChange={(e) =>
									setWaterBillRate({
										council: waterBillRate.council,
										borehole: e.target.value,
										tanker: waterBillRate.tanker,
									})
								}
								required={true}
							/>
						</div>
						{/* Borehole End */}
						{/* Tanker Start */}
						<div className="flex-grow-1 mb-2">
							<label htmlFor="">Tanker</label>
							<input
								type="number"
								placeholder="3.5"
								min="0"
								step="0.1"
								className="form-control"
								onChange={(e) =>
									setWaterBillRate({
										council: waterBillRate.council,
										borehole: waterBillRate.borehole,
										tanker: e.target.value,
									})
								}
								required={true}
							/>
						</div>
						{/* Tanker End */}
					</div>
					{/* Water Billing Rate End */}

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

					<label htmlFor="">Invoice Date Reminder</label>
					<input
						type="number"
						placeholder="10"
						min="1"
						max="30"
						step="1"
						className="form-control mb-2 me-2"
						onChange={(e) => setInvoiceReminderDuration(e.target.value)}
						required={true}
					/>

					<label htmlFor="">Invoice Channel</label>
					<div className="d-flex justify-content-start ms-4">
						{/* Email Switch Start */}
						<div className="form-check form-switch me-5">
							<input
								id="email"
								className="form-check-input"
								type="checkbox"
								role="switch"
								onChange={(e) => setEmail(e.target.checked)}
								defaultChecked={true}
								disabled={true}
							/>
							<label
								className="form-check-label"
								htmlFor="email">
								Email
							</label>
						</div>
						{/* Email Switch End */}
						{/* SMS Switch Start */}
						<div className="form-check form-switch">
							<input
								id="sms"
								className="form-check-input me-2"
								type="checkbox"
								role="switch"
								onChange={(e) => setSms(e.target.checked)}
							/>
							<label
								className="form-check-label"
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
