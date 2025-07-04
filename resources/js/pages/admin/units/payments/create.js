import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"
import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	var { unitId } = useParams()
	var history = useHistory()

	const [unit, setUnit] = useState({})

	const [amount, setAmount] = useState()
	const [channel, setChannel] = useState()
	const [transactionReference, setTransactionReference] = useState()
	const [month, setMonth] = useState(props.currentMonth)
	const [year, setYear] = useState(props.currentYear)
	const [loading, setLoading] = useState()

	const channels = ["Bank", "Mpesa"]

	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Payment",
			path: ["units", `units/${unitId}/show`, "payments", "create"],
		})

		props.get(`units/${unitId}`, setUnit)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/payments", {
			userUnitIds: [unit.currentUserUnitId],
			channel: channel,
			transactionReference: transactionReference,
			amount: amount,
			month: month,
			year: year,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])

				// Redirect to Deductions
				setTimeout(() => history.push(`/admin/units/${unitId}/show`), 500)
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
					{/* Channel */}
					<select
						type="text"
						name="type"
						className="form-control text-capitalize mb-2 me-2"
						onChange={(e) => setChannel(e.target.value)}
						required={true}>
						<option value="">Select Payment Channel</option>
						{channels.map((channel, key) => (
							<option
								key={key}
								value={channel}>
								{channel}
							</option>
						))}
					</select>
					{/* Channel End */}

					{/* Amount */}
					<label htmlFor="">Amount</label>
					<input
						type="text"
						min="1"
						placeholder="20000"
						className="form-control mb-2"
						onChange={(e) => {
							let value = props.formatToCommas(e)

							setAmount(value)
						}}
					/>
					{/* Amount End */}

					{/* Transaction Reference */}
					<label htmlFor="">Transaction Reference</label>
					<input
						type="text"
						placeholder="ITHX23939950CV"
						className="form-control mb-2"
						onChange={(e) => setTransactionReference(e.target.value)}
					/>
					{/* Transaction Reference End */}

					<div className="d-flex justify-content-start mb-2">
						{/* Month */}
						<select
							className="form-control me-2"
							onChange={(e) => setMonth(e.target.value)}
							required={true}>
							{props.months.map((month, key) => (
								<option
									key={key}
									value={key}
									selected={key == props.currentMonth}>
									{month}
								</option>
							))}
						</select>
						{/* Month End */}

						{/* Year */}
						<select
							className="form-control"
							onChange={(e) => setYear(e.target.value)}>
							{props.years.map((year, key) => (
								<option
									key={key}
									value={year}
									selected={key == props.currentYear}>
									{year}
								</option>
							))}
						</select>
						{/* Year End */}
					</div>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="add payment"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-2">
						<MyLink
							linkTo={`/units/${unitId}/show`}
							icon={<BackSVG />}
							text="back to unit"
							className="mb-2"
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo={`/payments`}
							icon={<BackSVG />}
							text="go to payments"
						/>
					</div>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
