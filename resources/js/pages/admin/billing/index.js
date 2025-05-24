import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"

import TenantList from "@/components/Tenants/TenantList"
import UnitList from "@/components/Units/UnitList"
import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import PropertySVG from "@/svgs/PropertySVG"
import PlusSVG from "@/svgs/PlusSVG"

const billing = (props) => {
	var { id } = useParams()

	const [billing, setBilling] = useState({})
	const [units, setUnits] = useState([])
	const [tenants, setTenants] = useState([])
	const [staff, setStaff] = useState([])

	const [unitNameQuery, setUnitNameQuery] = useState("")
	const [unitTypeQuery, setUnitTypeQuery] = useState("")
	const [unitStatusQuery, setUnitStatusQuery] = useState("")

	const [tenantNameQuery, setTenantNameQuery] = useState("")
	const [tenantPhoneQuery, setTenantPhoneQuery] = useState("")

	const [staffNameQuery, setStaffNameQuery] = useState("")

	const [tab, setTab] = useState("units")

	useEffect(() => {
		// Clear State on page change
		setUnits([])
		setTenants([])
		setStaff([])
		// Set page
		props.setPage({ name: "View Billing", path: ["billings", "view"] })
		props.get(`billings/${id}`, setBilling)
		props.getPaginated(`units?billingId=${id}`, setUnits)
		props.getPaginated(`tenants?billingId=${id}&occupied=true`, setTenants)
	}, [id])

	useEffect(() => {
		props.getPaginated(
			`units?billingId=${id}&
			name=${unitNameQuery}&
			type=${unitTypeQuery}&
			status=${unitStatusQuery}`,
			setUnits
		)
	}, [unitNameQuery, unitTypeQuery, unitStatusQuery])

	useEffect(() => {
		props.getPaginated(
			`tenants?billingId=${id}&
			occupied=true&
			name=${tenantNameQuery}&
			phone=${tenantPhoneQuery}`,
			setTenants
		)
	}, [tenantNameQuery, tenantPhoneQuery])

	useEffect(() => {
		props.getPaginated(
			`staff?billingId=${id}&name=${staffNameQuery}`,
			setStaff
		)
	}, [staffNameQuery])

	const active = (activeTab) => {
		return activeTab == tab
			? "bg-secondary text-white shadow-sm"
			: "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card shadow-sm p-2 mb-2">
					<div className="d-flex justify-content-between w-100 align-items-center">
						<HeroHeading
							heading="Total Billings"
							data={props.properties.length}
						/>
						<HeroIcon>
							<PropertySVG />
						</HeroIcon>
					</div>
					<hr />
					<div className="d-flex justify-content-end">
						<div className="d-flex">
							<MyLink
								linkTo="/billings/create"
								icon={<PlusSVG />}
								text="add billing"
							/>
						</div>
					</div>
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
						History
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"tenants"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("tenants")}>
						Settings
					</div>
				</div>
				{/* Tabs End */}

				{/* Units Tab */}
				<UnitList
					{...props}
					activeTab={activeTab("units")}
					units={units}
					setUnits={setUnits}
					totalUnits={billing.unitCount}
					billingId={id}
					setBilling={setBilling}
					setNameQuery={setUnitNameQuery}
					setTypeQuery={setUnitTypeQuery}
					setStatusQuery={setUnitStatusQuery}
				/>
				{/* Units Tab End */}

				{/* Tenants Tab */}
				<TenantList
					{...props}
					activeTab={activeTab("tenants")}
					tenants={tenants}
					setTenants={setTenants}
					setNameQuery={setTenantNameQuery}
					setPhoneQuery={setTenantPhoneQuery}
				/>
				{/* Tenants Tab End */}
			</div>
		</div>
	)
}

export default billing