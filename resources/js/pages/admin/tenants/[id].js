import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min"

import UnitStatementList from "@/components/Units/UnitStatementList"
import UnitWaterReadingList from "@/components/Units/UnitWaterReadingList"
import UnitInvoiceList from "@/components/Units/UnitInvoiceList"
import UnitPaymentList from "@/components/Units/UnitPaymentList"
import UnitCreditNoteList from "@/components/Units/UnitCreditNoteList"
import UnitDeductionList from "@/components/Units/UnitDeductionList"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import PlusSVG from "@/svgs/PlusSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import DeleteSVG from "@/svgs/DeleteSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import PaginationLinks from "@/components/Core/PaginationLinks"
import DeleteModal from "@/components/Core/DeleteModal"
import CloseSVG from "@/svgs/CloseSVG"

const show = (props) => {
	var { id } = useParams()
	const location = useLocation()

	const isInTenant = location.pathname.match("/tenant/")

	const [tenant, setTenant] = useState({})
	const [unit, setUnit] = useState({})

	const [tab, setTab] = useState("statements")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Tenant", path: [isInTenant ? `tenants/${props.auth.id}/show` : "units", "view"] })

		// Fetch Tenant
		Axios.get(`api/tenants/${id}`)
			.then((res) => {
				setTenant(res.data.data)

				if (!isInTenant) {
					// Set page
					props.setPage({
						name: "View Tenant",
						path: ["units", `units/${res.data.data.unitId}/show`, "view"],
					})
				}

				// Fetch Unit
				props.get(`units/${res.data.data[0].unitId}`, setUnit)
			})
			.catch((err) => props.setErrors["Failed to fetch Tenant."])
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
				{/* Tenant Info */}
				<div className="card shadow-sm mb-2 p-2 text-center">
					<div className="m-3">
						<Img
							src={tenant.avatar ?? "/storage/avatars/male-avatar.png"}
							className="rounded-circle"
							width="100px"
							height="100px"
							alt="Avatar"
						/>
					</div>
					<h4>{tenant.name}</h4>
					<h6>{tenant.email}</h6>
					<h6>{tenant.phone}</h6>
					<h6>{tenant.occupiedAt}</h6>
					<hr />
					<div className="d-flex justify-content-end">
						<MyLink
							linkTo={`/tenants/${tenant.id}/edit`}
							icon={<EditSVG />}
							text="edit"
							className="btn-sm"
						/>
					</div>
				</div>
				{/* Tenant Info End */}
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"statements"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("statements")}>
						Statements
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"water_readings"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("water_readings")}>
						Water Readings
					</div>
				</div>
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"invoices"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("invoices")}>
						Invoices
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"payments"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("payments")}>
						Payments
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"credit_notes"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("credit_notes")}>
						Credit Notes
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"deductions"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("deductions")}>
						Deductions
					</div>
				</div>
				{/* Tabs End */}

				{/* Tab Content Start */}
				{tab == "statements" && (
					<UnitStatementList
						{...props}
						// unit={unit}
						tenant={tenant}
					/>
				)}

				{tab == "water_readings" && (
					<UnitWaterReadingList
						{...props}
						// unit={unit}
						tenant={tenant}
					/>
				)}

				{tab == "invoices" && (
					<UnitInvoiceList
						{...props}
						// unit={unit}
						tenant={tenant}
					/>
				)}

				{tab == "payments" && (
					<UnitPaymentList
						{...props}
						// unit={unit}
						tenant={tenant}
					/>
				)}

				{tab == "credit_notes" && (
					<UnitCreditNoteList
						{...props}
						// unit={unit}
						tenant={tenant}
					/>
				)}

				{tab == "deductions" && (
					<UnitDeductionList
						{...props}
						// unit={unit}
						tenant={tenant}
					/>
				)}
				{/* Tab Content End */}
			</div>
		</div>
	)
}

export default show
