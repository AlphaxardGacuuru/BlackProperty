import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import CryptoJS from "crypto-js"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import { GoogleLoginButton } from "react-social-login-buttons"

import CloseSVG from "@/svgs/CloseSVG"
import LogInSVG from "@/svgs/LogInSVG"
import PersonSVG from "@/svgs/PersonSVG"

const LoginPopUp = (props) => {
	const history = useHistory()
	const location = useLocation()

	const [name, setName] = useState("")
	const [email, setEmail] = useState("alphaxardgacuuru47@gmail.com")
	const [password, setPassword] = useState("alphaxardgacuuru47@gmail.com")
	const [passwordConfirmation, setPasswordConfirmation] = useState()

	const [register, setRegister] = useState(false)
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

	const onLogin = (e) => {
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
					setTimeout(() => window.location.reload(), 1000)
				})
				.catch((err) => {
					// Remove loader
					setLoading(false)
					props.getErrors(err)
				})
		})
	}

	const onRegister = (e) => {
		setLoading(true)
		e.preventDefault()

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post(`/register`, {
				name: name,
				email: email,
				password: password,
				password_confirmation: passwordConfirmation,
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
					setTimeout(() => window.location.reload(), 1000)
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
		props.auth.name == "Guest" && location.pathname.match("/admin")

	return (
		<div className={blur ? "menu-open" : ""}>
			<div
				className="background-blur"
				style={{ visibility: blur ? "visible" : "hidden" }}></div>
			<div className="bottomMenu">
				<div className="d-flex align-items-center justify-content-between">
					{/* <!-- Logo Area --> */}
					<div className="logo-area p-2">
						{register ? <a href="#">Register</a> : <a href="#">Login</a>}
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
					{register ? (
						<form
							method="POST"
							action=""
							onSubmit={onRegister}
							className="p-2">
							{/* Name Start */}
							<input
								id="name"
								type="text"
								className="form-control mb-2"
								name="name"
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required={true}
								autoFocus
							/>
							{/* Name End */}

							{/* Email Start */}
							<input
								id="email"
								type="text"
								className="form-control mb-2"
								name="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required={true}
								autoFocus
							/>
							{/* Email End */}

							{/* Password Start */}
							<input
								id="password"
								type="password"
								name="password"
								placeholder="Password"
								className="form-control mb-3"
								defaultValue={password}
								onChange={(e) => setPassword(e.target.value)}
								required={true}
								autoFocus
							/>
							{/* Password End */}

							{/* Confirm Password Start */}
							<input
								id="passwordConfirmation"
								type="password"
								name="passwordConfirmation"
								placeholder="Confirm Password"
								className="form-control mb-3"
								defaultValue={passwordConfirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								required={true}
								autoFocus
							/>
							{/* Confirm Password End */}

							<div className="d-flex justify-content-between">
								{/* Login Start */}
								<Btn
									type="submit"
									className="border-light"
									icon={<LogInSVG />}
									text="login"
									onClick={() => setRegister(false)}
									loading={loading}
								/>
								{/* Login End */}

								{/* Register Start */}
								<Btn
									type="submit"
									className="border-light"
									icon={<PersonSVG />}
									text="register"
									loading={loading}
								/>
								{/* Register End */}
							</div>
						</form>
					) : (
						<>
							<GoogleLoginButton
								className="rounded-0 mt-2"
								onClick={() => onSocial("google")}
							/>

							<div className="d-flex align-items-center">
								<hr className="border-light w-50" />
								<h6 className="text-white mx-2">OR</h6>
								<hr className="border-light w-50" />
							</div>

							<form
								method="POST"
								action=""
								onSubmit={onLogin}
								className="p-2">
								{/* Email Start */}
								<input
									id="email"
									type="text"
									className="form-control mb-2"
									name="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required={true}
									autoFocus
								/>
								{/* Email End */}

								{/* Password Start */}
								<input
									id="password"
									type="password"
									name="password"
									placeholder="Password"
									className="form-control mb-3"
									defaultValue={password}
									onChange={(e) => setPassword(e.target.value)}
									required={true}
									autoFocus
								/>
								{/* Password End */}

								<div className="d-flex justify-content-between">
									{/* Register Start */}
									<Btn
										type="submit"
										className="border-light"
										icon={<PersonSVG />}
										text="Register"
										onClick={() => setRegister(true)}
										loading={loading}
									/>
									{/* Register End */}

									<div className="d-flex align-items-center">
										<MyLink
											to="/forgot-password"
											className="text-white me-2"
											text="Forgot Password?"
										/>
										{/* Login Start */}
										<Btn
											type="submit"
											className="border-light"
											icon={<LogInSVG />}
											text="Login"
											loading={loading}
										/>
										{/* Login End */}
									</div>
								</div>
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default LoginPopUp
