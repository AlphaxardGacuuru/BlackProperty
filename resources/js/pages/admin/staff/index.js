import React, { useEffect, useState } from "react"

import StaffList from "@/components/Staff/StaffList"

const index = (props) => {
	// Get Staff
	const [staff, setStaff] = useState([])
	const [roles, setRoles] = useState([])

	const [nameQuery, setNameQuery] = useState("")
	const [roleQuery, setRoleQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Staff", path: ["staff"] })
		props.get(
			`roles?propertyId=${props.selectedPropertyId}&idAndName=true`,
			setRoles
		)
	}, [])

	useEffect(() => {
		props.getPaginated(
			`staff?propertyId=${props.selectedPropertyId}&
			name=${nameQuery}&
			roleId=${roleQuery}`,
			setStaff
		)
	}, [props.selectedPropertyId, nameQuery, roleQuery])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Staff Tab */}
				<StaffList
					{...props}
					staff={staff}
					setStaff={setStaff}
					roles={roles}
					setNameQuery={setNameQuery}
					setRoleQuery={setRoleQuery}
				/>
				{/* Staff Tab End */}
			</div>
		</div>
	)
}

export default index
