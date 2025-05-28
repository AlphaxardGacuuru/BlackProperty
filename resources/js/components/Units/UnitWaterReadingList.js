import React, { useEffect, useState } from "react"

import WaterReadingList from "@/components/Water/WaterReadingList"

const UnitWaterReadingList = (props) => {
	const [waterReadings, setWaterReadings] = useState([])

	const [tenant, setTenant] = useState("")
	const [unit, setUnit] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")

	useEffect(() => {
		// Fetch Water Readings
		props.getPaginated(
			`water-readings?
			propertyId=${props.unit.propertyId}&
			unitId=${props.unit.id}&
			userUnitId=${props.userUnitId}&
			tenant=${tenant}&
			unit=${unit}&
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setWaterReadings
		)
	}, [props.selectedPropertyId, tenant, unit, startMonth, endMonth, startYear, endYear])

	return (
		<WaterReadingList
			{...props}
			waterReadings={waterReadings}
			setWaterReadings={setWaterReadings}
			setTenant={setTenant}
			setUnit={setUnit}
			setStartMonth={setStartMonth}
			setEndMonth={setEndMonth}
			setStartYear={setStartYear}
			setEndYear={setEndYear}
		/>
	)
}

UnitWaterReadingList.defaultProps = {
	userUnitId: "",
}

export default UnitWaterReadingList