import React, { useState, useRef, useEffect } from "react"
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
import MoneySVG from "@/svgs/MoneySVG"
import CoinSVG from "@/svgs/CoinSVG"

const InvoiceList = (props) => {
	const location = useLocation()

	const [deleteIds, setDeleteIds] = useState([])
	const [loading, setLoading] = useState()
	const [loadingSMS, setLoadingSMS] = useState()
	const [loadingEmail, setLoadingEmail] = useState()

	// Timer states
	const [emailCountdown, setEmailCountdown] = useState(0)
	const [smsCountdown, setSmsCountdown] = useState(0)
	const [canSendEmail, setCanSendEmail] = useState(true)
	const [canSendSms, setCanSendSms] = useState(true)

	const invoiceModalBtnClose = useRef()

	// Timer effects
	useEffect(() => {
		let timer
		if (emailCountdown > 0) {
			timer = setTimeout(() => {
				setEmailCountdown(emailCountdown - 1)
			}, 1000)
		} else if (emailCountdown === 0 && !canSendEmail) {
			setCanSendEmail(true)
		}
		return () => clearTimeout(timer)
	}, [emailCountdown, canSendEmail])

	useEffect(() => {
		let timer
		if (smsCountdown > 0) {
			timer = setTimeout(() => {
				setSmsCountdown(smsCountdown - 1)
			}, 1000)
		} else if (smsCountdown === 0 && !canSendSms) {
			setCanSendSms(true)
		}
		return () => clearTimeout(timer)
	}, [smsCountdown, canSendSms])

	const [invoiceToSend, setInvoiceToSend] = useState({})

	/*
	 * Send Email
	 */
	const onSendEmail = (invoiceId) => {
		if (!canSendEmail || loadingEmail) return

		setLoadingEmail(true)
		setCanSendEmail(false)
		setEmailCountdown(60) // 60 second cooldown

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
				// Reset timer on error
				setCanSendEmail(true)
				setEmailCountdown(0)
			})
	}

	/*
	 * Send SMS
	 */
	const onSendSMS = (invoiceId) => {
		if (!canSendSms || loadingSMS) return

		setLoadingSMS(true)
		setCanSendSms(false)
		setSmsCountdown(60) // 60 second cooldown

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
				// Reset timer on error
				setCanSendSms(true)
				setSmsCountdown(0)
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
									text={
										smsCountdown > 0
											? `send sms in ${smsCountdown}s`
											: `send sms ${
													invoiceToSend.smsesSent
														? `${invoiceToSend.smsesSent}`
														: ""
											  }`
									}
									className={`me-1 d-none ${
										invoiceToSend.smsesSent ? `btn-green` : `btn-2`
									} ${!canSendSms ? "disabled" : ""}`}
									onClick={() => onSendSMS(invoiceToSend.id)}
									loading={loadingSMS}
									disabled={!canSendSms || loadingSMS}
								/>

								<Btn
									icon={<SendEmailSVG />}
									text={
										emailCountdown > 0
											? `send email in ${emailCountdown}s`
											: `send email ${
													invoiceToSend.emailsSent
														? `(${invoiceToSend.emailsSent})`
														: ""
											  }`
									}
									className={`me-1 ${
										invoiceToSend.emailsSent ? `btn-green` : `btn-2`
									} ${!canSendEmail ? "disabled" : ""}`}
									onClick={() => onSendEmail(invoiceToSend.id)}
									loading={loadingEmail}
									disabled={!canSendEmail || loadingEmail}
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
				<div className="row">
					{/* Total */}
					<div className="col-sm-4">
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
								<MoneySVG />
							</HeroIcon>
						</div>
					</div>
					{/* Total End */}
					{/* Balance */}
					<div className="col-sm-4">
						<div className="d-flex justify-content-between flex-grow-1 mx-2">
							<HeroHeading
								heading="Balance"
								data={
									<span>
										<small>KES</small> {props.invoices.balance}
									</span>
								}
							/>
							<HeroIcon>
								<BalanceSVG />
							</HeroIcon>
						</div>
					</div>
					{/* Balance End */}
					{/* Paid */}
					<div className="col-sm-4">
						<div className="d-flex justify-content-between flex-grow-1 mx-2">
							<HeroHeading
								heading="Paid"
								data={
									<span>
										<small>KES</small> {props.invoices.paid}
									</span>
								}
							/>
							<HeroIcon>
								<CoinSVG />
							</HeroIcon>
						</div>
					</div>
					{/* Paid End */}
				</div>
				{/* Total End */}
			</div>
			{/* Data End */}

			<br />

			{/* Filters */}
			<div className="card shadow-sm px-4 pt-4 pb-3 mb-2">
				<div className="d-flex flex-wrap">
					{/* Code */}
					<div className="flex-grow-1 me-2 mb-2">
						<label htmlFor="name">Code</label>
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
						<label htmlFor="name">Tenant</label>
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
						<label htmlFor="name">Unit</label>
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
						<label htmlFor="name">Type</label>
						<select
							type="text"
							name="type"
							className="form-control text-capitalize"
							onChange={(e) => props.setType(e.target.value)}
							required={true}>
							{[
								{ id: "", name: "All" },
								{ id: "rent", name: "Rent" },
								{ id: "water", name: "Water" },
								{ id: "service_charge", name: "Service Charge" },
							].map((type, key) => (
								<option
									key={key}
									value={type.id}>
									{type.name}
								</option>
							))}
						</select>
					</div>
					{/* Type End */}
					{/* Status */}
					<div className="flex-grow-1 me-2 mb-2">
						<label htmlFor="name">Status</label>
						<select
							type="text"
							name="status"
							className="form-control text-capitalize"
							onChange={(e) => props.setStatus(e.target.value)}
							required={true}>
							{[
								{ id: "", name: "All" },
								{ id: "not_paid", name: "Not Paid" },
								{ id: "partially_paid", name: "Partially Paid" },
								{ id: "paid", name: "Paid" },
								{ id: "overpaid", name: "Overpaid" },
							].map((status, key) => (
								<option
									key={key}
									value={status.id}>
									{status.name}
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
							<th colSpan="8"></th>
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
							<th>INV</th>
							<th>Tenant</th>
							<th>Unit</th>
							<th>Type</th>
							<th>Month</th>
							<th>Year</th>
							<th>Amount</th>
							{/* <th>Paid</th> */}
							{/* <th>Balance</th> */}
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
									<td className="text-nowrap">{invoice.number}</td>
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
									<td className="text-success text-nowrap">
										<small>KES</small> {invoice.amount}
									</td>
									{/* <td className="text-success">
										<small>KES</small> {invoice.paid}
									</td> */}
									{/* <td className="text-success">
										<small>KES</small> {invoice.balance}
									</td> */}
									<td className="text-capitalize text-nowrap">
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
											{location.pathname.match("/super/") ||
											location.pathname.match("/admin/") ? (
												<React.Fragment>
													{parseFloat(invoice.balance?.replace(/,/g, "")) >
														0 && (
														<Btn
															icon={<ChatSendSVG />}
															text={`send invoice ${
																invoice.smsesSent || invoice.emailsSent
																	? `(${
																			invoice.smsesSent + invoice.emailsSent
																	  })`
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
												</React.Fragment>
											) : null}
											{/* Button trigger modal End */}

											<MyLink
												linkTo={`/invoices/${invoice.id}/show`}
												icon={<ViewSVG />}
												className="mx-1"
											/>

											{location.pathname.match("/super/") ||
											location.pathname.match("/admin/") ? (
												<div className="mx-1">
													<DeleteModal
														index={`invoice${key}`}
														model={invoice}
														modelName="Invoice"
														onDelete={onDeleteInvoice}
													/>
												</div>
											) : null}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td
									colSpan="10"
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
