import React, { useEffect, useState } from "react"

import DeductionList from "@/components/Deductions/DeductionList"

const UnitDeductionList = (props) => {
	const [deductions, setDeductions] = useState([])

	const [tenant, setTenant] = useState("")
	const [unit, setUnit] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Deductions", path: ["deductions"] })
	}, [])

	useEffect(() => {
		// Fetch Deduction
		props.getPaginated(
			`deductions?propertyId=${props.selectedPropertyId}&
			tenant=${tenant}&
			unitId=${props.unitId}&
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setDeductions
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
	 * Delete Deduction
	 */
	const onDeleteDeduction = (deductionId) => {
		setLoading(true)
		var deductionIds = Array.isArray(deductionId)
			? deductionId.join(",")
			: deductionId

		Axios.delete(`/api/deductions/${deductionIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				setDeductions({
					sum: deductions.sum,
					meta: deductions.meta,
					links: deductions.links,
					data: deductions.data.filter((deduction) => {
						if (Array.isArray(deductionId)) {
							return !deductionIds.includes(deduction.id)
						} else {
							return deduction.id != deductionId
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
				{/* Deductions Tab */}
				<DeductionList
					{...props}
					deductions={deductions}
					setDeductions={setDeductions}
					onDeleteDeduction={onDeleteDeduction}
					setUnit={setUnit}
					setTenant={setTenant}
					setStartMonth={setStartMonth}
					setEndMonth={setEndMonth}
					setStartYear={setStartYear}
					setEndYear={setEndYear}
					loading={loading}
				/>
				{/* Deductions Tab End */}
			</div>
		</div>
	)
}

export default UnitDeductionList