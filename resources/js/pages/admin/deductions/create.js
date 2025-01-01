import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"

const create = (props) => {
	var { id } = useParams()
	const history = useHistory()

	const [description, setDescription] = useState()
	const [amount, setAmount] = useState()
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({
			name: "Create Deduction",
			path: ["deductions", "create"],
		})
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/deductions", {
			invoiceId: id,
			description: description,
			amount: amount,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])

				// Redirect to Deductions
				setTimeout(() => history.push(`/admin/deductions`), 500)
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					{/* Amount */}
					<label htmlFor="">Amount</label>
					<input
						type="number"
						placeholder="20000"
						className="form-control mb-2"
						onChange={(e) => setAmount(e.target.value)}
						required={true}
					/>
					{/* Amount End */}

					{/* Description */}
					<label htmlFor="">Description</label>
					<textarea
						placeholder="For Damages"
						className="form-control mb-2"
						rows="5"
						onChange={(e) => setDescription(e.target.value)}
						required={true}></textarea>
					{/* Description End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="create deduction"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo={`/deductions`}
							icon={<BackSVG />}
							text="back to deductions"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
