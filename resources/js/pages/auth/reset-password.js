import React, { useState, useEffect } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"

import Btn from "@/components/Core/Btn"

const ResetPassword = (props) => {
	const history = useHistory()
	const location = useLocation()
	const { token } = useParams()

	const queryParams = new URLSearchParams(location.search)
	const linkEmail = queryParams.get("email")

	const [email, setEmail] = useState(linkEmail)
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState()
	const [loading, setLoading] = useState(false)

	const onRegister = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post(`/reset-password`, {
				token: token,
				email: email,
				password: password,
				password_confirmation: passwordConfirmation,
			})
				.then((res) => {
					props.setMessages([res.data.message])

					// Redirect
					history.push("/admin/dashboard")
				})
				.catch((err) => {
					// Remove loader
					setLoading(false)
					props.getErrors(err)
				})
		})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="card shadow-sm my-5">
					<div className="card-header bg-secondary text-white">
						Reset Password?
					</div>
					<div className="card-body">
						<form onSubmit={onRegister}>
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

							<div className="d-flex justify-content-end mb-2">
								<Btn
									text="reset password"
									loading={loading}
								/>
							</div>

							<div className="col-sm-4"></div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResetPassword
