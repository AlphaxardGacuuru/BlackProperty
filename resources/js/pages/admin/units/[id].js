import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import TenantList from "@/components/Tenants/TenantList"
import Img from "@/components/Core/Img"

const show = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})
	const [tenants, setTenants] = useState([])
	const [tab, setTab] = useState("tenants")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Unit", path: ["properties", "view"] })
		Axios.get(`api/units/${id}`).then((res) => {
			setUnit(res.data.data)
			props.setPage({
				name: "View Unit",
				path: [
					"properties",
					`properties/${res.data.data.propertyId}/show`,
					"view",
				],
			})
		})
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
				{/* Unit Info */}
				<div className="card mb-2 p-4 text-center shadow">
					<h4>{unit.name}</h4>
					<h6>
						Rent:
						<span className="mx-1 text-success">
							<small>KES</small> {unit.rent}
						</span>
					</h6>
					<h6>
						Deposit:
						<span className="mx-1 text-success">
							<small>KES</small> {unit.deposit}
						</span>
					</h6>
				</div>
				{/* Unit Info End */}

				{/* Tenant Info */}
				<div className="card shadow mb-2 p-4 text-center">
					<h4>Current Tenant</h4>
					<div className="m-3">
						<Img
							src={unit.tenantAvatar ?? "/storage/avatars/male-avatar.png"}
							className="rounded-circle"
							width="100px"
							height="100px"
							alt="Avatar"
						/>
					</div>
					<h4>{unit.tenantName}</h4>
					<h6>{unit.tenantEmail}</h6>
					<h6>{unit.tenantPhone}</h6>
					<h6 className="text-capitalize">{unit.tenantGender}</h6>
				</div>
				{/* Tenant Info End */}
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
