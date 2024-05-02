import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"
import InvoiceSVG from "@/svgs/InvoiceSVG"
import PaymentSVG from "@/svgs/PaymentSVG"
import BalanceSVG from "@/svgs/BalanceSVG"

const index = (props) => {
	const location = useLocation()

	const [invoices, setInvoices] = useState([])
	const [roles, setRoles] = useState([])

	const [nameQuery, setNameQuery] = useState("")
	const [roleQuery, setRoleQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Invoices", path: ["invoices"] })
	}, [])

	/*
	 * Delete Invoice
	 */
	const onDeleteInvoice = (invoiceId) => {
		Axios.delete(`/api/invoices/${invoiceId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setInvoices({
					meta: props.invoices.meta,
					links: props.invoices.links,
					data: props.invoices.data.filter(
						(invoice) => invoice.id != invoiceId
					),
				})
				// Update Property
				props.get(`properties/${props.propertyId}`, props.setProperty)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						{/* Due */}
						<HeroHeading
							heading="Due"
							data={props.rentStatement?.length}
						/>
						<HeroIcon>
							<InvoiceSVG />
						</HeroIcon>
						{/* Due End */}
						{/* Paid */}
						<HeroHeading
							heading="Paid"
							data={props.rentStatement?.length}
						/>
						<HeroIcon>
							<PaymentSVG />
						</HeroIcon>
						{/* Paid End */}
						{/* Balance */}
						<HeroHeading
							heading="Balance"
							data={props.rentStatement?.length}
						/>
						<HeroIcon>
							<BalanceSVG />
						</HeroIcon>
						{/* Balance End */}
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			<br />

			{/* Filters */}
			<div className="card shadow-sm p-4">
				<div className="d-flex flex-wrap">
					{/* Tenant */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							id=""
							type="text"
							name="name"
							placeholder="Search by Tenant"
							className="form-control"
							onChange={(e) => setNameQuery(e.target.value)}
						/>
					</div>
					{/* Tenant End */}
					{/* Role */}
					<div className="flex-grow-1 me-2 mb-2">
						<select
							id=""
							type="text"
							name="name"
							placeholder="Search by Role"
							className="form-control me-2"
							onChange={(e) => setRoleQuery(e.target.value)}>
							<option value="">All</option>
							{roles.map((role, key) => (
								<option
									key={key}
									value={role.name}>
									{role.name}
								</option>
							))}
						</select>
					</div>
					{/* Role End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="5"></th>
							<th className="text-end">
								<MyLink
									linkTo={`/invoices/create`}
									icon={<PlusSVG />}
									text="add invoice"
								/>
							</th>
						</tr>
						<tr>
							<th>#</th>
							<th>Tenant</th>
							<th>Type</th>
							<th>Amount</th>
							<th>Status</th>
							<th className="text-center">Action</th>
						</tr>
						{invoices.data
							?.filter((staff) => {
								var name = staff.name.toLowerCase()
								var query = nameQuery.toLowerCase()

								return name.match(query)
							})
							.filter((staff) => {
								if (roleQuery) {
									return staff.roleNames.includes(roleQuery)
								} else {
									return true
								}
							})
							.map((invoice, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{invoice.tenant}</td>
									<td>{invoice.type}</td>
									<td className="text-success">
										<small>KES</small> {invoice.amouht}
									</td>
									<td className="text-capitalize">{invoice.status}</td>
									<td>
										<div className="d-flex justify-content-end">
											<div className="d-flex justify-content-end">
												<MyLink
													linkTo={`/invoices/${invoice.id}/show`}
													icon={<ViewSVG />}
													// text="view"
													className="me-1"
												/>
											</div>

											<MyLink
												linkTo={`/invoices/${invoice.id}/edit`}
												icon={<EditSVG />}
												// text="edit"
											/>

											<div className="mx-1">
												<DeleteModal
													index={`invoice${key}`}
													model={invoice}
													modelName="Invoice"
													onDelete={onDeleteInvoice}
												/>
											</div>
										</div>
									</td>
								</tr>
							))}
					</thead>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={invoices}
					getPaginated={props.getPaginated}
					setState={props.setInvoices}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default index
