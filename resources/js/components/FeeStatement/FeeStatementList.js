import React from "react"

import MoneySVG from "@/svgs/MoneySVG"
import HeroIcon from "../Core/HeroIcon"

const FeeStatementList = (props) => {
	var balance = 0

	// Check if balance can be retrieved
	if (props.fees?.statement && props.fees?.statement[0]) {
		balance = props.fees.statement[0].balance
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4 text-success">KES {props.fees?.paid}</span>
							<h4>Total Fees Paid</h4>
						</div>
						<div>
							<span className="fs-4 text-warning">KES {balance}</span>
							<h4>Total Balance Remaining</h4>
						</div>
						<HeroIcon>
							<MoneySVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			<br />

			{/* Table */}
			<div className="table-responsive">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Date</th>
							<th>Description</th>
							<th>Money In (KES)</th>
							<th>Money Out (KES)</th>
							<th>Balance (KES)</th>
						</tr>
					</thead>
					<tbody>
						{props.fees?.statement?.map((feeStatement, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td>{feeStatement.created_at}</td>
								<td>{feeStatement.type}</td>
								<td className="text-success">{feeStatement.credit}</td>
								<td className="text-warning">{feeStatement.debit}</td>
								<td
									className={
										feeStatement.balance > 0 ? "text-warning" : "text-success"
									}>
									{feeStatement.balance}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Table End */}
		</div>
	)
}

export default FeeStatementList
