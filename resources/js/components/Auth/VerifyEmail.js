import React, { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"

const VerifyEmail = (props) => {
	const { id, hash } = useParams()
	const location = useLocation()

	// Parse query parameters
	const queryParams = new URLSearchParams(location.search)
	const expires = queryParams.get("expires")
	const signature = queryParams.get("signature")

	useEffect(() => {
		// Check if sanctumToken in in Local Storage
		if (props.auth.emailVerifiedAt) {
			// Redirect to index page
			setTimeout(() => (window.location.href = "/#/admin/subscribe"), 2000)
			return
		}

		Axios.post(
			`/verify-email/${id}/${hash}?expires=${expires}&signature=${signature}`
		)
			.then((res) => {
				props.setMessages([res.data.message])

				Axios.get("/api/auth")
					.then((res) => {
						props.setLocalStorage("auth", res.data.data)
						props.setAuth(res.data.data)
						// Reload
						window.location.reload()
					})
					.catch((err) => {
						props.setErrors(["Failed to fetch user data."])
					})
			})
			.catch((err) => {
				props.setErrors(["Failed to Verify Email"])
				window.location.replace("/#/admin/dashboard")
			})
	}, [])

	return (
		<div
			id="preloader"
			style={{ top: "0" }}>
			<center className="mt-5 p-5">
				<h2 className="my-5">Welcome to Black Property</h2>
				<div
					className="spinner-border text-dark my-auto"
					style={{ width: "5em", height: "5em" }}></div>
				<h4 className="mt-5">Verifying your email...</h4>
			</center>
		</div>
	)
}

export default VerifyEmail
