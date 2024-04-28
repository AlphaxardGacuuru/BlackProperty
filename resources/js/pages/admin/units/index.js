import React, { useEffect, useState } from "react"

import UnitList from "@/components/Units/UnitList"

const index = (props) => {
	// Get Units
	const [units, setUnits] = useState([])

	useEffect(() => {
		// Set page
		props.setPage({ name: "Units", path: ["units"] })
		props.getPaginated("units", setUnits)
	}, [])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Units Tab */}
				<UnitList
					{...props}
					units={units}
					setUnits={setUnits}
				/>
				{/* Units Tab End */}
			</div>
		</div>
	)
}

export default index
