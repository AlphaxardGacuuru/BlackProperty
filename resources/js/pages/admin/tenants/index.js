import React, { useEffect, useState } from "react"

import TenantList from "@/components/Tenants/TenantList"

const index = (props) => {
	// Get Tenants
	const [tenants, setTenants] = useState([])

	const [nameQuery, setNameQuery] = useState("")
	const [phoneQuery, setPhoneQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Tenants", path: ["tenants"] })
		props.getPaginated(
			`tenants?propertyId=${props.selectedPropertyId}&
			name=${nameQuery}&
			phone=${phoneQuery}`,
			setTenants
		)
	}, [props.selectedPropertyId, nameQuery, phoneQuery])

	/*
	 * Delete Tenant
	 */
	const onDeleteTenant = (tenantId) => {
		Axios.delete(`/api/tenants/${tenantId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				setUnits({
					meta: tenants.meta,
					links: tenants.links,
					data: tenants.data.filter((tenant) => tenant.id != tenantId),
				})
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Tenants Tab */}
				<TenantList
					{...props}
					tenants={tenants}
					setTenants={setTenants}
					onDeleteTenant={onDeleteTenant}
					setNameQuery={setNameQuery}
					setPhoneQuery={setPhoneQuery}
				/>
				{/* Tenants Tab End */}
			</div>
		</div>
	)
}

export default index
