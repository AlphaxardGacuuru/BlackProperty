import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"

import PlusSVG from "@/svgs/PlusSVG"
import PrintSVG from "@/svgs/PrintSVG"
import LogoSVG from "@/svgs/LogoSVG"

const show = (props) => {
	var { id } = useParams()

	const [payment, setPayment] = useState({})
	const [tenants, setTenants] = useState([])

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Payment", path: ["payments", "view"] })
		props.get(`payments/${id}`, setPayment)
	}, [])

	/*
	 * Print Status Report
	 */
	const printPayment = () => {
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
					onClick={printPayment}
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

							<h2 className="mb-0">RECEIPT</h2>
						</div>
						<div className="card-body">
							<div className="d-flex justify-content-between mb-4">
								<div className="">
									<h5 className="mb-1">Delivered To</h5>
									<div className="text-muted">Tenant: {payment.tenantName}</div>
									<div className="text-muted">Unit: {payment.unitName}</div>
									<div className="text-muted">Phone: {payment.tenantPhone}</div>
									<div className="text-muted">Email: {payment.tenantEmail}</div>
								</div>
								<div className="text-end">
									<h5 className="text-muted">Receipt No: {payment.number}</h5>
									<div className="text-muted">Date: {payment.createdAt}</div>
								</div>
							</div>
							<div className="table-responsive-sm">
								<table className="table table-borderless bg-white">
									<thead className="border-bottom">
										<tr>
											<th>Channel</th>
											<th>Transaction Reference</th>
											<th>Paid On</th>
											<th>Amount</th>
										</tr>
									</thead>
									<tbody>
										<td>{payment.channel}</td>
										<td>{payment.transactionReference}</td>
										<td>{payment.paidOn}</td>
										<td className="text-success">
											<small>KES</small> {payment.amount}
										</td>
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
