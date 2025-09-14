import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import BackSVG from "@/svgs/BackSVG"

const create = (props) => {
	var history = useHistory()

	const [name, setName] = useState()
	const [description, setDescription] = useState()
	const [price, setPrice] = useState({ monthly: 0, yearly: 0, onboarding_fee: 0 })
	const [billingCycle, setBillingCycle] = useState(0)
	const [maxProperties, setMaxProperties] = useState(0)
	const [maxUnits, setMaxUnits] = useState(0)
	const [maxUsers, setMaxUsers] = useState(true)
	const [features, setFeatures] = useState(false)
	const [loading, setLoading] = useState()

	// Get Properties
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Subscription Plans",
			path: ["subscription-plans", "create"],
		})
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/subscription-plans", {
			name: name,
			description: description,
			price: price,
			billingCycle: billingCycle,
			maxProperties: maxProperties,
			maxUnits: maxUnits,
			maxUsers: maxUsers,
			features: features,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Properties
				setTimeout(() => history.push("/super/subscription-plans"), 500)
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
						placeholder="e.g Basic Plan"
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>

					<label htmlFor="">Description</label>
					<textarea
						placeholder="e.g This is the basic plan"
						className="form-control mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}
						required={true}></textarea>

					<label
						htmlFor=""
						className="fw-bold text-center w-100 mt-2">
						Price
					</label>

					<div className="d-flex">
						{/* Monthly Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Monthly</label>
							<input
								type="text"
								placeholder="0"
								className="form-control"
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setPrice({
										monthly: value,
										yearly: price.yearly,
										onboarding_fee: price.onboarding_fee,
									})
								}}
								required={true}
							/>
						</div>
						{/* Monthly End */}
						{/* Yearly Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Yearly</label>
							<input
								type="text"
								placeholder="0"
								className="form-control"
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setPrice({
										monthly: price.monthly,
										yearly: value,
										onboarding_fee: price.onboarding_fee,
									})
								}}
								required={true}
							/>
						</div>
						{/* Yearly End */}
						{/* On Boarding Fee Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">On Boarding Fee</label>
							<input
								type="text"
								placeholder="0"
								className="form-control"
								onChange={(e) => {
									let value = props.formatToCommas(e)

									setPrice({
										monthly: price.monthly,
										yearly: price.yearly,
										onboarding_fee: value,
									})
								}}
								required={true}
							/>
						</div>
						{/* On Boarding Fee End */}
					</div>

					<label htmlFor="">Billing Cycle</label>
					<select
						className="form-control mb-2"
						onChange={(e) => setBillingCycle(e.target.value)}
						required={true}>
						<option value="">Select Billing Cycle</option>
						<option value="monthly">Monthly</option>
						<option value="yearly">Yearly</option>
					</select>

					<div className="d-flex justify-content-start flex-wrap">
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Max Properties</label>
							<input
								type="number"
								placeholder="0"
								className="form-control"
								onChange={(e) => setMaxProperties(e.target.value)}
								required={true}
							/>
						</div>

						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Max Units</label>
							<input
								type="number"
								placeholder="0"
								className="form-control"
								onChange={(e) => setMaxUnits(e.target.value)}
								required={true}
							/>
						</div>

						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Max Users</label>
							<input
								type="number"
								placeholder="0"
								className="form-control"
								onChange={(e) => setMaxUsers(e.target.value)}
								required={true}
							/>
						</div>
					</div>

					<label htmlFor="">Features</label>
					<input
						type="text"
						className="form-control mb-2 me-2"
						onChange={(e) => setFeatures(e.target.value)}
						required={true}
					/>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="add subscription plan"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo="/subscription-plans"
							icon={<BackSVG />}
							text="back to subscription plans"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
