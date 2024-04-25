import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const create = (props) => {
	var history = useHistory()

	const [type, setType] = useState("")
	const [firstName, setFirstName] = useState()
	const [lastName, setLastName] = useState()
	const [email, setEmail] = useState()
	const [phoneNumber, setPhoneNumber] = useState()

	const [accountName, setAccountName] = useState()
	const [accountNumber, setAccountNumber] = useState()
	const [bankBranchRef, setBankBranchRef] = useState()

	const [tillName, setTillName] = useState()
	const [tillNumber, setTillNumber] = useState()

	const [paybillName, setPaybillName] = useState()
	const [paybillNumber, setPaybillNumber] = useState()
	const [paybillAccountNumber, setPaybillAccountNumber] = useState()

	const [description, setDescription] = useState()

	const [loading, setLoading] = useState()

	// Get Courses and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Add Wallet", path: ["wallet", "create"] })
	}, [])

	// Wallet Types
	const types = [
		{ id: "mobile_wallet", name: "MPESA" },
		{ id: "bank_account", name: "Bank" },
		{ id: "till", name: "Till" },
		{ id: "paybill", name: "Paybill" },
	]

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/kopokopo-recipients", {
			type: type,
			firstName: firstName,
			lastName: lastName,
			email: email,
			phoneNumber: phoneNumber,
			accountName: accountName,
			accountNumber: accountNumber,
			bankBranchRef: bankBranchRef,
			tillName: tillName,
			tillNumber: tillNumber,
			paybillName: paybillName,
			paybillNumber: paybillNumber,
			paybillAccountNumber: paybillAccountNumber,
			description: description,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Wallet
				setTimeout(() => history.push("/admin/finance/wallet"), 500)
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
					<select
						name="type"
						className="form-control mb-3 me-2"
						onChange={(e) => setType(e.target.value)}
						required={true}>
						<option value="">Select Wallet Type</option>
						{types.map((type, key) => (
							<option
								key={key}
								value={type.id}>
								{type.name}
							</option>
						))}
					</select>

					{type == "mobile_wallet" && (
						<React.Fragment>
							<input
								type="text"
								name="firstName"
								placeholder="First Name"
								className="form-control mb-2 me-2"
								onChange={(e) => setFirstName(e.target.value)}
								required={true}
							/>

							<input
								type="text"
								name="lastName"
								placeholder="Last Name"
								className="form-control mb-2 me-2"
								onChange={(e) => setLastName(e.target.value)}
								required={true}
							/>

							<input
								type="email"
								name="email"
								placeholder="Email"
								className="form-control mb-2 me-2"
								onChange={(e) => setEmail(e.target.value)}
								required={true}
							/>

							<input
								type="tel"
								name="phoneNumber"
								placeholder="Phone Number"
								className="form-control mb-2 me-2"
								pattern="^0[0-9]*$"
								onChange={(e) => setPhoneNumber(e.target.value)}
								required={true}
							/>
						</React.Fragment>
					)}

					{type == "bank_account" && (
						<React.Fragment>
							<input
								type="text"
								name="accountName"
								placeholder="Account Name"
								className="form-control mb-2 me-2"
								onChange={(e) => setAccountName(e.target.value)}
								required={true}
							/>

							<input
								type="number"
								name="accountNumber"
								placeholder="Account Number"
								className="form-control mb-2 me-2"
								onChange={(e) => setAccountNumber(e.target.value)}
								required={true}
							/>

							<input
								type="text"
								name="bankBranchRef"
								placeholder="Bank Branch Ref"
								className="form-control mb-2 me-2"
								onChange={(e) => setBankBranchRef(e.target.value)}
								required={true}
							/>
						</React.Fragment>
					)}

					{type == "till" && (
						<React.Fragment>
							<input
								type="text"
								name="tillName"
								placeholder="Till Name"
								className="form-control mb-2 me-2"
								onChange={(e) => setTillName(e.target.value)}
								required={true}
							/>

							<input
								type="number"
								name="tillNumber"
								placeholder="Till Number"
								className="form-control mb-2 me-2"
								onChange={(e) => setTillNumber(e.target.value)}
								required={true}
							/>
						</React.Fragment>
					)}

					{type == "paybill" && (
						<React.Fragment>
							<input
								type="text"
								name="paybillName"
								placeholder="Paybill Name"
								className="form-control mb-2 me-2"
								onChange={(e) => setPaybillName(e.target.value)}
								required={true}
							/>

							<input
								type="number"
								name="paybillNumber"
								placeholder="Paybill Number"
								className="form-control mb-2 me-2"
								onChange={(e) => setPaybillNumber(e.target.value)}
								required={true}
							/>

							<input
								type="text"
								name="paybillAccountNumber"
								placeholder="Paybill Account Number"
								className="form-control mb-2 me-2"
								onChange={(e) => setPaybillAccountNumber(e.target.value)}
								required={true}
							/>
						</React.Fragment>
					)}

					{type && (
						<textarea
							type="text"
							name="description"
							placeholder="Description"
							className="form-control mb-2 me-2"
							rows="10"
							onChange={(e) => setDescription(e.target.value)}
							required={true}></textarea>
					)}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							btnText="add wallet"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo="/finance/wallet"
							text="back to wallet"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
