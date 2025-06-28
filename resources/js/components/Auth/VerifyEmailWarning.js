import React, { useState } from "react"
import { useLocation } from "react-router-dom"

import Btn from "@/components/Core/Btn"
import SendEmailSVG from "@/svgs/SendEmailSVG"

const VerifyEmail = (props) => {
	const location = useLocation()

	const [loading, setLoading] = useState(false)

	const blur =
		props.auth.name != "Guest" &&
		!props.auth.emailVerifiedAt &&
		location.pathname.match("/admin")

	const resendVerificationEmail = () => {
		setLoading(true)
		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post("/email/verification-notification")
				.then((res) => {
					props.setMessages([res.data.message])
					setLoading(false)
				})
				.catch((err) => {
					props.setErrors(["Failed to resend verification email"])
					setLoading(false)
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
					className="btn sonar-btn btn-2 px-3"
					onClick={resendVerificationEmail}>
					<div className="d-flex justify-content-center align-items-center">
						<span className="me-1">
							<SendEmailSVG />
						</span>
						resend verification email
						{loading && (
							<div className="d-flex align-items-center ms-2">
								<div id="sonar-load"></div>
							</div>
						)}
					</div>
				</button>
			</div>
		</div>
	)
}

export default VerifyEmail
