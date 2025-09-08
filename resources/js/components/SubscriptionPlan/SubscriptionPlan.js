import React from "react"
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"

import PlusSVG from "@/svgs/PlusSVG"
import ForwardSVG from "@/svgs/ForwardSVG"
import CheckSVG from "@/svgs/CheckSVG"

const SubscriptionPlan = (props) => {
	return (
		<div
			className="card shadow text-center p-5 m-2"
			style={{ backgroundColor: "#232323", color: "white" }}>
			{props.auth.activeSubscription?.name == props.subscriptionPlan.name && (
				<React.Fragment>
					<h4 className="mb-2 text-primary">Current</h4>
					<hr className="w-75 mx-auto border-light" />
				</React.Fragment>
			)}
			<h4 className="mb-2 text-white">{props.subscriptionPlan.name}</h4>
			<hr className="w-75 mx-auto border-light" />
			<h5 className="text-white">{props.subscriptionPlan.description}</h5>
			<hr className="w-75 mx-auto border-light" />
			{props.subscriptionPlan.features.map((feature, key) => (
				<span
					key={key}
					className="d-block">
					<span className="text-success fs-4">
						<CheckSVG />
					</span>
					{feature}
				</span>
			))}
			<hr className="w-75 mx-auto border-light" />
			<h2 className="text-success">
				<small className="fw-lighter me-1">KES</small>
				{props.subscriptionPlan.price.monthly.toLocaleString()}
				<small className="fw-lighter">/mo</small>
			</h2>
			<h3 className="text-success">
				<small className="fw-lighter me-1">KES</small>
				{props.subscriptionPlan.price.yearly.toLocaleString()}
				<small className="fw-lighter">/yr</small>
			</h3>
			<h6 className="mt-2 mb-4 text-success">
				<small className="fw-lighter me-1">KES</small>
				{props.subscriptionPlan.price.onboarding_fee.toLocaleString()}{" "}
				onboarding fee
			</h6>
			{props.auth.activeSubscription?.name != props.subscriptionPlan.name && (
				<Link
					to="/admin/subscribe"
					className="btn sonar-btn white-btn w-25 mx-auto">
					<span className="me-1">change</span>
				</Link>
			)}
		</div>
	)
}

export default SubscriptionPlan
