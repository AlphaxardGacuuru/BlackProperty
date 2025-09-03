import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"
import EditSVG from "@/svgs/EditSVG"

const ForgotPassword = (props) => {
	const history = useHistory()
	const [email, setEmail] = useState([])

	const [loading, setLoading] = useState()
	const [emailSent, setEmailSent] = useState()
	const [timer, setTimer] = useState()

	/*
	 * Count Down from 60s
	 */
	const countDown = () => {
		setTimer(60)

		const interval = setInterval(() => {
			setTimer((prev) => {
				if (prev === 1) {
					clearInterval(interval)
				}
				return prev - 1
			})
		}, 1000)
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.post("/forgot-password", {
			email: email,
		})
			.then((res) => {
				setLoading(false)
				setEmailSent(true)

				// Show messages
				props.setMessages([res.data.message])
				// Start Count Down
				countDown()
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
				<div className="card shadow-sm my-5">
					<div className="card-header bg-secondary text-white">
						Forgot Password?
					</div>
					<div className="card-body">
						<form onSubmit={onSubmit}>
							{/* Email Start */}
							<label
								htmlFor="email"
								className="text-muted">
								Forgot your password? No problem. Just let us know your email
								address and we will email you a password reset link that will
								allow you to reset your password.
							</label>
							{emailSent && (
								<p className="text-success fw-bold">
									We have emailed your password reset link!.
								</p>
							)}
							<input
								type="email"
								placeholder="Email"
								className="form-control mb-2"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{/* Email End */}

							<div className="d-flex justify-content-end mb-2">
								{/* Show Timer Start */}
								{timer > 0 ? (
									<span className="text-muted">
										Resend link in{" "}
										<span className="text-warning fw-bold">
											{timer} seconds
										</span>
									</span>
								) : (
									<Btn
										text="email password reset link"
										loading={loading}
									/>
								)}
								{/* Show Timer End */}
							</div>

							<div className="d-flex justify-content-center">
								<Btn
									icon={<BackSVG />}
									text="back to dashboard"
									onClick={(e) => {
										e.preventDefault()
										history.goBack()
									}}
								/>
							</div>

							<div className="col-sm-4"></div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword
