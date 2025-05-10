import React, { useState } from "react"
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
import EmailSentSVG from "@/svgs/EmailSentSVG"
import SendEmailSVG from "@/svgs/SendEmailSVG"
import SMSSVG from "@/svgs/SMSSVG"
import ChatSVG from "@/svgs/ChatSVG"
import ChatSendSVG from "@/svgs/ChatSendSVG"

const InvoiceList = (props) => {

	const statuses = ["not_paid", "partially_paid", "paid", "overpaid"]
	const types = ["rent", "water", "service_charge"]

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
					<div className="modal-content rounded-0">
						<div className="modal-header border-0">
							<h1
								id="invoiceModalLabel"
								className="modal-title fs-5">
								Send Invoice {props.invoiceToSend.code}
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body text-start text-wrap border-0">
							Are you sure you want to send an Invoice to{" "}
							{props.invoiceToSend.tenantName}.
						</div>
						<div className="modal-footer justify-content-between border-0">
							<button
								ref={props.invoiceModalBtnClose}
								type="button"
								className="mysonar-btn btn-2"
								data-bs-dismiss="modal">
								Close
							</button>

							<div>
								<Btn
									icon={<SMSSVG />}
									text="send sms"
									className={`me-1 ${
										props.invoiceToSend.emailsSent ? `btn-green` : `btn-2`
									}`}
									onClick={() => props.onSendSMS(props.invoiceToSend.id)}
									loading={props.loadingSMS}
								/>

								<Btn
									icon={<SendEmailSVG />}
									text="send email"
									className={`me-1 ${
										props.invoiceToSend.emailsSent ? `btn-green` : `btn-2`
									}`}
									onClick={() => props.onSendEmail(props.invoiceToSend.id)}
									loading={props.loadingEmail}
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
					{/* Due */}
					<div className="d-flex justify-content-between flex-grow-1 mx-2">
						<HeroHeading
							heading="Due"
							data={
								<span>
									<small>KES</small> {props.invoices.due}
								</span>
							}
						/>
						<HeroIcon>
							<InvoiceSVG />
						</HeroIcon>
					</div>
					{/* Due End */}
					{/* Paid */}
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
							<PaymentSVG />
						</HeroIcon>
					</div>
					{/* Paid End */}
					{/* Balance */}
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
					{/* Balance End */}
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
							onChange={(e) => props.setCode(e.target.value)}
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
							<th colSpan="9"></th>
							<th
								colSpan="2"
								className="text-end">
								<div className="d-flex justify-content-end">
									{props.deleteIds.length > 0 && (
										<Btn
											text={`delete ${props.deleteIds.length}`}
											className="me-2"
											onClick={() => props.onDeleteInvoice(props.deleteIds)}
											loading={props.loading}
										/>
									)}

									<MyLink
										linkTo={`/invoices/create`}
										icon={<PlusSVG />}
										text="create invoice"
									/>
								</div>
							</th>
						</tr>
						<tr>
							<th>
								<input
									type="checkbox"
									checked={
										props.deleteIds.length == props.invoices.data?.length &&
										props.deleteIds.length != 0
									}
									onClick={() =>
										setDeleteIds(
											props.deleteIds.length == props.invoices.data.length
												? []
												: props.invoices.data.map((invoice) => invoice.id)
										)
									}
								/>
							</th>
							<th>Invoice No</th>
							<th>Tenant</th>
							<th>Unit</th>
							<th>Type</th>
							<th>Month</th>
							<th>Year</th>
							<th>Amount</th>
							{/* <th>Paid</th> */}
							<th>Balance</th>
							<th>Status</th>
							<th className="text-center">Action</th>
						</tr>
						{props.invoices.data?.map((invoice, key) => (
							<tr key={key}>
								<td>
									<input
										type="checkbox"
										checked={props.deleteIds.includes(invoice.id)}
										onClick={() => props.handleSetDeleteIds(invoice.id)}
									/>
								</td>
								{/* <td>{props.iterator(key, invoices)}</td> */}
								<td>{invoice.code}</td>
								<td>{invoice.tenantName}</td>
								<td>{invoice.unitName}</td>
								<td className="text-capitalize">
									{invoice.type
										.split("_")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</td>
								<td className="text-capitalize">
									{props.months[invoice.month]}
								</td>
								<td>{invoice.year}</td>
								<td className="text-success">
									<small>KES</small> {invoice.amount}
								</td>
								{/* <td className="text-success">
								<small>KES</small> {invoice.paid}
							</td> */}
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
										<MyLink
											linkTo={`/invoices/${invoice.id}/show`}
											icon={<ViewSVG />}
											className="mx-1"
										/>

										{/* Button trigger modal */}
										{parseFloat(invoice.balance?.replace(/,/g, "")) > 0 && (
											<Btn
												icon={<ChatSendSVG />}
												text="send invoice"
												className={`mx-1`}
												dataBsToggle="modal"
												dataBsTarget={`#invoiceModal`}
												onClick={() => props.setInvoiceToSend(invoice)}
											/>
										)}
										{/* Button trigger modal End */}

										<div className="mx-1">
											<DeleteModal
												index={`invoice${key}`}
												model={invoice}
												modelName="Invoice"
												onDelete={props.onDeleteInvoice}
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
