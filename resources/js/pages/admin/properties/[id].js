import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import TenantList from "@/components/Tenants/TenantList"
import StaffList from "@/components/Staff/StaffList"

import UnitList from "@/components/Units/UnitList"

const show = (props) => {
	var { id } = useParams()

	const [property, setProperty] = useState({})
	const [units, setUnits] = useState([])
	const [tenants, setTenants] = useState([])
	const [staff, setStaff] = useState([])
	const [tab, setTab] = useState("units")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Property", path: ["properties", "view"] })
		props.get(`properties/${id}`, setProperty)
		props.getPaginated(`units/by-property-id/${id}`, setUnits)
		props.getPaginated(`tenants/by-property-id/${id}`, setTenants)
		props.getPaginated(`staff/by-property-id/${id}`, setStaff)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card mb-2 p-4 text-center shadow">
					<h4>{property.name}</h4>
					<h6>{property.location}</h6>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"units"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("units")}>
						Units
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"tenants"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("tenants")}>
						Tenants
					</div>
					<div
						className={`card flex-grow-1 text-center mb-2 py-2 px-4 ${active(
							"staff"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("staff")}>
						Staff
					</div>
				</div>
				{/* Tabs End */}

				{/* Units Tab */}
				<UnitList
					{...props}
					units={units}
					activeTab={activeTab("units")}
					setProperty={setProperty}
					setUnits={setUnits}
					propertyId={id}
				/>
				{/* Units Tab End */}

				{/* Tenants Tab */}
				<TenantList
					{...props}
					tenants={tenants}
					activeTab={activeTab("tenants")}
					setProperty={setProperty}
					propertyId={id}
				/>
				{/* Tenants Tab End */}

				{/* Staff Tab */}
				<StaffList
					{...props}
					staff={staff}
					activeTab={activeTab("staff")}
					setProperty={setProperty}
					propertyId={id}
				/>
				{/* Staff Tab End */}
			</div>
		</div>
	)
}

export default show
