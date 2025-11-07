import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import BackSVG from "@/svgs/BackSVG"

const create = (props) => {
	var history = useHistory()

	const [users, setUsers] = useState([])
	const [subscriptionPlans, setSubscriptionPlans] = useState()

	const [subscriptionPlanId, setSubscriptionPlanId] = useState()
	const [userId, setUserId] = useState()
	const [duration, setDuration] = useState()
	const [type, setType] = useState()
	const [loading, setLoading] = useState()

	// Get Properties
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add User Subscription Plans",
			path: ["user-subscription-plans", "create"],
		})

		// Fetch Users
		props.get(`users?idAndName=true`, setUsers)

		// Fetch Subscription Plans
		props.get(`subscription-plans`, setSubscriptionPlans)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/user-subscription-plans", {
			userId: userId,
			subscriptionPlanId: subscriptionPlanId,
			duration: duration,
			status: "active",
			type: type,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Properties
				setTimeout(() => history.push("/super/user-subscription-plans"), 500)
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
					className={`${loading ? "was-validated" : ""} mb-5`}>

					{/* User Start */}
					<label htmlFor="">User</label>
					<select
						className="form-control mb-2"
						onChange={(e) => setUserId(e.target.value)}
						required={true}>
						<option value="">Select User</option>
						{users.map((user) => (
							<option
								key={user.id}
								value={user.id}>
								{user.name}
							</option>
						))}
					</select>
					{/* User End */}

					{/* Subscription Plan Start */}
					<label htmlFor="">Subscription Plan</label>
					<select
						className="form-control mb-2"
						onChange={(e) => setSubscriptionPlanId(e.target.value)}
						required={true}>
						<option value="">Select Subscription Plan</option>
						{subscriptionPlans &&
							subscriptionPlans.map((plan) => (
								<option
									key={plan.id}
									value={plan.id}>
									{plan.name}
								</option>
							))}
					</select>
					{/* Subscription Plan End */}

					{/* Duration Start */}
					<div className="flex-grow-1 me-2 mb-2">
						<label htmlFor="">Duration in Months</label>
						<input
							type="number"
							placeholder="0"
							className="form-control"
							onChange={(e) => setDuration(e.target.value)}
							required={true}
						/>
					</div>
					{/* Duration End */}

					<label htmlFor="">Type</label>
					<select
						className="form-control mb-2"
						onChange={(e) => setType(e.target.value)}
						required={true}>
						<option value="">Select Type</option>
						<option value="free_trial">Free Trial</option>
					</select>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="add user subscription plan"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo="/user-subscription-plans"
							icon={<BackSVG />}
							text="back to user subscriptiopn plans"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
