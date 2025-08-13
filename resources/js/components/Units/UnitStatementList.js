import React, { useEffect, useState } from "react"

import StatementList from "@/components/Statements/StatementList"

const UnitStatementList = (props) => {
	const [statements, setStatements] = useState([])

	useEffect(() => {
		// Fetch Statements
		if (props.unit?.id || props.tenant?.userUnitId) {
			props.getPaginated(
				`statements/unit?
				unitId=${props.unit?.id}&
				userUnitId=${props.tenant?.userUnitId}&`,
				setStatements
			)
		}
	}, [props.unit, props.tenant])

	return (
		<StatementList
			{...props}
			statements={statements}
			setStatements={setStatements}
		/>
	)
}

UnitStatementList.defaultProps = {
	unit: { id: "" },
	userUnitId: "",
}

export default UnitStatementList
