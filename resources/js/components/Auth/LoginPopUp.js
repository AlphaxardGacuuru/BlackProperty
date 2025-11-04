import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import CryptoJS from "crypto-js"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import { GoogleLoginButton } from "react-social-login-buttons"

import CloseSVG from "@/svgs/CloseSVG"
import LogInSVG from "@/svgs/LogInSVG"
import PersonSVG from "@/svgs/PersonSVG"
import TenantSVG from "@/svgs/TenantSVG"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const LoginPopUp = (props) => {
	const history = useHistory()
	const location = useLocation()

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState()

	const [register, setRegister] = useState(false)
	const [tenantLogin, setTenantLogin] = useState(
		location.pathname.match("/tenant")
	)
	const [registerLoading, setRegisterLoading] = useState(false)
	const [loginLoading, setLoginLoading] = useState(false)

	/*
	 * Handle Referral Start
	 */
	// Get the referer from URL hash fragment query parameters
	const searchParams = new URLSearchParams(location.search)
	const referer = searchParams.get("referer")

	if (referer) {
		props.setLocalStorage("referer", referer)
	}
	/*
	 * Handle Referral End
	 */

	const onSocial = (website) => {
		window.location.href = `/login/${website}`
	}

	const handleTenantLogin = (e) => {
		e.preventDefault()

		props.setLocalStorage("tenant", !tenantLogin)

		setTenantLogin(!tenantLogin)
	}

	const postReferral = async (sanctumToken) => {
		// Get referer from local storage
		const referer = props.getLocalStorage("referer", "string")

		if (referer) {
			try {
				var res = await Axios.post(
					"/api/referrals",
					{ referer: referer },
					{ headers: { Authorization: `Bearer ${sanctumToken}` } }
				)

				props.setMessages([res.data.message])

				// Clear referer from local storage
				props.setLocalStorage("referer", null)
			} catch (error) {
				console.error("Failed to post referral:", error)
			}
		}
	}

	// Encrypt Token
	const encryptedToken = (token) => {
		const secretKey = "BlackPropertyAuthorizationToken"
		// Encrypt
		return CryptoJS.AES.encrypt(token, secretKey).toString()
	}

	const onLogin = (e) => {
		setLoginLoading(true)
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
					setLoginLoading(false)
					// Hide Login Pop Up
					props.setLogin(false)
					// Encrypt and Save Sanctum Token to Local Storage
					props.setLocalStorage("sanctumToken", encryptedToken(res.data.data))
					props.setLocalStorage("tenant", null)

					// Reload page
					setTimeout(() => {
						// Redirect to Tenant if tenant is set
						if (tenantLogin) {
							window.location.href = "/#/tenant/dashboard"
						} else {
							window.location.href = "/#/admin/dashboard"
						}

						window.location.reload()
					}, 1000)
				})
				.catch((err) => {
					// Remove loader
					setLoginLoading(false)
					props.getErrors(err)
				})
		})
	}

	const onRegister = (e) => {
		setRegisterLoading(true)
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
					setRegisterLoading(false)
					// Hide Login Pop Up
					props.setLogin(false)
					// Encrypt and Save Sanctum Token to Local Storage
					props.setLocalStorage("sanctumToken", encryptedToken(res.data.data))

					// Register Referer synchronously
					postReferral(res.data.data)

					// Fetch Auth with Sanctum Token
					Axios.get("/api/auth", {
						headers: { Authorization: `Bearer ${res.data.data}` },
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
				})
				.catch((err) => {
					// Remove loader
					setRegisterLoading(false)
					props.getErrors(err)
				})
		})
	}

	const blur =
		// props.login ||
		props.auth.name == "Guest" &&
		!location.pathname.match("/forgot-password") &&
		// !location.pathname.match("/tenant/vacant-units") &&
		(location.pathname.match("/admin") ||
			location.pathname.match("/tenant") ||
			location.pathname.match("/super"))

	return (
		<div className={blur ? "menu-open" : ""}>
			<div
				className="background-blur"
				style={{ visibility: blur ? "visible" : "hidden" }}></div>
			<div className="bottomMenu">
				<div className="d-flex align-items-center justify-content-between">
					{/* <!-- Logo Area --> */}
					<div className="logo-area p-2">
						<a href="#">
							{tenantLogin ? "Tenant" : "Admin"}{" "}
							{register ? "Register" : "Login"}
						</a>
					</div>
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon float-end"
						style={{ fontSize: "1em" }}
						onClick={() => {
							props.setLogin(false)
							// Check location to index
							location.pathname.match("/admin")
								? history.push("/admin/dashboard")
								: history.push("/tenant/dashboard")
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
									loading={loginLoading}
								/>
								{/* Login End */}

								{/* Register Start */}
								<Btn
									type="submit"
									className="border-light"
									icon={<PersonSVG />}
									text="register"
									loading={registerLoading}
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
									<div className="d-flex align-items-center flex-wrap">
										{/* Register Start */}
										{!tenantLogin && (
											<Btn
												type="submit"
												className="border-light me-2 mb-2"
												icon={<PersonSVG />}
												text="Register"
												onClick={() => setRegister(true)}
												loading={registerLoading}
											/>
										)}
										{/* Register End */}

										{/* Tenant Login Start */}
										<Btn
											type="button"
											className="border-light mb-2"
											icon={<TenantSVG />}
											text={`${tenantLogin ? "Admin" : "Tenant"} Login`}
											onClick={handleTenantLogin}
										/>
										{/* Tenant Login End */}
									</div>

									<div className="d-flex justify-content-end align-items-center flex-wrap">
										<Link
											to="/forgot-password"
											className="btn mysonar-btn text-white me-2 mb-2">
											Forgot Password?
										</Link>
										{/* Login Start */}
										<Btn
											type="submit"
											className="border-light mb-2"
											icon={<LogInSVG />}
											text="Login"
											loading={loginLoading}
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
