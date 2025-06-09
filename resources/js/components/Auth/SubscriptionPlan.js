import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"

import { Link } from "react-router-dom/cjs/react-router-dom.min"

import CheckSVG from "@/svgs/CheckSVG"

const SubscriptionPlan = (props) => {
	const history = useHistory()
	const location = useLocation()

	const [subscriptionPlans, setSubscriptionPlans] = useState([])

	useEffect(() => {
		// Fetch Subscription Plan
		props.get(`subscription-plans`, setSubscriptionPlans)
	}, [])

	const blur = location.pathname.match("/admin")

	return (
		<div className={blur ? "menu-open" : ""}>
			<div
				className="background-blur"
				style={{
					visibility: blur ? "visible" : "hidden",
					backdropFilter: "blur(100px)",
				}}></div>
			<div
				className="bottomMenu bg-transparent shadow-none"
				style={{ top: "0" }}>
				{/* <!-- ***** Pricing Area Start ***** --> */}
				<div className="sonar-services-area">
					<div className="container">
						<div className="row">
							<div className="col-sm-12 text-center my-5">
								<h2>Subscription Plans</h2>
							</div>
						</div>
						<div className="row mb-5">
							{subscriptionPlans.map((subscriptionPlan, key) => (
								<div
									key={key}
									className="col-12 col-md-6 col-lg-4">
									<div
										className="single-services-area wow fadeInUp card text-center py-5 px-2 mb-4"
										style={{ backgroundColor: "#232323", color: "white" }}
										data-wow-delay="300ms">
										{props.auth.activeSubscription.name ==
											subscriptionPlan.name && (
											<React.Fragment>
												<h4 className="mb-2 text-primary">Current</h4>
												<hr className="w-75 mx-auto border-light" />
											</React.Fragment>
										)}
										<h4 className="mb-2 text-white">{subscriptionPlan.name}</h4>
										<hr className="w-75 mx-auto border-light" />
										<h5 className="text-white">
											{subscriptionPlan.description}
										</h5>
										<hr className="w-75 mx-auto border-light" />
										{subscriptionPlan.features.map((feature, key) => (
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
										<h3 className="text-success">
											<small className="fw-lighter me-1">KES</small>
											{subscriptionPlan.price.monthly.toLocaleString()}
											<small className="fw-lighter">/mo</small>
										</h3>
										<h3 className="text-success">
											<small className="fw-lighter me-1">KES</small>
											{subscriptionPlan.price.yearly.toLocaleString()}
											<small className="fw-lighter">/yr</small>
										</h3>
										<h6 className="mt-2 mb-4 text-success">
											<small className="fw-lighter me-1">KES</small>
											{subscriptionPlan.price.onboarding_fee.toLocaleString()}{" "}
											onboarding fee
										</h6>
										{props.auth.activeSubscription.name !=
											subscriptionPlan.name && (
											<Link
												to="/admin/dashboard"
												className="btn sonar-btn white-btn w-25 mx-auto">
												<span className="me-1">change</span>
											</Link>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				{/* <!-- ***** Pricing Area End ***** --> */}
			</div>
		</div>
	)
}

export default SubscriptionPlan
