import React, { useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import CryptoJS from "crypto-js"
// import Axios from "axios"
// import { useAuth } from "@/hooks/auth";

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"

import { GoogleLoginButton } from "react-social-login-buttons"

const LoginPopUp = (props) => {
	const history = useHistory()
	const location = useLocation()

	const [email, setEmail] = useState("alphaxardgacuuru47@gmail.com")
	const [password, setPassword] = useState("alphaxardgacuuru47@gmail.com")
	const [status, setStatus] = useState()
	const [errors, setErrors] = useState([])
	const [loading, setLoading] = useState(false)

	const onSocial = (website) => {
		window.location.href = `/login/${website}`
	}

	// const [phone, setPhone] = useState('07')
	const [manualLogin, setManualLogin] = useState(false)

	// Encrypt Token
	const encryptedToken = (token) => {
		const secretKey = "PartyPeopleAuthorizationToken"
		// Encrypt
		return CryptoJS.AES.encrypt(token, secretKey).toString()
	}

	const onSubmit = (e) => {
		setLoading(true)
		e.preventDefault()

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post(`${props.url}/login`, {
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

			// setPhone("07")
		})
	}

	const blur =
		// props.login ||
		props.auth.name == "Guest" &&
		!location.pathname.match("/socialite") &&
		!location.pathname.match("/register") &&
		!location.pathname.match("/admin/")

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

					<div className="d-flex align-items-center justify-content-between">
						{/* Admin */}
						<Link
							to="/admin"
							className="nav-link">
							Admin
						</Link>

						{/* Service Provider */}
						<Link
							to="/service-provider"
							className="nav-link">
							Service Provider
						</Link>
					</div>

					<div
						className="closeIcon float-end"
						style={{ fontSize: "1em" }}
						onClick={() => {
							props.setLogin(false)
							// Check location to index
							history.push("/")
						}}>
						<CloseSVG />
					</div>
				</div>
				{manualLogin ? (
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

								<input
									id="password"
									type="password"
									className="form-control my-2"
									name="password"
									placeholder="Password"
									value={email}
									onChange={(e) => setPassword(e.target.value)}
									required={true}
									autoFocus
								/>

								<Btn
									type="submit"
									btnclassName="btn-primary text-white w-100 mt-2"
									btnText="Login"
									loading={loading}
								/>
							</form>

							<Btn
								btnText="back"
								btnclassName="btn-outline-primary w-100 mt-2"
								onClick={() => setManualLogin(false)}
							/>
						</div>
					</center>
				) : (
					<>
						<GoogleLoginButton
							className="rounded-pill m-0 w-100"
							onClick={() => onSocial("google")}
						/>

						<Btn
							btnclassName="btn-outline-primary w-100 my-2"
							btnText="login with email"
							onClick={() => setManualLogin(true)}
						/>

						<div>OR</div>

						<MyLink
							className="w-100 mt-2"
							linkTo="/register/Name/Email/Avatar"
							text="register"
						/>
					</>
				)}
			</div>
		</div>
	)
}

export default LoginPopUp
