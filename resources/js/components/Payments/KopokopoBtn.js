import React, { useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"

const KopokopoBtn = (props) => {
	const [loading, setLoading] = useState()

	/*
	 * Send STK Push
	 */
	const onSTKPush = () => {
		setLoading(true)

		Axios.post("/api/stk-push", { amount: props.paymentAmount })
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}
	return (
		<Btn
			icon={
				<div>
					<Img
						src="/storage/img/mpesa-logo.jpg"
						className="btn-secondary me-1"
						style={{ width: "44px", height: "auto" }}
					/>
				</div>
			}
			text="pay with mpesa"
			onClick={() => {
				props.setStkPushed("menu-open")
				onSTKPush()
			}}
			loading={loading}
		/>
	)
}

export default KopokopoBtn
