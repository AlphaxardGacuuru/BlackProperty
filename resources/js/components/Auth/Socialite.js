import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import CryptoJS from "crypto-js"

const Socialite = (props) => {
	let { message, token } = useParams()

	useEffect(() => {
		props.setMessages([message])

		// Encrypt Token
		const encryptedToken = (token) => {
			const secretKey = "BlackPropertyAuthorizationToken"
			// Encrypt
			return CryptoJS.AES.encrypt(token, secretKey).toString()
		}

		// Encrypt and Save Sanctum Token to Local Storage
		// props.setLocalStorage("sanctumToken", encryptedToken(token))

		// Redirect to index page
		// window.location.href = "/#/admin/dashboard"
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
