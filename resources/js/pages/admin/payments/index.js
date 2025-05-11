import React, { useEffect, useState } from "react"

import PaymentList from "@/components/Payments/PaymentList"

const index = (props) => {
	const [payments, setPayments] = useState([])

	const [tenant, setTenant] = useState("")
	const [unit, setUnit] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")

	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Payments", path: ["payments"] })
	}, [])

	useEffect(() => {
		// Fetch Payments
		props.getPaginated(
			`payments?propertyId=${props.selectedPropertyId}&
			tenant=${tenant}&
			unit=${unit}&
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setPayments
		)
	}, [
		props.selectedPropertyId,
		tenant,
		unit,
		startMonth,
		endMonth,
		startYear,
		endYear,
	])

	/*
	 * Delete Payment
	 */
	const onDeletePayment = (paymentId) => {
		setLoading(true)
		var paymentIds = Array.isArray(paymentId) ? paymentId.join(",") : paymentId

		Axios.delete(`/api/payments/${paymentIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				setPayments({
					sum: payments.sum,
					meta: payments.meta,
					links: payments.links,
					data: payments.data.filter((payment) => {
						if (Array.isArray(paymentId)) {
							return !paymentIds.includes(payment.id)
						} else {
							return payment.id != paymentId
						}
					}),
				})
				// Clear DeleteIds
				setDeleteIds([])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
				// Clear DeleteIds
				setDeleteIds([])
			})
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Payments Tab */}
				<PaymentList
					{...props}
					payments={payments}
					setPayments={setPayments}
					onDeletePayment={onDeletePayment}
					setUnit={setUnit}
					setTenant={setTenant}
					setStartMonth={setStartMonth}
					setEndMonth={setEndMonth}
					setStartYear={setStartYear}
					setEndYear={setEndYear}
					loading={loading}
				/>
				{/* Payments Tab End */}
			</div>
		</div>
	)
}

export default index
