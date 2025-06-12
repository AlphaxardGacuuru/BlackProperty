import React, { useState, useEffect, useRef } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import CheckSVG from "@/svgs/CheckSVG"
import PersonSVG from "@/svgs/PersonSVG"
import KopokopoBtn from "@/components/Payments/KopokopoBtn"

import FormWizard from "react-form-wizard-component"
import "react-form-wizard-component/dist/style.css"
import BackSVG from "@/svgs/BackSVG"
import ForwardSVG from "@/svgs/ForwardSVG"
import SettingsSVG from "@/svgs/SettingsSVG"
import LogoSVG from "@/svgs/LogoSVG"
import PaymentSVG from "@/svgs/PaymentSVG"
import BillableSVG from "@/svgs/BillableSVG"
import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"

const SubscriptionPlan = (props) => {
	const history = useHistory()
	const location = useLocation()
	const formWizardRef = useRef(null)

	const [subscriptionPlans, setSubscriptionPlans] = useState([])
	const [subscriptionPlanId, setSubscriptionPlanId] = useState()
	const [subscriptionPlanAmount, setSubscriptionPlanAmount] = useState("")
	const [phone, setPhone] = useState(props.auth.phone)

	const [logoutLoading, setLogoutLoading] = useState(false)
	const [updateLoading, setUpdateLoading] = useState(false)
	const [mpesaLoading, setMpesaLoading] = useState()
	const [stkPushed, setStkPushed] = useState("d-none")

	useEffect(() => {
		// Fetch Subscription Plan
		if (props.auth.name != "Guest") {
			props.get(`subscription-plans`, setSubscriptionPlans)
		}
	}, [])

	const logout = () => {
		setLogoutLoading(true)

		Axios.post(`/logout`)
			.then((res) => {
				setLogoutLoading(false)

				props.setMessages([res.data.message])
				// Remove phone from localStorage
				localStorage.clear()
				// Set Auth to Guest
				props.setAuth({
					name: "Guest",
					avatar: "/storage/avatars/male-avatar.png",
					accountType: "normal",
					decos: 0,
					posts: 0,
					fans: 0,
				})
				// Redirect to Dashboard
				setTimeout(() => history.push("/admin/dashboard"), 500)
			})
			.catch((err) => {
				setLogoutLoading(false)
				props.getErrors(err)
				// Remove phone from localStorage
				localStorage.clear()
				// Set Auth to Guest
				props.setAuth({
					name: "Guest",
					avatar: "/storage/avatars/male-avatar.png",
					accountType: "normal",
					decos: 0,
					posts: 0,
					fans: 0,
				})
				// Redirect to Dashboard
				setTimeout(() => history.push("/admin/dashboard"), 500)
				// Reload
				setTimeout(() => window.location.reload(), 500)
			})
	}

	const onUpdatePhone = (e) => {
		e.preventDefault()

		setUpdateLoading(true)
		Axios.put(`/api/users/${props.auth.id}`, {
			phone: phone,
		})
			.then((res) => {
				setUpdateLoading(false)
				props.setMessages([res.data.message])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => {
				setUpdateLoading(false)
				props.getErrors(err)
			})
	}

	/*
	 * Send STK Push
	 */
	const onSTKPush = () => {
		setMpesaLoading(true)

		Axios.post("/api/stk-push", { amount: subscriptionPlanAmount })
			.then((res) => {
				setMpesaLoading(false)
				setStkPushed("d-block")
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setMpesaLoading(false)
				setStkPushed("d-none")
				props.getErrors(err)
			})
	}

	const handleTabChange = ({ previousIndex, currentIndex }) => {}

	const handleComplete = () => {}

	const backTemplate = (handlePrevious) => {
		return (
			<button
				className="btn sonar-btn btn-2 mx-1"
				onClick={handlePrevious}>
				<BackSVG />
				back
			</button>
		)
	}

	const blur =
		props.auth.name != "Guest" &&
		!props.auth.hasActiveSubscription &&
		location.pathname.match("/admin")

	return (
		<div>
			<div
				className="background-blur d-flex align-items-center overflow-auto"
				style={{
					visibility: blur ? "visible" : "hidden",
					backdropFilter: "blur(100px)",
				}}>
				<div className="subscription-plan-wizard">
					<div className="d-flex justify-content-center align-items-center">
						<Link
							to="/"
							className="btn mysonar-btn me-2">
							<BackSVG />
							back
						</Link>
						<span className="fs-1 mx-4">
							<LogoSVG />
						</span>
						<Btn
							icon={<LogoutSVG />}
							text="logout"
							onClick={logout}
							loading={logoutLoading}
						/>
					</div>
					<FormWizard
						ref={formWizardRef}
						shape="circle"
						color="#232323"
						stepSize="sm"
						onTabChange={handleTabChange}
						onComplete={handleComplete}
						backButtonTemplate={backTemplate}
						nextButtonTemplate={(handleNext) => (
							<button
								className="btn sonar-btn btn-2 mx-1"
								onClick={handleNext}
								disabled={!subscriptionPlanId}>
								next
								<span className="ms-1">
									<ForwardSVG />
								</span>
							</button>
						)}
						finishButtonTemplate={(handleComplete) => (
							<button
								className="btn sonar-btn btn-2 mx-1"
								onClick={handleComplete}>
								finish
							</button>
						)}>
						<FormWizard.TabContent
							title="Choose Subscription Plan"
							icon={
								<span
									className="text-white rounded-circle px-2"
									style={{ backgroundColor: "#232323" }}>
									<BillableSVG />
								</span>
							}>
							{/* <!-- ***** Pricing Area Start ***** --> */}
							<div className="row mb-3 overflow-auto">
								{subscriptionPlans.map((subscriptionPlan, key) => (
									<div
										key={key}
										className="col-12 col-md-6 col-lg-4">
										<div
											className="single-services-area wow fadeInUp card text-center py-5 px-2"
											style={{ backgroundColor: "#232323", color: "white" }}
											data-wow-delay="300ms">
											<h4 className="text-white">{subscriptionPlan.name}</h4>
											<hr className="w-75 mx-auto border-light my-2" />
											<h5 className="text-white">
												{subscriptionPlan.description}
											</h5>
											{/* <hr className="w-75 mx-auto border-light" />
											{subscriptionPlan.features.map((feature, key) => (
												<span
													key={key}
													className="d-block">
													<span className="text-success fs-4">
														<CheckSVG />
													</span>
													{feature}
												</span>
											))} */}
											<hr className="w-75 mx-auto border-light my-2" />
											<h5 className="mt-2 text-success">
												<small className="fw-lighter me-1">KES</small>
												{subscriptionPlan.price.onboarding_fee.toLocaleString()}{" "}
												onboarding fee
											</h5>
											<h6 className="text-white my-1">then</h6>
											<h5 className="text-success mb-1">
												<small className="fw-lighter me-1">KES</small>
												{subscriptionPlan.price.monthly.toLocaleString()}
												<small className="fw-lighter">/mo</small>
											</h5>
											<h6 className="text-white mb-3">after the 1st month</h6>
											{subscriptionPlanId == subscriptionPlan.id ? (
												<Btn
													text="selected"
													className="btn-green mx-auto"
													onClick={() => {
														setSubscriptionPlanId()
														setSubscriptionPlanAmount()
													}}
												/>
											) : (
												<Btn
													text="select"
													className="btn-white mx-auto"
													onClick={() => {
														setSubscriptionPlanId(subscriptionPlan.id)
														setSubscriptionPlanAmount(
															subscriptionPlan.price.onboarding_fee
														)
													}}
												/>
											)}
										</div>
									</div>
								))}
							</div>
							{/* <!-- ***** Pricing Area End ***** --> */}
						</FormWizard.TabContent>
						<FormWizard.TabContent
							title="Update Payment Details"
							icon={
								<span
									className="text-white rounded-circle py-1 px-2"
									style={{ backgroundColor: "rgba(35, 35, 35, 0.1)" }}>
									<SettingsSVG />
								</span>
							}>
							<form
								onSubmit={onUpdatePhone}
								className="w-25 mx-auto mb-4">
								<label htmlFor="phone">Mpesa Phone Number</label>
								<input
									type="text"
									id="phone"
									name="phone"
									className="form-control mb-3"
									placeholder="254712345678"
									defaultValue={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>

								<Btn
									text="update"
									className="white-btn btn-2"
									loading={updateLoading}
								/>
							</form>
						</FormWizard.TabContent>
						<FormWizard.TabContent
							title="Payment"
							icon={
								<span
									className="text-white rounded-circle py-1 px-2"
									style={{ backgroundColor: "rgba(35, 35, 35, 0.1)" }}>
									<PaymentSVG />
								</span>
							}>
							<div className="w-100 mx-auto mb-4">
								<div className="mt-4 mb-2">
									<button
										className="btn sonar-btn btn-2 mb-4"
										onClick={() => {
											if (props.auth.phone) {
												onSTKPush()
											} else {
												props.setErrors([
													"Please update your phone number first.",
												])
												// Redirect to Previous Tab
												setTimeout(() => {
													formWizardRef.current.goToTab(1)
												}, 1000)
											}
										}}
										disabled={!subscriptionPlanId}>
										<div className="d-flex justify-content-center align-items-center">
											<div className="ms-2">
												<Img
													src="/storage/img/mpesa-logo.jpg"
													style={{ width: "44px", height: "auto" }}
												/>
											</div>
											<div className="mx-2">
												pay{" "}
												<span className="fs-6 text-success">
													<small className="fw-lighter me-1">KES</small>
													{subscriptionPlanAmount.toLocaleString()}
												</span>{" "}
												with mpesa
											</div>
											{/* Loading Start */}
											{mpesaLoading && (
												<div
													id="sonar-load"
													className="me-2"
													style={{ bottom: "0" }}></div>
											)}
											{/* Loading End */}
										</div>
									</button>
								</div>

								<div className={stkPushed}>
									<center>
										<h5>
											Request was sent to
											<span className="text-success"> {props.auth.phone}</span>
										</h5>
										<br />

										<h6>Checking payment</h6>
										<div className="spinner-border spinner-border-lg border-2 text-success my-4 mx-2"></div>
									</center>
								</div>
							</div>
						</FormWizard.TabContent>
					</FormWizard>
				</div>
			</div>
		</div>
	)
}

export default SubscriptionPlan
