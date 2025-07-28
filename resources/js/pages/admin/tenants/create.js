import React, { useEffect, useState, useRef } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import LogInSVG from "@/svgs/LogInSVG"
import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	var { id } = useParams()
	var history = useHistory()

	const [units, setUnits] = useState([])

	const [unitId, setUnitId] = useState()
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [occupiedAt, setOccupiedAt] = useState()
	const [loading, setLoading] = useState()

	const modalBtn = useRef(null)

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Tenant",
			path: ["tenants", "create"],
		})
		// Fetch Units
		props.get(`units?propertyId=${props.auth.propertyIds}`, setUnits)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		modalBtn.current.click()
	}

	const onSubmitAction = (sendInvoice = true) => {
		setLoading(true)

		Axios.post("/api/tenants", {
			unitId: unitId,
			name: name,
			email: email,
			phone: phone,
			occupiedAt: occupiedAt,
			sendInvoice: sendInvoice,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
				// Redirect to Property
				setTimeout(() => history.push(`/admin/tenants`), 500)
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
					{/* Units */}
					<label htmlFor="unitId">Unit</label>
					<select
						name="unitId"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setUnitId(e.target.value)}
						required={true}>
						<option value="">Select Unit</option>
						{units.map((unit, key) => (
							<option
								key={key}
								value={unit.id}>
								{unit.name}
							</option>
						))}
					</select>
					{/* Units End */}

					{/* Name Start */}
					<label htmlFor="">Name</label>
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>
					{/* Name End */}

					{/* Email Start */}
					<label htmlFor="">Email</label>
					<input
						type="text"
						name="email"
						placeholder="Email"
						className="form-control mb-2 me-2"
						onChange={(e) => setEmail(e.target.value)}
						required={true}
					/>
					{/* Email End */}

					{/* Phone Start */}
					<label htmlFor="">Phone</label>
					<div className="d-flex border bg-white mb-3">
						<div className="border-end p-2">+254</div>
						<input
							type="tel"
							id="phone"
							name="phone"
							minLength="10"
							maxLength="10"
							className="form-control border-0"
							placeholder="0711222333"
							onChange={(e) => setPhone(e.target.value)}
							required={true}
						/>
					</div>
					{/* Phone End */}

					{/* Occupied At Start */}
					<label htmlFor="">Occupied At</label>
					<input
						name="occupiedAt"
						type="date"
						className="form-control mb-3 me-2"
						onChange={(e) => setOccupiedAt(e.target.value)}
						required={true}
					/>
					{/* Occupied At End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="add tenant"
							loading={loading}
						/>
					</div>
				</form>

				<button
					ref={modalBtn}
					className="d-none"
					data-bs-toggle="modal"
					data-bs-target={`#vacateModal`}></button>

				<div
					className="modal fade"
					id={`vacateModal`}
					tabIndex="-1"
					aria-labelledby="vacateModalLabel"
					aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content bg-primary rounded-0">
							<div className="modal-header border-0">
								<h1
									id="vacateModalLabel"
									className="modal-title fs-5 text-white">
									Add Tenant to {units.find((unit) => unit.id == unitId)?.name}
								</h1>

								{/* Close Start */}
								<span
									type="button"
									className="text-white"
									data-bs-dismiss="modal">
									<CloseSVG />
								</span>
								{/* Close End */}
							</div>
							<div className="modal-body text-start text-wrap text-white border-0">
								Are you sure you want to Add {name} to{" "}
								{units.find((unit) => unit.id == unitId)?.name}. An Invoice will
								be sent via{" "}
								{`${
									props.properties.find(
										(property) =>
											property.id ==
											units.find((unit) => unit.id == unitId)?.propertyId
									)?.email
										? " Email"
										: ""
								} ${
									props.properties.find(
										(property) =>
											property.id ==
											units.find((unit) => unit.id == unitId)?.propertyId
									)?.email.sms
										? " and SMS"
										: ""
								}`}{" "}
								as well.
							</div>
							<div className="modal-footer justify-content-between border-0">
								<button
									type="button"
									className="mysonar-btn btn-2 me-2"
									data-bs-dismiss="modal"
									onClick={() => onSubmitAction(false)}>
									<span className="me-1">{<LogInSVG />}</span>
									Add without invoice
								</button>

								<button
									type="button"
									className="mysonar-btn btn-2"
									data-bs-dismiss="modal"
									onClick={() => onSubmitAction()}>
									<span className="me-1">{<LogInSVG />}</span>
									Add With Invoice
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="d-flex justify-content-center mb-2">
					<MyLink
						linkTo={`/tenants`}
						icon={<BackSVG />}
						text="back to tenants"
					/>
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default create
