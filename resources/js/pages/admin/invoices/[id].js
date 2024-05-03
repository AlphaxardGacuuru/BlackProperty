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
	const channels = ["Card", "Mpesa"]

	const [rentStatements, setRentStatements] = useState([])
	const [tab, setTab] = useState("rent")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Invoice", path: ["properties", "view"] })
		props.getPaginated(`tenants/by-invoice-id/${id}`, setTenants)
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

								{/*Customer Channel*/}
								<div className="form-group">
									<label
										htmlFor="userInput"
										className="col-form-label">
										Customer
									</label>
									<select
										id="userInput"
										name="user_id"
										className="form-control"
										required={true}>
										<option value="">Choose a Customer</option>
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
										className="btn btn-light"
										data-bs-dismiss="modal">
										Close
									</button>
									<button
										type="submit"
										className="btn btn-primary">
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
					className="btn btn-primary text-white me-2"
					data-bs-toggle="modal"
					data-bs-target="#paymentModal">
					<i className="fa fa-pen-square"></i> Add Payment
				</button>
				<button
					className="btn btn-secondary me-5"
					onClick="printInvoice()">
					<i className="fa fa-print"></i> Print
				</button>
			</div>
			{/*Create Link End*/}

			<div
				id="contentToPrint"
				className="row mb-5">
				<div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
					<div className="card p-5">
						<div className="card-header p-4 border-0">
							<div className="mt-2 pt-2 d-inline-block">Silver Silicon ltd</div>

							<div className="float-right">
								<div className="mb-0">INVOICE</div>
								<div className="p-2 text-center text-capitalize">
									{invoice.status}
								</div>
							</div>
						</div>
						<div className="card-body">
							<div className="d-flex justify-content-between mb-4">
								<div className="">
									<h5 className="mb-1">Billed To:</h5>
									<div className="text-muted">{invoice.tenant}</div>
									<div className="text-muted">Phone: {invoice.tenant}</div>
									<div className="text-muted">{invoice.tenant}</div>
								</div>
								<div className="text-end">
									<p className="text-muted">Invoice No: {invoice.id}</p>
									<p className="text-muted">Date: {invoice.created_at}</p>
								</div>
							</div>
							<div className="table-responsive-sm"></div>
						</div>

						<div className="card-footer bg-white border-0">
							<h1 className="my-5">Thank you!</h1>

							<div className="d-flex justify-content-between">
								<div>Payment Information</div>
								<div className="text-end">
									<h3 className="text-dark mb-1">Silver Silicon Limited</h3>
									<div>370-00207 Township Street, Namanga, Kenya</div>
									{/*<div>Email: info@bulkagencies.co.ke</div>*/}
									{/*<div>Phone: +254 722 427 629</div>*/}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default show
