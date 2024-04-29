import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import TenantList from "@/components/Tenants/TenantList"

const show = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})
	const [tenants, setTenants] = useState([])
	const [tab, setTab] = useState("tenants")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Unit", path: ["units", "view"] })
		props.get(`units/${id}`, setUnit)
		props.getPaginated(`tenants/by-unit-id/${id}`, setTenants)
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
					<h4>{unit.name}</h4>
					<h6 className="text-success">
						Rent: <small>KES</small> {unit.rent}
					</h6>
					<h6 className="text-success">
						Deposit: <small>KES</small> {unit.deposit}
					</h6>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
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
							"students"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("students")}>
						Students
					</div>
				</div>
				{/* Tabs End */}

				{/* Tenants Tab */}
				<TenantList
					{...props}
					tenants={tenants}
					activeTab={activeTab("tenants")}
					setUnit={setUnit}
					unitId={id}
				/>
				{/* Tenants Tab End */}
			</div>
		</div>
	)
}

export default show
