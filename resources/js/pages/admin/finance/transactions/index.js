import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"
import PaginationLinks from "@/components/Core/PaginationLinks"

import MoneySVG from "@/svgs/MoneySVG"
import TransactionSVG from "@/svgs/TransactionSVG"
import HeroIcon from "@/components/Core/HeroIcon"

const index = (props) => {
	// Get Card Transactions
	const [cardTransactions, setCardTransactions] = useState([])
	const [mpesaTransactions, setMpesaTransactions] = useState([])
	const [cardTotal, setCardTotal] = useState("")
	const [mpesaTotal, setMpesaTotal] = useState("")

	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Finance Transactions", path: ["transactions"] })
		props.getPaginated("card-transactions", setCardTransactions)
		props.getPaginated("mpesa-transactions", setMpesaTransactions)
		props.get("card-transactions?total=true", setCardTotal)
		props.get("mpesa-transactions?total=true", setMpesaTotal)
	}, [])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Data */}
				<div className="card shadow-sm p-2">
					<div className="d-flex justify-content-between">
						{/* Card Total */}
						<div className="d-flex justify-content-between w-100 align-items-center mx-4">
							<div>
								<span className="fs-4">KES {cardTotal}</span>
								<h4>Total Card Transactions</h4>
							</div>
							{/* Card Total End */}
							{/* Mpesa Total */}
							<div>
								<span className="fs-4">KES {mpesaTotal}</span>
								<h4>Total Mpesa Transactions</h4>
							</div>
							<HeroIcon>
								<TransactionSVG />
							</HeroIcon>
						</div>
						{/* Mpesa Total End */}
					</div>
				</div>
				{/* Data End */}

				<br />

				{/* Filters */}
				<div className="card shadow-sm p-4">
					<div className="d-flex flex-wrap">
						{/* Name */}
						<div className="flex-grow-1 me-2 mb-2">
							<input
								id=""
								type="text"
								name="name"
								placeholder="Search by Name"
								className="form-control"
								onChange={(e) => setNameQuery(e.target.value)}
							/>
						</div>
						{/* Name End */}
					</div>
				</div>
				{/* Filters End */}

				<br />

				{/* Card Transactions */}
				<div className="table-responsive mb-5 pb-2">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="12">
									<h4>Card Transactions</h4>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Student</th>
								<th>Currency</th>
								<th>Amount</th>
								<th>Charged Amount</th>
								<th>Charge Response Code</th>
								<th>Charge Response Message</th>
								<th>Flw Ref</th>
								<th>Tx Ref</th>
								<th>Status</th>
								<th>Transaction Id</th>
								<th>Transaction Created At</th>
							</tr>
						</thead>
						<tbody>
							{cardTransactions.data
								?.filter((cardTransaction) => {
									var name = cardTransaction.userName.toLowerCase()
									var query = nameQuery.toLowerCase()

									return name.match(query)
								})
								.map((cardTransaction, key) => (
									<tr key={key}>
										<td>{props.iterator(key, cardTransactions)}</td>
										<td>{cardTransaction.userName}</td>
										<td>{cardTransaction.currency}</td>
										<td>{cardTransaction.amount}</td>
										<td>{cardTransaction.chargedAmount}</td>
										<td>{cardTransaction.chargeResponseCode}</td>
										<td>{cardTransaction.chargeResponseMessage}</td>
										<td>{cardTransaction.flwRef}</td>
										<td>{cardTransaction.txRef}</td>
										<td>{cardTransaction.status}</td>
										<td>{cardTransaction.transactionId}</td>
										<td>{cardTransaction.transactionCreatedAt}</td>
									</tr>
								))}
						</tbody>
					</table>

					{/* Pagination Links */}
					<PaginationLinks
						list={cardTransactions}
						getPaginated={props.getPaginated}
						setState={setCardTransactions}
					/>
					{/* Pagination Links End */}
				</div>
				{/* Card Transactions End */}

				{/* Mpesa Transactions */}
				<div className="table-responsive mb-5 pb-2">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="16">
									<h4>Mpesa Transactions</h4>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Student</th>
								<th>Currency</th>
								<th>Amount</th>
								<th>Sender Phone Number</th>
								<th>Kopokopo Id</th>
								<th>Type</th>
								<th>Initiation Time</th>
								<th>Status</th>
								<th>Event Type</th>
								<th>Resource Id</th>
								<th>Reference</th>
								<th>Origination Time</th>
								<th>Till Number</th>
								<th>System</th>
								<th>Resource Status</th>
							</tr>
						</thead>
						<tbody>
							{mpesaTransactions.data
								?.filter((mpesaTransaction) => {
									var name = mpesaTransaction.userName.toLowerCase()
									var query = nameQuery.toLowerCase()

									return name.match(query)
								})
								.map((mpesaTransaction, key) => (
									<tr key={key}>
										<td>{props.iterator(key, mpesaTransactions)}</td>
										<td>{mpesaTransaction.userName}</td>
										<td>{mpesaTransaction.currency}</td>
										<td>{mpesaTransaction.amount}</td>
										<td>{mpesaTransaction.senderPhoneNumber}</td>
										<td>{mpesaTransaction.kopokopoId}</td>
										<td>{mpesaTransaction.type}</td>
										<td>{mpesaTransaction.initiationTime}</td>
										<td>{mpesaTransaction.status}</td>
										<td>{mpesaTransaction.eventType}</td>
										<td>{mpesaTransaction.resourceId}</td>
										<td>{mpesaTransaction.reference}</td>
										<td>{mpesaTransaction.originationTime}</td>
										<td>{mpesaTransaction.tillNumber}</td>
										<td>{mpesaTransaction.system}</td>
										<td>{mpesaTransaction.resourceStatus}</td>
									</tr>
								))}
						</tbody>
					</table>

					{/* Pagination Links */}
					<PaginationLinks
						list={mpesaTransactions}
						getPaginated={props.getPaginated}
						setState={setMpesaTransactions}
					/>
					{/* Pagination Links End */}
				</div>
				{/* Mpesa Transactions End */}
			</div>
		</div>
	)
}

export default index
