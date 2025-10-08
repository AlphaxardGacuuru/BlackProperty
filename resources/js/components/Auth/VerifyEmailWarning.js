import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import Btn from "@/components/Core/Btn"
import SendEmailSVG from "@/svgs/SendEmailSVG"

const VerifyEmail = (props) => {
	const location = useLocation()

	const [loading, setLoading] = useState(false)
	const [countdown, setCountdown] = useState(60)
	const [canResend, setCanResend] = useState(true)

	// Timer effect
	useEffect(() => {
		let timer

		if (countdown > 0) {
			timer = setTimeout(() => {
				setCountdown(countdown - 1)
			}, 1000)
		} else if (countdown === 0 && !canResend) {
			setCanResend(true)
		}

		return () => clearTimeout(timer)

	}, [countdown, canResend])

	const blur =
		props.auth.name != "Guest" &&
		!props.auth.emailVerifiedAt &&
		(location.pathname.match("/admin/") || location.pathname.match("/tenant/"))

	const resendVerificationEmail = () => {
		if (!canResend || loading) return

		setLoading(true)
		setCanResend(false)
		setCountdown(60) // 60 second cooldown

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post("/email/verification-notification")
				.then((res) => {
					props.setMessages([res.data.message])
					setLoading(false)
				})
				.catch((err) => {
					props.setErrors(["Failed to resend verification email"])
					setLoading(false)
					// Reset timer on error
					setCanResend(true)
					setCountdown(0)
				})
		})
	}

	return (
		<div
			className="background-blur d-flex align-items-center overflow-auto"
			style={{
				visibility: blur ? "visible" : "hidden",
				backdropFilter: "blur(100px)",
			}}>
			<div className="mt-5 pt-5 text-center">
				<h1 className="mb-5">Please Verify Your Email</h1>
				<h2 className="mb-5">
					Check your inbox for a verification email and follow the instructions.
				</h2>
				<button
					className={`btn sonar-btn btn-2 px-3 ${!canResend ? "disabled" : ""}`}
					onClick={resendVerificationEmail}
					disabled={!canResend || loading}>
					<div className="d-flex justify-content-center align-items-center">
						<span className="me-1">
							<SendEmailSVG />
						</span>
						{countdown > 0
							? `resend in ${countdown}s`
							: "resend verification email"}
						{loading && (
							<div className="d-flex align-items-center ms-2">
								<div id="sonar-load"></div>
							</div>
						)}
					</div>
				</button>

				{countdown > 0 && !loading && (
					<div className="mt-3 text-muted">
						<small>
							Please wait {countdown} seconds before requesting another email
						</small>
					</div>
				)}
			</div>
		</div>
	)
}

export default VerifyEmail
