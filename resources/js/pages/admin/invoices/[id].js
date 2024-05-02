import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import RentList from "@/components/RentStatement/RentStatementList"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import PlusSVG from "@/svgs/PlusSVG"

const show = (props) => {
	var { id } = useParams()

	const [invoice, setInvoice] = useState({})
	const [tenants, setTenants] = useState([])
	const [rentStatements, setRentStatements] = useState([])
	const [tab, setTab] = useState("rent")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Invoice", path: ["properties", "view"] })
		Axios.get(`api/invoices/${id}`).then((res) => {
			setInvoice(res.data.data)
			props.setPage({
				name: "View Invoice",
				path: [
					"properties",
					`properties/${res.data.data.propertyId}/show`,
					"view",
				],
			})
		})
		props.getPaginated(`tenants/by-invoice-id/${id}`, setTenants)
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
				{/* Invoice Info */}
				<div className="card mb-2 p-4 text-center shadow-sm">
					<h4>{invoice.name}</h4>
					<h6>
						Rent:
						<span className="mx-1 text-success">
							<small>KES</small> {invoice.rent}
						</span>
					</h6>
					<h6>
						Deposit:
						<span className="mx-1 text-success">
							<small>KES</small> {invoice.deposit}
						</span>
					</h6>
					<hr />
					<div className="d-flex justify-content-end">
						<MyLink
							linkTo={`/tenants/${id}/create`}
							icon={<PlusSVG />}
							text="add tenant"
						/>
					</div>
				</div>
				{/* Invoice Info End */}

				{/* Tenant Info */}
				{invoice.tenantName ? (
					<div className="card shadow-sm mb-2 p-4 text-center">
						<h4>Current Tenant</h4>
						<div className="m-3">
							<Img
								src={invoice.tenantAvatar ?? "/storage/avatars/male-avatar.png"}
								className="rounded-circle"
								width="100px"
								height="100px"
								alt="Avatar"
							/>
						</div>
						<h4>{invoice.tenantName}</h4>
						<h6>{invoice.tenantEmail}</h6>
						<h6>{invoice.tenantPhone}</h6>
					</div>
				) : (
					<div className="card shadow-sm mb-2 p-4 text-center">
						<h4 className="text-muted">Currently Vacant</h4>
					</div>
				)}
				{/* Tenant Info End */}
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"rent"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("rent")}>
						Rent Statements
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"water"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("water")}>
						Water Statements
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"service"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("service")}>
						Service Charge Statements
					</div>
				</div>
				{/* Tabs End */}

				{/* Rents Tab */}
				<RentList
					{...props}
					rentStatements={rentStatements}
					activeTab={activeTab("rent")}
					setInvoice={setInvoice}
					invoiceId={id}
				/>
				{/* Rents Tab End */}
			</div>
		</div>
	)
}

export default show
