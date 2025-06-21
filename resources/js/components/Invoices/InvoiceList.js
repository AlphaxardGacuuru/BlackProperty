import React, { useState, useRef } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"
import NoData from "@/components/Core/NoData"

import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"
import InvoiceSVG from "@/svgs/InvoiceSVG"
import PaymentSVG from "@/svgs/PaymentSVG"
import BalanceSVG from "@/svgs/BalanceSVG"
import EmailSentSVG from "@/svgs/EmailSentSVG"
import SendEmailSVG from "@/svgs/SendEmailSVG"
import SMSSVG from "@/svgs/SMSSVG"
import ChatSVG from "@/svgs/ChatSVG"
import ChatSendSVG from "@/svgs/ChatSendSVG"
import CloseSVG from "@/svgs/CloseSVG"

const InvoiceList = (props) => {
	const location = useLocation()

	const [deleteIds, setDeleteIds] = useState([])
	const [loading, setLoading] = useState()
	const [loadingSMS, setLoadingSMS] = useState()
	const [loadingEmail, setLoadingEmail] = useState()

	const invoiceModalBtnClose = useRef()

	const statuses = ["not_paid", "partially_paid", "paid", "overpaid"]
	const types = ["rent", "water", "service_charge"]

	const [invoiceToSend, setInvoiceToSend] = useState({})

	/*
	 * Send Email
	 */
	const onSendEmail = (invoiceId) => {
		setLoadingEmail(true)

		Axios.post(`api/invoices/send-email/${invoiceId}`)
			.then((res) => {
				setLoadingEmail(false)
				props.setMessages([res.data.message])
				// Clode Modal
				invoiceModalBtnClose.current.click()
			})
			.catch((err) => {
				setLoadingEmail(false)
				props.getErrors(err)
			})
	}

	/*
	 * Send SMS
	 */
	const onSendSMS = (invoiceId) => {
		setLoadingSMS(true)

		Axios.post(`api/invoices/send-sms/${invoiceId}`)
			.then((res) => {
				setLoadingSMS(false)
				props.setMessages([res.data.message])
				// Clode Modal
				invoiceModalBtnClose.current.click()
			})
			.catch((err) => {
				setLoadingSMS(false)
				props.getErrors(err)
			})
	}

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
				props.setInvoices({
					sum: props.invoices.sum,
					paid: props.invoices.paid,
					balance: props.invoices.balance,
					meta: props.invoices.meta,
					links: props.invoices.links,
					data: props.invoices.data.filter((invoice) => {
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
			{/* Confirm Invoice Modal End */}
			<div
				className="modal fade"
				id={`invoiceModal`}
				tabIndex="-1"
				aria-labelledby="invoiceModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content bg-primary rounded-0">
						<div className="modal-header border-0">
							<h1
								id="invoiceModalLabel"
								className="modal-title text-white fs-5">
								Send Invoice {invoiceToSend.number}
							</h1>

							{/* Close Start */}
							<span
								type="button"
								className="text-white"
								data-bs-dismiss="modal">
								<CloseSVG />
							</span>
							{/* Close End */}
						</div>
						<div className="modal-body text-start text-wrap text-white border-0">
							Are you sure you want to send an Invoice to{" "}
							{invoiceToSend.tenantName}.
						</div>
						<div className="modal-footer justify-content-between border-0">
							<button
								ref={invoiceModalBtnClose}
								type="button"
								className="mysonar-btn btn-2"
								data-bs-dismiss="modal">
								Close
							</button>

							<div>
								<Btn
									icon={<SMSSVG />}
									text={`send sms ${
										invoiceToSend.smsesSent ? `${invoiceToSend.smsesSent}` : ""
									}`}
									className={`me-1 ${
										invoiceToSend.smsesSent ? `btn-green` : `btn-2`
									}`}
									onClick={() => onSendSMS(invoiceToSend.id)}
									loading={loadingSMS}
								/>

								<Btn
									icon={<SendEmailSVG />}
									text={`send email ${
										invoiceToSend.emailsSent
											? `(${invoiceToSend.emailsSent})`
											: ""
									}`}
									className={`me-1 ${
										invoiceToSend.emailsSent ? `btn-green` : `btn-2`
									}`}
									onClick={() => onSendEmail(invoiceToSend.id)}
									loading={loadingEmail}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Confirm Invoice Modal End */}

			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				{/* Total */}
				<div className="d-flex justify-content-between flex-wrap w-100 align-items-center mx-2">
					{/* Total */}
					<div className="d-flex justify-content-between flex-grow-1 mx-2">
						<HeroHeading
							heading="Total"
							data={
								<span>
									<small>KES</small> {props.invoices.sum}
								</span>
							}
						/>
						<HeroIcon>
							<InvoiceSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Total End */}
			{/* Data End */}

			<br />

			{/* Filters */}
			<div className="card shadow-sm px-4 pt-4 pb-3 mb-2">
				<div className="d-flex flex-wrap">
					{/* Code */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="text"
							placeholder="Search by Code"
							className="form-control"
							onChange={(e) => props.setNumber(e.target.value)}
						/>
					</div>
					{/* Code End */}
					{/* Tenant */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="text"
							placeholder="Search by Tenant"
							className="form-control"
							onChange={(e) => props.setTenant(e.target.value)}
						/>
					</div>
					{/* Tenant End */}
					{/* Unit */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="text"
							placeholder="Search by Unit"
							className="form-control"
							onChange={(e) => props.setUnit(e.target.value)}
						/>
					</div>
					{/* Unit End */}
					{/* Type */}
					<div className="flex-grow-1 me-2 mb-2">
						<select
							type="text"
							name="type"
							className="form-control text-capitalize"
							onChange={(e) => props.setType(e.target.value)}
							required={true}>
							<option value="">Filter by Type</option>
							{types.map((type, key) => (
								<option
									key={key}
									value={type}>
									{type
										.split("_")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</option>
							))}
						</select>
					</div>
					{/* Type End */}
					{/* Status */}
					<div className="flex-grow-1 me-2 mb-2">
						<select
							type="text"
							name="status"
							className="form-control text-capitalize"
							onChange={(e) => props.setStatus(e.target.value)}
							required={true}>
							<option value="">Filter by Status</option>
							{statuses.map((status, key) => (
								<option
									key={key}
									value={status}>
									{status
										.split("_")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</option>
							))}
						</select>
					</div>
					{/* Status End */}
				</div>
			</div>

			<div className="card shadow-sm py-2 px-4">
				<div className="d-flex justify-content-end flex-wrap">
					<div className="d-flex flex-grow-1">
						{/* Start Date */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Start At</label>
							{/* Start Month */}
							<select
								className="form-control"
								onChange={(e) => props.setStartMonth(e.target.value)}>
								{props.months.map((month, key) => (
									<option
										key={key}
										value={key}>
										{month}
									</option>
								))}
							</select>
						</div>
						{/* Start Month End */}
						{/* Start Year */}
						<div className="flex-grow-1 me-2 mb-2">
							<label
								htmlFor=""
								className="invisible">
								Start At
							</label>
							<select
								className="form-control"
								onChange={(e) => props.setStartYear(e.target.value)}>
								<option value="">Select Year</option>
								{props.years.map((year, key) => (
									<option
										key={key}
										value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
						{/* Start Year End */}
					</div>
					{/* Start Date End */}
					{/* End Date */}
					<div className="d-flex flex-grow-1">
						{/* End Month */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">End At</label>
							<select
								className="form-control"
								onChange={(e) => props.setEndMonth(e.target.value)}>
								{props.months.map((month, key) => (
									<option
										key={key}
										value={key}>
										{month}
									</option>
								))}
							</select>
						</div>
						{/* End Month End */}
						{/* End Year */}
						<div className="flex-grow-1 me-2 mb-2">
							<label
								htmlFor=""
								className="invisible">
								End At
							</label>
							<select
								className="form-control"
								onChange={(e) => props.setStartYear(e.target.value)}>
								<option value="">Select Year</option>
								{props.years.map((year, key) => (
									<option
										key={key}
										value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
						{/* End Year End */}
					</div>
					{/* End Date End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="10"></th>
							<th
								colSpan="2"
								className="text-end">
								<div className="d-flex justify-content-end">
									{deleteIds.length > 0 && (
										<Btn
											text={`delete ${deleteIds.length}`}
											className="me-2"
											onClick={() => onDeleteInvoice(deleteIds)}
											loading={loading}
										/>
									)}

									{location.pathname.match("/admin/invoices") && (
										<MyLink
											linkTo={`/invoices/create`}
											icon={<PlusSVG />}
											text="create invoice"
										/>
									)}

									{location.pathname.match("/admin/units/") && (
										<MyLink
											linkTo={`/units/${props.unit?.id}/invoices/create`}
											icon={<PlusSVG />}
											text="create invoice"
										/>
									)}
								</div>
							</th>
						</tr>
						<tr>
							<th>
								<input
									type="checkbox"
									checked={
										deleteIds.length == props.invoices.data?.length &&
										deleteIds.length != 0
									}
									onClick={() =>
										setDeleteIds(
											deleteIds.length == props.invoices.data.length
												? []
												: props.invoices.data.map((invoice) => invoice.id)
										)
									}
								/>
							</th>
							<th>Number</th>
							<th>Tenant</th>
							<th>Unit</th>
							<th>Type</th>
							<th>Month</th>
							<th>Year</th>
							<th>Amount</th>
							<th>Paid</th>
							<th>Balance</th>
							<th>Status</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					{props.invoices.data?.length > 0 ? (
						<tbody>
							{props.invoices.data?.map((invoice, key) => (
								<tr key={key}>
									<td>
										<input
											type="checkbox"
											checked={deleteIds.includes(invoice.id)}
											onClick={() => handleSetDeleteIds(invoice.id)}
										/>
									</td>
									{/* <td>{props.iterator(key, invoices)}</td> */}
									<td>{invoice.number}</td>
									<td>{invoice.tenantName}</td>
									<td>{invoice.unitName}</td>
									<td className="text-capitalize">
										{invoice.type
											.split("_")
											.map(
												(word) => word.charAt(0).toUpperCase() + word.slice(1)
											)
											.join(" ")}
									</td>
									<td className="text-capitalize">
										{props.months[invoice.month]}
									</td>
									<td>{invoice.year}</td>
									<td className="text-success">
										<small>KES</small> {invoice.amount}
									</td>
									<td className="text-success">
										<small>KES</small> {invoice.paid}
									</td>
									<td className="text-success">
										<small>KES</small> {invoice.balance}
									</td>
									<td className="text-capitalize">
										<span
											className={`
										${
											invoice.status == "not_paid"
												? "bg-danger-subtle"
												: invoice.status == "partially_paid"
												? "bg-warning-subtle"
												: invoice.status == "paid"
												? "bg-success-subtle"
												: "bg-dark-subtle"
										}
									 py-1 px-3`}>
											{invoice.status
												.split("_")
												.map(
													(word) => word.charAt(0).toUpperCase() + word.slice(1)
												)
												.join(" ")}
										</span>
									</td>
									<td>
										<div className="d-flex justify-content-center">
											{/* Button trigger modal */}
											{parseFloat(invoice.balance?.replace(/,/g, "")) > 0 && (
												<Btn
													icon={<ChatSendSVG />}
													text={`send invoice ${
														invoice.smsesSent || invoice.emailsSent
															? `(${invoice.smsesSent + invoice.emailsSent})`
															: ""
													}`}
													className={`mx-1 ${
														invoice.smsesSent || invoice.emailsSent
															? "btn-green"
															: ""
													}`}
													dataBsToggle="modal"
													dataBsTarget={`#invoiceModal`}
													onClick={() => setInvoiceToSend(invoice)}
												/>
											)}
											{/* Button trigger modal End */}

											<MyLink
												linkTo={`/invoices/${invoice.id}/show`}
												icon={<ViewSVG />}
												className="mx-1"
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
						</tbody>
					) : (
						<tbody>
							<tr>
								<td
									colSpan="12"
									className="p-0">
									<NoData />
								</td>
							</tr>
						</tbody>
					)}
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.invoices}
					getPaginated={props.getPaginated}
					setState={props.setInvoices}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default InvoiceList
