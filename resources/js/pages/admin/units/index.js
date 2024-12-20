import React, { useEffect, useState } from "react"

import UnitList from "@/components/Units/UnitList"

const index = (props) => {
	// Get Units
	const [units, setUnits] = useState([])

	const [nameQuery, setNameQuery] = useState("")
	const [typeQuery, setTypeQuery] = useState("")
	const [statusQuery, setStatusQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Units", path: ["units"] })
		props.getPaginated(
			`units?
			propertyId=${props.selectedPropertyId}& 
			name=${nameQuery}&
			type=${typeQuery}& 
			status=${statusQuery}`,
			setUnits
		)
	}, [props.selectedPropertyId, nameQuery, typeQuery, statusQuery])

	/*
	 * Delete Unit
	 */
	const onDeleteUnit = (unitId) => {
		Axios.delete(`/api/units/${unitId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				setUnits({
					meta: units.meta,
					links: units.links,
					data: units.data.filter((unit) => unit.id != unitId),
				})
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Units Tab */}
				<UnitList
					{...props}
					units={units}
					setUnits={setUnits}
					setNameQuery={setNameQuery}
					setTypeQuery={setTypeQuery}
					setStatusQuery={setStatusQuery}
					onDeleteUnit={onDeleteUnit}
				/>
				{/* Units Tab End */}
			</div>
		</div>
	)
}

export default index
