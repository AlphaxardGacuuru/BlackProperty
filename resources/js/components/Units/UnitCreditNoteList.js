import CreditNoteList from "@/components/CreditNotes/CreditNoteList"
import React, { useEffect, useState } from "react"

const UnitCreditNoteList = (props) => {
	const [creditNotes, setCreditNotes] = useState([])

	const [tenant, setTenant] = useState("")
	const [unit, setUnit] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Credit Notes", path: ["credit-notes"] })
	}, [])

	useEffect(() => {
		// Fetch Credit Note
		props.getPaginated(
			`credit-notes?propertyId=${props.selectedPropertyId}&
			tenant=${tenant}&
			unitId=${props.unitId}&
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
		startMonth,
		endMonth,
		startYear,
		endYear,
	])

	/*
	 * Delete CreditNote
	 */
	const onDeleteCreditNote = (creditNoteId) => {
		setLoading(true)
		var creditNoteIds = Array.isArray(creditNoteId)
			? creditNoteId.join(",")
			: creditNoteId

		Axios.delete(`/api/credit-notes/${creditNoteIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				setCreditNotes({
					sum: creditNotes.sum,
					meta: creditNotes.meta,
					links: creditNotes.links,
					data: creditNotes.data.filter((creditNote) => {
						if (Array.isArray(creditNoteId)) {
							return !creditNoteIds.includes(creditNote.id)
						} else {
							return creditNote.id != creditNoteId
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
				{/* Credit Notes Tab */}
				<CreditNoteList
					{...props}
					creditNotes={creditNotes}
					setCreditNotes={setCreditNotes}
					onDeleteCreditNote={onDeleteCreditNote}
					setUnit={setUnit}
					setTenant={setTenant}
					setStartMonth={setStartMonth}
					setEndMonth={setEndMonth}
					setStartYear={setStartYear}
					setEndYear={setEndYear}
					loading={loading}
				/>
				{/* Credit Notes Tab End */}
			</div>
		</div>
	)
}

export default UnitCreditNoteList
