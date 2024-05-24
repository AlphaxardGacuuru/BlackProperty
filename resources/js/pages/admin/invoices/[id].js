import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import RentList from "@/components/RentStatement/RentStatementList"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import PlusSVG from "@/svgs/PlusSVG"
import PrintSVG from "@/svgs/PrintSVG"

const show = (props) => {
	var { id } = useParams()

	const [invoice, setInvoice] = useState({})
	const [tenants, setTenants] = useState([])

	const channels = ["Card", "Mpesa"]

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Invoice", path: ["properties", "view"] })
		props.get(`invoices/${id}`, setInvoice)
		props.get(
			`tenants/by-property-id/${props.auth.propertyIds}?idAndName=true`,
			setTenants
		)
	}, [])

	return (
		<React.Fragment>
			{/*Confirm Payment Modal End*/}
			<div
				className="modal fade"
				id="paymentModal"
				tabIndex="-1"
				aria-labelledby="paymentModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								id="paymentModalLabel"
								className="modal-title fs-5">
								Create Payment
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body text-wrap">
							<form
								action="/payments"
								method="POST">
								<input
									type="hidden"
									name="invoice_id"
									value="{invoice.id}"
								/>

								{/*Tenant Channel*/}
								<div className="form-group">
									<label
										htmlFor="userInput"
										className="col-form-label">
										Tenant
									</label>
									<select
										id="userInput"
										name="user_id"
										className="form-control"
										required={true}>
										<option value="">Choose a Tenant</option>
										{tenants.map((tenant, key) => (
											<option
												key={key}
												value={tenant.id}>
												{tenant.name}
											</option>
										))}
									</select>
								</div>
								{/*Customer End*/}
								{/*Amount*/}
								<div className="form-group">
									<label
										htmlFor="amountInput"
										className="col-form-label">
										Amount
									</label>
									<input
										id="amountInput"
										type="number"
										name="amount"
										className="form-control"
										required={true}
									/>
								</div>
								{/*Amount End*/}
								{/*Transaction Ref*/}
								<div className="form-group">
									<label
										htmlFor="transactionInput"
										className="col-form-label">
										Transaction Ref
									</label>
									<input
										id="transactionInput"
										type="text"
										name="transaction_reference"
										className="form-control"
									/>
								</div>
								{/*Transaction Ref End*/}
								{/*Payment Channel*/}
								<div className="form-group">
									<label
										htmlFor="paymentInput"
										className="col-form-label">
										Payment Channel
									</label>
									<select
										id="paymentInput"
										name="payment_channel"
										className="form-control"
										required={true}>
										<option value="">Choose a Channel</option>
										{channels.map((channel, key) => (
											<option
												key={key}
												value={channel}>
												{channel}
											</option>
										))}
									</select>
								</div>
								{/*Payment Channel End*/}
								{/*Date*/}
								<div className="form-group">
									<label
										htmlFor="inputText4"
										className="col-form-label">
										Date Received
									</label>
									<input
										id="inputText4"
										type="date"
										name="date_received"
										className="form-control"
									/>
								</div>
								{/*Date End*/}
								<div className="d-flex justify-content-between">
									<button
										type="button"
										className="mysonar-btn btn-2"
										data-bs-dismiss="modal">
										Close
									</button>
									<button
										type="submit"
										className="mysonar-btn btn-2">
										Create Payment
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{/*Confirm Delete Modal End*/}

			{/*Create Link*/}
			<div className="d-flex justify-content-end mb-4">
				{/*Button trigger modal*/}
				<button
					type="button"
					className="mysonar-btn btn-2 me-2"
					data-bs-toggle="modal"
					data-bs-target="#paymentModal">
					<i className="fa fa-pen-square"></i> Add Payment
				</button>
				<button
					className="mysonar-btn btn-2 me-5"
					onClick="printInvoice()">
					<span className="me-1">
						<PrintSVG />
					</span>
					Print
				</button>
			</div>
			{/*Create Link End*/}

			<div
				id="contentToPrint"
				className="row mb-5">
				<div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
					<div className="card p-5">
						<div className="card-header bg-white border-0 d-flex justify-content-between">
							<h2 className="text-dark mb-1">Black Property</h2>

							<div>
								<h2 className="mb-0">INVOICE</h2>
								<div className="p-2 text-center text-capitalize">
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
										 py-2 px-4`}>
										{invoice.status}
									</span>
								</div>
							</div>
						</div>
						<div className="card-body">
							<div className="d-flex justify-content-between mb-4">
								<div className="">
									<h5 className="mb-1">Billed To</h5>
									<div className="text-muted">Tenant: {invoice.tenantName}</div>
									<div className="text-muted">Unit: {invoice.unitName}</div>
									<div className="text-muted">Phone: {invoice.tenantPhone}</div>
									<div className="text-muted">Email: {invoice.tenantEmail}</div>
								</div>
								<div className="text-end">
									<div className="text-muted">Invoice No: {invoice.id}</div>
									<div className="text-muted">Date: {invoice.createdAt}</div>
								</div>
							</div>
							<div className="table-responsive-sm">
								<table className="table table-borderless bg-white">
									<thead className="border-bottom">
										<tr>
											<th>Type</th>
											<th>Month</th>
											<th className="text-end">Amount</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="text-capitalize">{invoice.type}</td>
											<td>{invoice.month}</td>
											<td className="fw-normal text-end">
												<small className="fw-normal me-1">KES</small>
												{invoice.amount}
											</td>
										</tr>
										<tr className="border-bottom border-top">
											<td></td>
											<td className="fw-normal text-end">Total</td>
											<td className="fw-normal text-end">
												<small className="fw-normal me-1">KES</small>
												{invoice.amount}
											</td>
										</tr>
										<tr className="border-bottom border-top">
											<td></td>
											<td className="fw-normal text-end">Amount Paid</td>
											<td className="fw-normal text-end">
												<small className="fw-normal me-1">KES</small>
												{invoice.paid}
											</td>
										</tr>
										<tr className="border-bottom border-top">
											<td></td>
											<td className="fw-normal text-end">Balance</td>
											<td className="fw-normal text-end">
												<small className="fw-normal me-1">KES</small>
												{invoice.balance}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<h4 className="text-center mb-2">Thank you for your tenancy!</h4>

						<div className="card-footer d-flex justify-content-end bg-white border-0">
							<div className="text-end">
								<h3 className="text-dark mb-1">Black Property</h3>
								<div>Email: al@black.co.ke</div>
								<div>Phone: +254 700 364446</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default show
