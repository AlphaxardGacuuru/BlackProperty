import React, { useEffect, useState } from "react"

import TenantList from "@/components/Tenants/TenantList"

const index = (props) => {
	// Get Tenants
	const [tenants, setTenants] = useState([])

	useEffect(() => {
		// Set page
		props.setPage({ name: "Tenants", path: ["tenants"] })
		props.getPaginated("tenants", setTenants)
	}, [])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Tenants Tab */}
				<TenantList
					{...props}
					tenants={tenants}
					setTenants={setTenants}
				/>
				{/* Tenants Tab End */}
			</div>
		</div>
	)
}

export default index
