import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"
import PaginationLinks from "@/components/Core/PaginationLinks"

import PersonSVG from "@/svgs/PersonSVG"
import WalletSVG from "@/svgs/WalletSVG"
import HeroIcon from "@/components/Core/HeroIcon"

const wallet = (props) => {
	// Get Wallet Transactions
	const [wallets, setWallets] = useState([])
	const [transfers, setTransfers] = useState([])
	const [mpesaTransactions, setMpesaTransactions] = useState([])

	const [type, setType] = useState()
	const [destinationReference, setDescriptionReference] = useState()
	const [amount, setAmount] = useState()
	const [loading, setLoading] = useState()

	// Get Total Mpesa Transactions
	const totalMpesaTransactions = mpesaTransactions.reduce(
		(acc, mpesaTransaction) => acc + parseInt(mpesaTransaction.amount),
		0
	)

	// Get Total Transfers
	const totalTransfers = transfers.data?.reduce(
		(acc, transfer) => acc + parseInt(transfer.amount),
		0
	)

	var balance = totalMpesaTransactions - totalTransfers

	useEffect(() => {
		// Set page
		props.setPage({ name: "Finance Wallet", path: ["wallet"] })
		props.get(`kopokopo-recipients/${props.auth.id}`, setWallets)
		props.get("mpesa-transactions", setMpesaTransactions)
		props.getPaginated(`kopokopo-transfers`, setTransfers)
	}, [])

	/*
	 * Submit Transfer
	 */
	const onTransfer = (e) => {
		e.preventDefault()
		// Show Loader
		setLoading(true)

		Axios.post(`api/kopokopo-initiate-transfer`, {
			type: type,
			destinationReference: destinationReference,
			amount: amount,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Refetch Data
				props.getPaginated(`kopokopo-transfers`, setTransfers)
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Wallets Data */}
				<div className="card shadow-sm p-2">
					<div className="d-flex justify-content-between">
						<div className="d-flex justify-content-between w-100 align-items-center mx-4">
							<div>
								<span className="fs-4">
									KES {totalTransfers?.toLocaleString()}
								</span>
								<h4>Total Wallet Transactions</h4>
							</div>
							<div className="border-start border-end border-2 text-warning px-5">
								<span className="fs-4 text-warning px-5">
									KES {balance?.toLocaleString()}
								</span>
								<h4 className="px-5">Balance</h4>
							</div>
							<HeroIcon>
								<WalletSVG />
							</HeroIcon>
						</div>
					</div>
				</div>
				{/* Wallets Data End */}

				{/* Accordion Button */}
				{wallets.map((wallet, key) => (
					<div
						key={key}
						id={`accordionMenu${key}`}
						className="accordion">
						<div
							key={key}
							className="card shadow-sm w-100 p-2">
							<button
								className={`accordion-button collapsed bg-white p-1`}
								type="button"
								data-bs-toggle="collapse"
								data-bs-target={`#collapseMenu${key}`}
								aria-expanded="true"
								aria-controls={`collapseMenu${key}`}>
								<div className="d-flex justify-content-between w-100 align-items-center ms-4 me-1">
									<div>
										{/* Mobile Wallet */}
										<h5>
											{wallet.firstName} {wallet.lastName}
										</h5>
										<h6>{wallet.phoneNumber}</h6>
										{/* Mobile Wallet End */}
										{/* Back Account */}
										<h5>{wallet.accountName}</h5>
										<h6>{wallet.accountNumber}</h6>
										{/* Back Account End */}
										{/* Till */}
										<h5>{wallet.tillName}</h5>
										<h6>{wallet.tillNumber}</h6>
										{/* Till End */}
										{/* Paybill */}
										<h5>{wallet.paybillName}</h5>
										<h6>{wallet.paybillNumber}</h6>
										<h6>{wallet.paybillAccountNumber}</h6>
										{/* Paybill End */}
									</div>
									<div className="py-3 px-4 bg-primary-subtle border border-primary-subtle rounded-pill text-primary">
										{wallet.type.split("_").map((word, key) => (
											<span
												key={key}
												className="text-uppercase me-1">
												{word}
											</span>
										))}
									</div>
								</div>
							</button>
							<div
								className={`accordion ${balance <= 0 && "invisible"}`}
								id={`accordionMenu${key}`}>
								<div
									id={`collapseMenu${key}`}
									className={`accordion-collapse collapse`}
									data-bs-parent={`#accordionMenu${key}`}>
									<div className="accordion-body pt-3 py-2">
										<form onSubmit={onTransfer}>
											<div className="d-flex">
												<input
													type="number"
													name="amount"
													placeholder="Enter amount to transfer"
													className="form-control rounded-pill me-2"
													max={balance.toString()}
													min={wallet.type == "back_account" ? "200" : "100"}
													onChange={(e) => {
														setType(wallet.type)
														setDescriptionReference(wallet.destinationReference)
														setAmount(e.target.value)
													}}
													required={true}
												/>

												<Btn
													btnText="transfer"
													loading={loading}
												/>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
				{/* Accordion Button End */}

				{/* Add Wallet Card */}
				{/* <div className="card shadow-sm p-2 align-items-end">
					<MyLink
						linkTo="/finance/wallet/create"
						text="add wallet"
						className="btn-sm w-25"
					/>
				</div> */}
				{/* Add Wallet Card End */}

				<br />

				<div className="table-responsive mb-5 pb-2">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>#</th>
								<th>Initiated By</th>
								<th>Currency</th>
								<th>Amount</th>
								<th>Created At</th>
							</tr>
						</thead>
						<tbody>
							{transfers.data?.map((transfer, key) => (
								<tr key={key}>
									<td>{props.iterator(key, transfers)}</td>
									<td>{transfer.user}</td>
									<td>{transfer.currency}</td>
									<td>{transfer.amount}</td>
									<td>{transfer.kopokopoCreatedAt}</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* Pagination Links */}
					<PaginationLinks
						list={transfers}
						getPaginated={props.getPaginated}
						setState={setTransfers}
					/>
					{/* Pagination Links End */}
				</div>
			</div>
		</div>
	)
}

export default wallet
