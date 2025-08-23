import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"

import PlusSVG from "@/svgs/PlusSVG"
import PrintSVG from "@/svgs/PrintSVG"
import LogoSVG from "@/svgs/LogoSVG"
import DeductionSVG from "@/svgs/DeductionSVG"
import CreditNoteSVG from "@/svgs/CreditNoteSVG"
import PaymentSVG from "@/svgs/PaymentSVG"

const show = (props) => {
	var { id } = useParams()

	const [invoice, setInvoice] = useState({})
	const [payments, setPayments] = useState([])
	const [creditNotes, setCreditNotes] = useState([])
	const [deductions, setDeductions] = useState([])

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Invoice", path: ["invoices", "view"] })

		Axios.get(`api/invoices/${id}`)
			.then((res) => {
				setInvoice(res.data.data)
				// Fetch Payments
				props.getPaginated(
					`payments?propertyId=${props.selectedPropertyId}&
					userUnitId=${res.data.data.userUnitId}&
					month=${res.data.data.month}&
					year=${res.data.data.year}`,
					setPayments
				)
				// Fetch Credit Note
				props.getPaginated(
					`credit-notes?propertyId=${props.selectedPropertyId}&
					userUnitId=${res.data.data.userUnitId}&
					month=${res.data.data.month}&
					year=${res.data.data.year}`,
					setCreditNotes
				)
				// Fetch Deduction
				props.getPaginated(
					`deductions?propertyId=${props.selectedPropertyId}&
					userUnitId=${res.data.data.userUnitId}&
					month=${res.data.data.month}&
					year=${res.data.data.year}`,
					setDeductions
				)
			})
			.catch((err) => props.errors(["Failed to Fetch Invoice"]))
	}, [])

	/*
	 * Print Status Report
	 */
	const printInvoice = () => {
		var contentToPrint = document.getElementById("contentToPrint").innerHTML

		document.body.innerHTML = contentToPrint
		// Print
		window.print()
		// Reload
		window.location.reload()
	}

	return (
		<React.Fragment>
			{/*Create Link*/}
			<div className="d-flex justify-content-end mb-4">
				<Btn
					className="me-5"
					icon={<PrintSVG />}
					text="print"
					onClick={printInvoice}
				/>
			</div>
			{/*Create Link End*/}

			<div
				id="contentToPrint"
				className="row mb-5">
				<div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
					<div className="card p-5">
						<div className="card-header bg-white border-0 d-flex justify-content-between">
							<div
								className="text-dark mb-1"
								style={{ fontSize: "3em" }}>
								<LogoSVG />
							</div>

							<div>
								<h2 className="mb-0">INVOICE</h2>
								<div className="p-2 text-center text-capitalize">
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
										 py-2 px-4`}>
										{invoice.status
											?.split("_")
											.map(
												(word) => word.charAt(0).toUpperCase() + word.slice(1)
											)
											.join(" ")}
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
									<h5 className="">Invoice No: {invoice.number}</h5>
									<div className="text-muted">Date: {invoice.createdAt}</div>
								</div>
							</div>
							<div className="table-responsive-sm">
								<table className="table table-borderless bg-white">
									<thead className="border-bottom">
										<tr>
											<th>Item</th>
											{invoice.type == "water" && <th>Reading</th>}
											{invoice.type == "water" && <th>Usage</th>}
											<th>Month</th>
											<th className="text-end">Amount</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="text-capitalize">
												{invoice.type
													?.split("_")
													.map(
														(word) =>
															word.charAt(0).toUpperCase() + word.slice(1)
													)
													.join(" ")}
											</td>
											{invoice.type == "water" && (
												<td>{invoice.waterReading}</td>
											)}
											{invoice.type == "water" && <td>{invoice.waterUsage}</td>}
											<td>{props.months[invoice.month]}</td>
											<td className="text-end">
												<small className="me-1">KES</small>
												{invoice.amount}
											</td>
										</tr>
										{/* Payments Start */}
										{/* {payments.data?.map((payment, key) => (
											<tr key={key}>
												<td>Payment</td>
												<td>{props.months[payment.month]}</td>
												<td className="text-end">
													<small className="me-1">KES</small>
													{payment.amount}
												</td>
											</tr>
										))} */}
										{/* Payments End */}
										{/* Credit Notes Start */}
										{/* {creditNotes.data?.map((creditNote, key) => (
											<tr key={key}>
												<td>Credit Note</td>
												<td>{props.months[creditNote.month]}</td>
												<td className="text-end">
													<small className="me-1">KES</small>
													{creditNote.amount}
												</td>
											</tr>
										))} */}
										{/* Credit Notes End */}
										{/* Deductions Start */}
										{/* {deductions.data?.map((deduction, key) => (
											<tr key={key}>
												<td>Deduction</td>
												<td>{props.months[deduction.month]}</td>
												<td className="text-end">
													<small className="me-1">KES</small>
													{deduction.amount}
												</td>
											</tr>
										))} */}
										{/* Deductions End */}
										<tr className="border-bottom border-top">
											<td colSpan={invoice.type == "water" ? 3 : 0}></td>
											<td className="fw-normal text-end">Total</td>
											<td className="fw-normal text-end">
												<small className="fw-normal me-1">KES</small>
												{invoice.amount}
											</td>
										</tr>
										<tr className="border-bottom border-top">
											<td colSpan={invoice.type == "water" ? 3 : 0}></td>
											<td className="fw-normal text-end">Paid</td>
											<td className="fw-normal text-end">
												<small className="fw-normal me-1">KES</small>
												{invoice.paid}
											</td>
										</tr>
										<tr className="border-bottom border-top">
											<td colSpan={invoice.type == "water" ? 3 : 0}></td>
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
