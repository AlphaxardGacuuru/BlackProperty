import React, { useEffect, useState } from "react"

import StatementList from "@/components/Statements/StatementList"

const UnitStatementList = (props) => {
	const [statements, setStatements] = useState([])

	useEffect(() => {
		// Fetch Statements
		if (props.unit.id) {
			props.getPaginated(
				`statements?
				unitId=${props.unit.id}&
				userUnitId=${props.userUnitId}`,
				setStatements
			)
		}
	}, [props.unit])

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
