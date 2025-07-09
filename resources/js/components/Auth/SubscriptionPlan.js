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

	const [cantGoToNext, setCantGoToNext] = useState(true)
	const [updateLoading, setUpdateLoading] = useState(false)
	const [mpesaLoading, setMpesaLoading] = useState()
	const [stkPushed, setStkPushed] = useState("d-none")
	const [simulateLoading, setSimulateLoading] = useState()
	const [subscribeLoading, setSubscribeLoading] = useState(true)

	useEffect(() => {

		window.Echo.connector.pusher.connection.bind("error", (error) => {
			console.error("WebSocket Error:", error)
		})

		// In browser console
		Echo.connector.pusher.connection.bind("connected", () => {
			console.log("WebSocket connected!")
		})
		
		// Set page
		props.setPage({ name: "Subscribe", path: ["dashboard", "subscribe"] })

		// Fetch Subscription Plan
		Echo.private(`mpesa-transaction-created.${props.auth.id}`).listen(
			"MpesaTransactionCreatedEvent",
			(e) => {
				console.info(e)
				setMpesaTransaction(e.mpesaTransaction)
			}
		)

		props.get(`subscription-plans`, setSubscriptionPlans)

		
	}, [props.auth])

	useEffect(() => {
		if (mpesaTransaction.id) {
			setStkPushed("d-none")
			props.setMessages(["Payment Received!"])
			onSubscribe()
		}
	}, [mpesaTransaction])

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

	const onSimulatePayment = () => {
		setSimulateLoading(true)

		Axios.post("/api/mpesa-transactions", {
			data: {
				id: "49b2bf39-0bff-4f37-8b19-43ca21ab3bf2",
				type: "incoming_payment",
				attributes: {
					initiation_time: "2020-10-21T09:30:34.331+03:00",
					status: "Success",
					event: {
						type: "Incoming Payment Request",
						resource: {
							id: "f39-0bff-44ef4-0629-481f-83cd-d101f",
							reference: "OJL7OW3J59",
							origination_time: "2020-10-21T09:30:40+03:00",
							sender_phone_number: "+254700364446",
							amount: "5000.0",
							currency: "KES",
							till_number: "K000000",
							system: "Lipa Na M-PESA",
							status: "Received",
							sender_first_name: "Joe",
							sender_middle_name: null,
							sender_last_name: "Buyer",
						},
						errors: null,
					},
					metadata: {
						customer_id: "123456789",
						reference: "123456",
						notes: "Payment for invoice 12345",
					},
					_links: {
						callback_url:
							"https://webhook.site/675d4ef4-0629-481f-83cd-d101f55e4bc8",
						self: "https://sandbox.kopokopo.com/api/v1/incoming_payments/49b2bf39-0bff-4f37-8b19-43ca21ab3bf2",
					},
				},
			},
		})
			.then((res) => {
				setSimulateLoading(false)
				props.setMessages([res.data.message])
				// Fetch Auth to set the Subscription Plan
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => {
				setSimulateLoading(false)
				props.getErrors(err)
			})
	}

	const onSubscribe = () => {
		setSubscribeLoading(true)

		Axios.post("/api/subscription-plans/subscribe", {
			subscriptionPlanId: subscriptionPlan.id,
			amountPaid: subscriptionPlan.price.onboarding_fee,
			duration: 1,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Fetch Auth to set the Subscription Plan
				Axios.get("api/auth")
					.then((res) => {
						props.setAuth(res.data.data)
						props.setLocalStorage("auth", res.data.data)
						setSubscribeLoading(false)
						// Redirect to Dashboard
						setTimeout(() => history.push("/admin/dashboard"), 1000)
					})
					.catch((err) => {
						setSubscribeLoading(false)
						props.setErrors["Failed to Fetch Auth"]
					})
			})
			.catch((err) => {
				props.getErrors(err)
			})
	}

	const handleTabChange = ({ prevIndex, nextIndex }) => {
		if (nextIndex >= 2) {
			setTimeout(() => setCantGoToNext(!subscriptionPlan.id), 500)
		} else {
			setTimeout(() => setCantGoToNext(false), 500)
		}
	}

	const handleComplete = () => {}

	const backTemplate = (handlePrevious) => {
		return (
			<button
				className="btn sonar-btn btn-2 mx-1 mb-2"
				onClick={handlePrevious}>
				<BackSVG />
				back
			</button>
		)
	}

	return (
		<div className="text-center">
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
						className="btn sonar-btn btn-2 mx-1 mb-2"
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
						className="btn sonar-btn btn-2 mx-1 mb-2"
						onClick={handleComplete}>
						<div className="d-flex align-items-center">
							{subscribeLoading ? "finishing" : "finish"}
							{subscribeLoading ? (
								<div
									id="sonar-load"
									className="mx-2"
									style={{ bottom: "0" }}></div>
							) : (
								<span className="ms-1">
									<ForwardSVG />
								</span>
							)}
						</div>
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
					<div className="row mb-3">
						{subscriptionPlans.length > 0 ? (
							<React.Fragment>
								{subscriptionPlans.map((subscriptionPlanItem, key) => (
									<div
										key={key}
										className="col-sm-4 mb-2">
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
											<h6 className="text-white mb-3">after the 1st month</h6>
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
					<div className="row">
						<div className="col-sm-4"></div>
						<div className="col-sm-4">
							<form
								onSubmit={onUpdatePhone}
								className="mx-auto mb-4">
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
						</div>
						<div className="col-sm-4"></div>
					</div>
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
							{/* Pay Button Start */}
							<button
								className="btn sonar-btn btn-2 mb-4"
								onClick={() => {
									if (props.auth.phone) {
										onSTKPush()
									} else {
										props.setErrors(["Please update your phone number first."])
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
							{/* Pay Button End */}
						</div>

						<div className={stkPushed}>
							<center>
								{/* Simulate Payment Start */}
								{/* Check if url is property.black.co.ke */}
								{window.location.hostname !== "property.black.co.ke" && (
									<button
										className="btn sonar-btn btn-2 mb-4"
										onClick={onSimulatePayment}>
										<div className="d-flex justify-content-center align-items-center">
											<div className="mx-2">simulate payment</div>
											{/* Loading Start */}
											{simulateLoading && (
												<div
													id="sonar-load"
													className="me-2"
													style={{ bottom: "0" }}></div>
											)}
											{/* Loading End */}
										</div>
									</button>
								)}
								{/* Simulate Payment End */}

								<h5>
									Request was sent to
									<span className="text-success"> {props.auth.phone}</span>
								</h5>
								<br />

								<h6>Checking payment</h6>
								<div className="spinner-border spinner-border-md border-2 text-success my-4 mx-2"></div>
								<h5 className="text-warning">
									Do not leave the page while we process your payment
								</h5>
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
	)
}

export default SubscriptionPlan
