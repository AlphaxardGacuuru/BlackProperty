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
import Btn from "@/components/Core/Btn"

const index = (props) => {
	const location = useLocation()

	const [invoices, setInvoices] = useState([])

	const [nameQuery, setNameQuery] = useState("")
	const [deleteIds, setDeleteIds] = useState([])
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Invoices", path: ["invoices"] })
		// Fetch Invoices
		props.getPaginated(
			`invoices/by-property-id/${props.auth.propertyIds}`,
			setInvoices
		)
	}, [])

	useEffect(() => {
		// Fetch Invoices
		props.getPaginated(
			`invoices/by-property-id/${props.auth.propertyIds}?name=${nameQuery}`,
			setInvoices
		)
	}, [nameQuery])

	/*
	 * Handle DeleteId checkboxes
	 */
	const handleSetDeleteIds = (invoiceId) => {
		var exists = deleteIds.includes(invoiceId)

		var newDeleteIds = exists
			? deleteIds.filter((item) => item != invoiceId)
			: [...deleteIds, invoiceId]

		setDeleteIds(newDeleteIds)
	}

	/*
	 * Delete Invoice
	 */
	const onDeleteInvoice = (invoiceId) => {
		setLoading(true)
		var invoiceIds = Array.isArray(invoiceId) ? invoiceId.join(",") : invoiceId

		Axios.delete(`/api/invoices/${invoiceIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				setInvoices({
					meta: invoices.meta,
					links: invoices.links,
					data: invoices.data.filter((invoice) => {
						if (Array.isArray(invoiceId)) {
							return !invoiceIds.includes(invoice.id)
						} else {
							return invoice.id != invoiceId
						}
					}),
				})
				// Clear DeleteIds
				setDeleteIds([])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
				// Clear DeleteIds
				setDeleteIds([])
			})
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
				</div>
			</div>
			{/* Filters End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="7"></th>
							<th className="text-end">
								<div className="d-flex justify-content-end">
									{deleteIds.length > 0 && (
										<Btn
											text={`delete ${deleteIds.length}`}
											className="me-2"
											onClick={() => onDeleteInvoice(deleteIds)}
											loading={loading}
										/>
									)}

									<MyLink
										linkTo={`/invoices/create`}
										icon={<PlusSVG />}
										text="add invoice"
									/>
								</div>
							</th>
						</tr>
						<tr>
							<th>
								<input
									type="checkbox"
									checked={deleteIds.length == invoices.data?.length}
									onClick={() =>
										setDeleteIds(
											deleteIds.length == invoices.data.length
												? []
												: invoices.data.map((invoice) => invoice.id)
										)
									}
								/>
							</th>
							<th>#</th>
							<th>Tenant</th>
							<th>Type</th>
							<th>Month</th>
							<th>Amount</th>
							<th>Status</th>
							<th className="text-center">Action</th>
						</tr>
						{invoices.data?.map((invoice, key) => (
							<tr key={key}>
								<td>
									<input
										type="checkbox"
										checked={deleteIds.includes(invoice.id)}
										onClick={() => handleSetDeleteIds(invoice.id)}
									/>
								</td>
								<td>{props.iterator(key, invoices)}</td>
								<td>{invoice.tenantName}</td>
								<td className="text-capitalize">
									{invoice.type
										.split("_")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</td>
								<td className="text-capitalize">{invoice.month}</td>
								<td className="text-success">
									<small>KES</small> {invoice.amount}
								</td>
								<td className="text-capitalize">
									<span
										className={`
											${
												invoice.status == "pending"
													? "bg-danger-subtle"
													: invoice.status == "partial"
													? "bg-warning-subtle"
													: invoice.status == "paid"
													? "bg-success-subtle"
													: "bg-dark-subtle"
											}
										 py-1 px-3`}>
										{invoice.status}
									</span>
								</td>
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
					setState={setInvoices}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default index
