import React, { useEffect, useState } from "react"

import StatementList from "@/components/Statements/StatementList"

const UnitStatementList = (props) => {
	const [statements, setStatements] = useState([])

	useEffect(() => {
		// Fetch Statements
		props.getPaginated(`statements?unitId=${props.unit.id}`, setStatements)
	}, [props.unit])

	return (
		<StatementList
			{...props}
			statements={statements}
			setStatements={setStatements}
		/>
	)
}

export default UnitStatementList
