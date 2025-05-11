import CreditNoteList from "@/components/CreditNotes/CreditNoteList"
import React, { useEffect, useState } from "react"

const index = (props) => {
	const [creditNotes, setCreditNotes] = useState([])

	const [tenant, setTenant] = useState("")
	const [unit, setUnit] = useState("")
	const [invoiceCode, setInvoiceCode] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Credit Notes", path: ["credit-notes"] })
	}, [])

	useEffect(() => {
		// Fetch Credit Note
		props.getPaginated(
			`credit-notes?propertyId=${props.selectedPropertyId}&
			tenant=${tenant}&
			unit=${unit}&
			invoiceCode=${invoiceCode}&
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setCreditNotes
		)
	}, [
		props.selectedPropertyId,
		tenant,
		unit,
		invoiceCode,
		startMonth,
		endMonth,
		startYear,
		endYear,
	])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Credit Notes Tab */}
				<CreditNoteList
					{...props}
					creditNotes={creditNotes}
					setCreditNotes={setCreditNotes}
					setUnit={setUnit}
					setInvoiceCode={setInvoiceCode}
					setTenant={setTenant}
					setStartMonth={setStartMonth}
					setEndMonth={setEndMonth}
					setStartYear={setStartYear}
					setEndYear={setEndYear}
				/>
				{/* Credit Notes Tab End */}
			</div>
		</div>
	)
}

export default index
