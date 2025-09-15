import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	var { id } = useParams()

	const [userSubscriptionPlan, setUserSubscriptionPlan] = useState({})

	const [subscriptionPlanId, setSubscriptionPlanId] = useState()
	const [subscriptionPlans, setSubscriptionPlans] = useState()
	const [startDate, setStartDate] = useState()
	const [endDate, setEndDate] = useState()
	const [type, setType] = useState()
	const [status, setStatus] = useState()
	const [loading, setLoading] = useState()

	const statuses = ["pending", "active", "free_trial", "cancelled"]

	// Get Properties
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit User Subscription Plan",
			path: ["user-subscription-plans", "edit"],
		})

		Axios.get(`/api/user-subscription-plans/${id}`)
			.then((res) => {
				setUserSubscriptionPlan(res.data.data)
			})
			.catch((err) => props.getErrors(err))

		// Fetch Subscription Plans
		props.get(`subscription-plans`, setSubscriptionPlans)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/user-subscription-plans/${id}`, {
			subscriptionPlanId: subscriptionPlanId,
			startDate: startDate,
			endDate: endDate,
			status: status,
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
				<form
					onSubmit={onSubmit}
					className="mb-5">
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
									value={plan.id}
									selected={plan.id == userSubscriptionPlan.subscriptionPlanId}>
									{plan.name}
								</option>
							))}
					</select>
					{/* Subscription Plan End */}

					<div className="d-flex">
						{/* Start Date Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Start Date</label>
							<input
								type="date"
								className="form-control"
								defaultValue={userSubscriptionPlan.startDateFormated}
								onChange={(e) => setStartDate(e.target.value)}
								required={true}
							/>
						</div>
						{/* Start Date End */}

						{/* End Date Start */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">End Date</label>
							<input
								type="date"
								className="form-control"
								defaultValue={userSubscriptionPlan.endDateFormated}
								onChange={(e) => setEndDate(e.target.value)}
								required={true}
							/>
						</div>
						{/* End Date End */}
					</div>

					{/* Type Start */}
					<label htmlFor="">Type</label>
					<select
						className="form-control mb-2"
						onChange={(e) => setType(e.target.value)}
						required={true}>
						<option value="">Select Type</option>
						<option
							value="free_trial"
							selected={userSubscriptionPlan.type === "free_trial"}>
							Free Trial
						</option>
					</select>
					{/* Type End */}

					{/* Status Start */}
					<label htmlFor="">Status</label>
					<select
						className="form-control mb-2"
						onChange={(e) => setStatus(e.target.value)}
						required={true}>
						<option value="">Select Status</option>
						{statuses.map((status, key) => (
							<option
								key={key}
								value={status}
								selected={userSubscriptionPlan.status === status}>
								{status
									.split("_")
									.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(" ")}
							</option>
						))}
					</select>
					{/* Status End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update user subscriptiopn plan"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo="/user-subscription-plans"
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

export default edit
