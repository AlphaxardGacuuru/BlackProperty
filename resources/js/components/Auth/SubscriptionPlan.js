import React, { useState, useEffect, useRef } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

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
import CheckSVG from "@/svgs/CheckSVG"
import PersonSVG from "@/svgs/PersonSVG"

const SubscriptionPlan = (props) => {
	const history = useHistory()
	const location = useLocation()
	const formWizardRef = useRef(null)

	const [subscriptionPlans, setSubscriptionPlans] = useState([])
	const [subscriptionPlan, setSubscriptionPlan] = useState({})
	const [phone, setPhone] = useState(props.auth.phone)
	const [mpesaTransaction, setMpesaTransaction] = useState({})

	const [logoutLoading, setLogoutLoading] = useState(false)
	const [cantGoToNext, setCantGoToNext] = useState(false)
	const [updateLoading, setUpdateLoading] = useState(false)
	const [mpesaLoading, setMpesaLoading] = useState()
	const [stkPushed, setStkPushed] = useState("d-none")

	const blur =
		props.auth.name != "Guest" &&
		!props.auth.activeSubscription?.id &&
		props.auth.emailVerifiedAt &&
		location.pathname.match("/admin")

	useEffect(() => {
		// Fetch Subscription Plan
		if (blur) {
			Echo.private(`mpesa-transaction-created.${props.auth.id}`).listen(
				"MpesaTransactionCreatedEvent",
				(e) => {
					console.info("Event:" + e)
					setMpesaTransaction(e.mpesaTransaction)
				}
			)

			props.get(`subscription-plans`, setSubscriptionPlans)
		}
	}, [props.auth])

	useEffect(() => {
		if (mpesaTransaction.id) {
			setStkPushed("d-none")
			props.setMessages(["Payment Received!"])
			onSubscribe()
		}
	}, [mpesaTransaction])

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

		Axios.post("/api/stk-push", {
			amount: subscriptionPlan.price.onboarding_fee,
		})
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

	const onSubscribe = () => {
		Axios.post("/api/subscription-plans/subscribe", {
			subscriptionPlanId: subscriptionPlan.id,
			amountPaid: subscriptionPlan.price.onboarding_fee,
			duration: 1,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Fetch Auth to set the Subscription Plan
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => {
				props.getErrors(err)
			})
	}

	const handleTabChange = ({ prevIndex, nextIndex}) => {
		if (nextIndex == 2) {
			setCantGoToNext(!subscriptionPlan.id)
		}
	}

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

	return (
		<div>
			<div
				className="background-blur d-flex align-items-center overflow-auto"
				style={{
					visibility: blur ? "visible" : "hidden",
					backdropFilter: "blur(100px)",
				}}>
				<div className="subscription-plan-wizard">
					<div className="d-flex justify-content-between align-items-center">
						<div className="">
							<Link
								to="/"
								className="btn mysonar-btn">
								<BackSVG />
								back
							</Link>
						</div>
						<div className="flex-grow-1 w-100">
							<span className="fs-1">
								<LogoSVG />
							</span>
						</div>
						<div className="">
							<Btn
								icon={<LogoutSVG />}
								text="logout"
								onClick={logout}
								loading={logoutLoading}
							/>
						</div>
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
								disabled={cantGoToNext}>
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
							title={`Welcome ${props.auth.name}`}
							icon={
								<span
									className="text-white rounded-circle py-1 px-2"
									style={{ backgroundColor: "#232323" }}>
									<PersonSVG />
								</span>
							}>
							{/* <!-- ***** Pricing Area Start ***** --> */}
							<div className="row my-5 overflow-auto">
								<h1>Welcome {props.auth.name}</h1>
								<h2>Let's set you up with a Subscription.</h2>
							</div>
							{/* <!-- ***** Pricing Area End ***** --> */}
						</FormWizard.TabContent>
						<FormWizard.TabContent
							title="Choose Subscription Plan"
							icon={
								<span
									className="text-white rounded-circle py-1 px-2"
									style={{ backgroundColor: "#232323" }}>
									<BillableSVG />
								</span>
							}>
							{/* <!-- ***** Pricing Area Start ***** --> */}
							<div className="row mb-3 overflow-auto">
								{subscriptionPlans.length > 0 ? (
									<React.Fragment>
										{subscriptionPlans.map((subscriptionPlanItem, key) => (
											<div
												key={key}
												className="col-12 col-md-6 col-lg-4">
												<div
													className="single-services-area wow fadeInUp card text-center py-5 px-2"
													style={{ backgroundColor: "#232323", color: "white" }}
													data-wow-delay="300ms">
													<h4 className="text-white">
														{subscriptionPlanItem.name}
													</h4>
													<hr className="w-75 mx-auto border-light my-2" />
													<h5 className="text-white">
														{subscriptionPlanItem.description}
													</h5>
													{/* <hr className="w-75 mx-auto border-light" />
											{subscriptionPlanItem.features.map((feature, key) => (
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
														{subscriptionPlanItem.price.onboarding_fee.toLocaleString()}{" "}
														onboarding fee
													</h5>
													<h6 className="text-white my-1">then</h6>
													<h5 className="text-success mb-1">
														<small className="fw-lighter me-1">KES</small>
														{subscriptionPlanItem.price.monthly.toLocaleString()}
														<small className="fw-lighter">/mo</small>
													</h5>
													<h6 className="text-white mb-3">
														after the 1st month
													</h6>
													{subscriptionPlanItem.id == subscriptionPlan.id ? (
														<Btn
															text="selected"
															iconFront={<CheckSVG />}
															className="btn-green mx-auto"
															onClick={() => setSubscriptionPlan()}
														/>
													) : (
														<Btn
															text="select"
															className="btn-white mx-auto"
															onClick={() =>
																setSubscriptionPlan(subscriptionPlanItem)
															}
														/>
													)}
												</div>
											</div>
										))}
									</React.Fragment>
								) : (
									<React.Fragment>
										{[1, 2, 3].map((item) => (
											<div
												key={item}
												className="col-12 col-md-6 col-lg-4">
												<div
													className="single-services-area wow fadeInUp card text-center py-5 px-2"
													style={{ backgroundColor: "#232323", color: "white" }}
													data-wow-delay="300ms">
													<h4 className="text-white">Loading...</h4>
													<hr className="w-75 mx-auto border-light my-2" />
													<h5 className="text-white">Please wait...</h5>
												</div>
											</div>
										))}
									</React.Fragment>
								)}
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
										disabled={!subscriptionPlan.id}>
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
													{subscriptionPlan.price?.onboarding_fee.toLocaleString()}
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
										<div className="spinner-border spinner-border-md border-2 text-success my-4 mx-2"></div>
									</center>
								</div>

								{/* Payment Received Start */}
								{mpesaTransaction.user_id == props.auth.id && (
									<div>
										<h5>Redirecting you</h5>
										<div className="spinner-grow spinner-grow-md text-primary my-4 mx-2"></div>
									</div>
								)}
								{/* Payment Received End */}
							</div>
						</FormWizard.TabContent>
					</FormWizard>
				</div>
			</div>
		</div>
	)
}

export default SubscriptionPlan
