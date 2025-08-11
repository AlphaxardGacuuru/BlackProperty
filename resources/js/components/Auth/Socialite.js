import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import CryptoJS from "crypto-js"
import { property } from "lodash"

const Socialite = (props) => {
	let { message, token } = useParams()

	// Encrypt Token
	const encryptedToken = (token) => {
		const secretKey = "BlackPropertyAuthorizationToken"
		// Encrypt
		return CryptoJS.AES.encrypt(token, secretKey).toString()
	}

	useEffect(() => {
		props.setMessages([message])

		// Check if sanctumToken is in Local Storage
		if (props.getLocalStorage("sanctumToken")?.length) {
			// Check if user has an active subscription
			if (props.auth.activeSubscription == null) {
				// Redirect to subscribe page
				setTimeout(() => (window.location.href = "/#/admin/subscribe"), 2000)
			} else {
				// Redirect to index page
				setTimeout(() => (window.location.href = "/#/admin/dashboard"), 2000)
			}

			return
		}

		// Encrypt and Save Sanctum Token to Local Storage
		props.setLocalStorage("sanctumToken", encryptedToken(token))

		// Fetch Auth with Sanctum Token
		Axios.get("/api/auth", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				props.setLocalStorage("auth", res.data.data)
				props.setAuth(res.data.data)
				// Reload
				window.location.reload()
			})
			.catch((error) => {
				props.setErrors(["Failed to fetch user data. Please try again."])
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
				<div className="mt-5">Redirecting...</div>
			</center>
		</div>
	)
}

export default Socialite
