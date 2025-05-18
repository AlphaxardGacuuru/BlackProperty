import React, { useEffect, useState } from "react"
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

	const [property, setProperty] = useState([])
	const [unit, setUnit] = useState({})

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [occupiedAt, setOccupiedAt] = useState()
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Tenant",
			path: ["units", `units/${id}/show`, "create"],
		})
		// Fetch Property
		Axios.get(`api/units/${id}`)
			.then((res) => {
				setUnit(res.data.data)
				props.get(`properties/${res.data.data.propertyId}`, setProperty)
			})
			.catch((err) => props.setMessages(["Failed to fetch unit"]))
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)

		// Call Modal
		var modal = new window.bootstrap.Modal(
			document.getElementById("vacateModal")
		)

		modal.show()
	}

	const onSubmitAction = (sendInvoice = true) => {
		Axios.post("/api/tenants", {
			unitId: id,
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
				setTimeout(() => history.push(`/admin/units/${id}/show`), 500)
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
					<input
						type="tel"
						name="phone"
						placeholder="Phone"
						className="form-control mb-2 me-2"
						onChange={(e) => setPhone(e.target.value)}
						required={true}
					/>
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

						<div
							className="modal fade"
							id={`vacateModal`}
							tabIndex="-1"
							aria-labelledby="deleteModalLabel"
							aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content bg-primary rounded-0">
									<div className="modal-header border-0">
										<h1
											id="deleteModalLabel"
											className="modal-title fs-5 text-white">
											Add Tenant to {unit.name}
										</h1>

										{/* Close Start */}
										<span
											type="button"
											className="text-white"
											data-bs-dismiss="vacateModal">
											<CloseSVG />
										</span>
										{/* Close End */}
									</div>
									<div className="modal-body text-start text-wrap text-white border-0">
										Are you sure you want to Add {name} to {unit.name}. An
										Invoice will be sent via{" "}
										{`${property.email ? " Email" : ""} ${
											property.sms ? " and SMS" : ""
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
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/units/${id}/show`}
							icon={<BackSVG />}
							text="back to unit"
						/>
					</div>
				</form>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default create
