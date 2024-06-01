import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import PropertyHeroArea from "@/components/Properties/PropertyHeroArea"

const index = (props) => {
	var { id } = useParams()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Properties", path: ["properties"] })
		props.get(
			`properties/by-user-id/${props.auth.id}`,
			props.setProperties,
			"properties"
		)
	}, [id])

	return (
		<div className="row">
			<div className="col-sm-4">
				<PropertyHeroArea
					{...props}
					id={id}
				/>
			</div>
		</div>
	)
}

export default index
