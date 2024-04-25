import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Btn from "@/components/Core/Btn"

import CryptoJS from "crypto-js"

import { GoogleLoginButton } from "react-social-login-buttons"

const login = (props) => {
	var router = useHistory()

	const [tab, setTab] = useState("admin")
	const [email, setEmail] = useState("alphaxardgacuuru47@gmail.com")
	const [password, setPassword] = useState("alphaxardgacuuru47@gmail.com")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (props.auth.name != "Guest") {
			// Handle Redirects
			if (props.auth.accountType == "staff") {
				router.push(`/admin/dashboard`)
			} else if (props.auth.accountType == "instructor") {
				router.push(`/instructor/${props.auth.id}/show`)
			} else {
				router.push(`/student/${props.auth.id}/show`)
			}
		}
	}, [])

	/*
	 * Encrypt Token
	 */
	const encryptedToken = (token) => {
		const secretKey = "OnlineUniversityAuthorizationToken"
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
					// Encrypt and Save Sanctum Token to Local Storage
					props.setLocalStorage("sanctumToken", encryptedToken(res.data.data))
					// Update Logged in user
					Axios.get("/api/auth", {
						headers: { Authorization: `Bearer ${res.data.data}` },
					})
						.then((res) => {
							// Set LocalStorage
							props.setLocalStorage("auth", res.data.data)
							// Reload page
							// window.location.href = `/#/instructor`
							window.location.reload()
						})
						.catch((err) => props.getErrors(err, false))
				})
				.catch((err) => {
					// Remove loader
					setLoading(false)
					props.getErrors(err)
				})
		})
	}

	return (
		<section className="signup-section spad pt-5">
			<div
				className="signup-bg set-bg"
				style={{ background: `url("/storage/img/signup-bg.jpg")` }}></div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<div className="signup-warp">
							<div className="section-title text-white text-left">
								<h2>Sign up to became a student</h2>
								<p></p>
							</div>
							{/* <!-- signup form --> */}
							<form
								onSubmit={onSubmit}
								className="signup-form">
								{/* <GoogleLoginButton
									className="border-0 m-0 w-100 mb-4"
									onClick={() => onSocial("google")}
								/> */}

								{/* Tabs */}
								<div className="d-flex justify-content-between mb-4">
									<button
										type="reset"
										className="btn text-white rounded-0 w-100"
										style={{
											backgroundColor: tab == "admin" ? "#d82a4e" : "#000",
										}}
										onClick={() => {
											setTab("admin")
											setEmail("alphaxardgacuuru47@gmail.com")
											setPassword("alphaxardgacuuru47@gmail.com")
										}}>
										Admin
									</button>
									<button
										type="reset"
										className="btn text-white rounded-0 mx-1 w-100"
										style={{
											backgroundColor: tab == "instructor" ? "#d82a4e" : "#000",
										}}
										onClick={() => {
											setTab("instructor")
											setEmail("gacuuruwakarenge@gmail.com")
											setPassword("gacuuruwakarenge@gmail.com")
										}}>
										Instructor
									</button>
									<button
										type="reset"
										className="btn text-white rounded-0 w-100"
										style={{
											backgroundColor: tab == "student" ? "#d82a4e" : "#000",
										}}
										onClick={() => {
											setTab("student")
											setEmail("cikumuhandi@gmail.com")
											setPassword("cikumuhandi@gmail.com")
										}}>
										Student
									</button>
								</div>
								{/* Tabs End */}

								<input
									type="text"
									placeholder="Your Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoComplete="email"
								/>
								<input
									type="password"
									placeholder="Your Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>

								<h6 className="invisible">Some text</h6>

								<div className="d-flex justify-content-between">
									<Link
										to="/student/login"
										className="site-btn btn-dark">
										Back
									</Link>
									<button
										type="submit"
										className="site-btn">
										Login
										{loading && (
											<div className="spinner-border spinner-border-sm border-2 light my-auto mx-2"></div>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default login
