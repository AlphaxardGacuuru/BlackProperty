import React, { useEffect, useState } from "react"

import InvoiceList from "@/components/Invoices/InvoiceList"

const index = (props) => {
	const [invoices, setInvoices] = useState([])

	const [code, setCode] = useState("")
	const [invoice, setInvoice] = useState("")
	const [unit, setUnit] = useState("")
	const [tenant, setTenant] = useState("")
	const [type, setType] = useState("")
	const [status, setStatus] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")

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
			unit=${unit}&
			tenant=${tenant}&
			type=${type}&
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

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Invoices Tab */}
				<InvoiceList
					{...props}
					invoices={invoices}
					setInvoices={setInvoices}
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
				/>
				{/* Invoices Tab End */}
			</div>
		</div>
	)
}

export default index
