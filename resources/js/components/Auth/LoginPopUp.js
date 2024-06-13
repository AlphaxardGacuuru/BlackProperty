import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import CryptoJS from "crypto-js"

import Btn from "@/components/Core/Btn"

import CloseSVG from "@/svgs/CloseSVG"

import { GoogleLoginButton } from "react-social-login-buttons"

const LoginPopUp = (props) => {
	const history = useHistory()
	const location = useLocation()

	const [email, setEmail] = useState("alphaxardgacuuru47@gmail.com")
	const [phoneLogin, setPhoneLogin] = useState(false)
	const [password, setPassword] = useState("alphaxardgacuuru47@gmail.com")
	const [loading, setLoading] = useState(false)

	const onSocial = (website) => {
		window.location.href = `/login/${website}`
	}

	// Encrypt Token
	const encryptedToken = (token) => {
		const secretKey = "BlackPropertyAuthorizationToken"
		// Encrypt
		return CryptoJS.AES.encrypt(token, secretKey).toString()
	}

	const onSubmit = (e) => {
		setLoading(true)
		e.preventDefault()

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post(`/login`, {
				email: email,
				password: password,
				device_name: "deviceName",
				remember: "checked",
			})
				.then((res) => {
					props.setMessages([res.data.message])
					// Remove loader
					setLoading(false)
					// Hide Login Pop Up
					props.setLogin(false)
					// Encrypt and Save Sanctum Token to Local Storage
					props.setLocalStorage("sanctumToken", encryptedToken(res.data.data))
					// Update Logged in user
					props.get(`auth`, props.setAuth, "auth", false)
					// Reload page
					// setTimeout(() => window.location.reload(), 1000)
				})
				.catch((err) => {
					// Remove loader
					setLoading(false)
					props.getErrors(err)
				})
		})
	}

	const blur =
		// props.login ||
		props.auth.name == "Guest" &&
		!location.pathname.match("/socialite") &&
		!location.pathname.match("/register")

	return (
		<div className={blur ? "menu-open" : ""}>
			<div
				className="background-blur"
				style={{ visibility: blur ? "visible" : "hidden" }}></div>
			<div className="bottomMenu">
				<div className="d-flex align-items-center justify-content-between">
					{/* <!-- Logo Area --> */}
					<div className="logo-area p-2">
						<a href="#">Login</a>
					</div>
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon float-end"
						style={{ fontSize: "1em" }}
						onClick={() => {
							props.setLogin(false)
							// Check location to index
							history.push("/admin/dashboard")
						}}>
						<CloseSVG />
					</div>
				</div>
				<div className="p-2">
					{phoneLogin ? (
						<center>
							<div className="mycontact-form">
								<form
									method="POST"
									action=""
									onSubmit={onSubmit}>
									<input
										id="email"
										type="text"
										className="form-control"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required={true}
										autoFocus
									/>

									<Btn
										type="submit"
										className="border-light mt-2 w-75"
										text="Login"
										loading={loading}
									/>
								</form>

								<Btn
									className="border-light mt-1 w-50"
									text="back"
									onClick={() => setPhoneLogin(false)}
								/>
							</div>
						</center>
					) : (
						<>
							<GoogleLoginButton
								className="rounded-0 mt-2"
								onClick={() => onSocial("google")}
							/>

							{!window.location.href.match(/https/) && (
								<Btn
									className="border-light mt-1 w-75"
									text="login with email"
									onClick={() => setPhoneLogin(true)}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default LoginPopUp
