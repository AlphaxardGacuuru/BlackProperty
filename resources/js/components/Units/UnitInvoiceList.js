import React, { useEffect, useRef, useState } from "react"

import InvoiceList from "@/components/Invoices/InvoiceList"

const UnitInvoiceList = (props) => {
	const [invoices, setInvoices] = useState([])
	const [invoiceToSend, setInvoiceToSend] = useState({})

	const [code, setCode] = useState("")
	const [invoice, setInvoice] = useState("")
	const [unit, setUnit] = useState("")
	const [type, setType] = useState("")
	const [tenant, setTenant] = useState("")
	const [status, setStatus] = useState("")
	const [propertyId, setPropertyId] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")

	const [deleteIds, setDeleteIds] = useState([])
	const [loading, setLoading] = useState()
	const [loadingSMS, setLoadingSMS] = useState()
	const [loadingEmail, setLoadingEmail] = useState()

	const invoiceModalBtnClose = useRef()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Invoices", path: ["invoices"] })
	}, [])

	useEffect(() => {
		// Fetch Invoices
		props.getPaginated(
			`invoices?propertyId=${props.selectedPropertyId}&
			code=${code}&
			invoice=${invoice}&
			unit=${props.unitId}&
			type=${type}&
						tenant=${tenant}&
			status=${status}&
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setInvoices
		)
	}, [
		props.selectedPropertyId,
		code,
		invoice,
		unit,
		tenant,
		type,
		status,
		startMonth,
		endMonth,
		startYear,
		endYear,
	])

	/*
	 * Send Email
	 */
	const onSendEmail = (invoiceId) => {
		setLoadingEmail(true)

		Axios.post(`api/invoices/send-email/${invoiceId}`)
			.then((res) => {
				setLoadingEmail(false)
				props.setMessages([res.data.message])
				// Clode Modal
				invoiceModalBtnClose.current.click()
			})
			.catch((err) => {
				setLoadingEmail(false)
				props.getErrors(err)
			})
	}

	/*
	 * Send SMS
	 */
	const onSendSMS = (invoiceId) => {
		setLoadingSMS(true)

		Axios.post(`api/invoices/send-sms/${invoiceId}`)
			.then((res) => {
				setLoadingSMS(false)
				props.setMessages([res.data.message])
				// Clode Modal
				invoiceModalBtnClose.current.click()
			})
			.catch((err) => {
				setLoadingSMS(false)
				props.getErrors(err)
			})
	}

	/*
	 * Handle DeleteId checkboxes
	 */
	const handleSetDeleteIds = (invoiceId) => {
		var exists = deleteIds.includes(invoiceId)

		var newDeleteIds = exists
			? deleteIds.filter((item) => item != invoiceId)
			: [...deleteIds, invoiceId]

		setDeleteIds(newDeleteIds)
	}

	/*
	 * Delete Invoice
	 */
	const onDeleteInvoice = (invoiceId) => {
		setLoading(true)
		var invoiceIds = Array.isArray(invoiceId) ? invoiceId.join(",") : invoiceId

		Axios.delete(`/api/invoices/${invoiceIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				setInvoices({
					due: invoices.due,
					paid: invoices.paid,
					balance: invoices.balance,
					meta: invoices.meta,
					links: invoices.links,
					data: invoices.data.filter((invoice) => {
						if (Array.isArray(invoiceId)) {
							return !invoiceIds.includes(invoice.id)
						} else {
							return invoice.id != invoiceId
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
				{/* Invoices Tab */}
				<InvoiceList
					{...props}
					invoices={invoices}
					setInvoices={setInvoices}
					onDeleteInvoice={onDeleteInvoice}
					setCode={setCode}
					setInvoice={setCode}
					setUnit={setUnit}
					setTenant={setTenant}
					setType={setType}
					setStatus={setStatus}
					setStartMonth={setStartMonth}
					setEndMonth={setEndMonth}
					setStartYear={setStartYear}
					setEndYear={setEndYear}
					invoiceToSend={invoiceToSend}
					setInvoiceToSend={setInvoiceToSend}
					onSendEmail={onSendEmail}
					onSendSMS={onSendSMS}
					loading={loading}
					loadingSMS={loadingSMS}
					loadingEmail={loadingEmail}
					handleSetDeleteIds={handleSetDeleteIds}
					deleteIds={deleteIds}
					// Invoice Modal
					invoiceModalBtnClose={invoiceModalBtnClose}
				/>
				{/* Invoices Tab End */}
			</div>
		</div>
	)
}

export default UnitInvoiceList
