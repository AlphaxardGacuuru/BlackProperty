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

	const [creditNote, setCreditNote] = useState({})

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Credit Note", path: ["credit-notes", "view"] })

		Axios.get(`api/credit-notes/${id}`)
			.then((res) => {
				setCreditNote(res.data.data)
			})
			.catch((err) => props.errors(["Failed to Fetch CreditNote"]))
	}, [])

	/*
	 * Print Status Report
	 */
	const printCreditNote = () => {
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
					onClick={printCreditNote}
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
								<h2 className="mb-0">CREDIT MEMO</h2>
							</div>
						</div>
						<div className="card-body">
							<div className="d-flex justify-content-between mb-4">
								<div className="">
									<h5 className="mb-1">Credited To</h5>
									<div className="text-muted">
										Tenant: {creditNote.tenantName}
									</div>
									<div className="text-muted">Unit: {creditNote.unitName}</div>
									<div className="text-muted">
										Phone: {creditNote.tenantPhone}
									</div>
									<div className="text-muted">
										Email: {creditNote.tenantEmail}
									</div>
								</div>
								<div className="text-end">
									<h5 className="">Credit Memo No: {creditNote.number}</h5>
									<div className="text-muted">Date: {creditNote.createdAt}</div>
								</div>
							</div>
							<div className="table-responsive-sm">
								<table className="table table-borderless bg-white">
									<thead className="border-bottom">
										<tr>
											<th>Month</th>
											<th>Description</th>
											<th className="text-end">Amount</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{props.months[creditNote.month]}</td>
											<td className="text-capitalize">
												{creditNote.description}
											</td>
											<td className="text-end">
												<small className="me-1">KES</small>
												{creditNote.amount}
											</td>
										</tr>
										<tr className="border-bottom border-top">
											<td></td>
											<td className="fw-normal text-end">Total</td>
											<td className="fw-normal text-end">
												<small className="fw-normal me-1">KES</small>
												{creditNote.amount}
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
