import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import TenantList from "@/components/Tenants/TenantList"

const index = (props) => {
	const location = useLocation()

	let superPropertyId = location.pathname.match("/super/") ? "All" : null

	// Get Tenants
	const [tenants, setTenants] = useState([])

	const [nameQuery, setNameQuery] = useState("")
	const [phoneQuery, setPhoneQuery] = useState("")

	const dataToFetch = () => {
		props.getPaginated(
			`tenants?propertyId=${props.selectedPropertyId},${superPropertyId}&
			occupied=true&
			name=${nameQuery}&
			phone=${phoneQuery}`,
			setTenants
		)
	}

	useEffect(() => {
		// Set page
		props.setPage({ name: "Tenants", path: ["tenants"] })
		dataToFetch()
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
					stateToUpdate={dataToFetch}
				/>
				{/* Tenants Tab End */}
			</div>
		</div>
	)
}

export default index
