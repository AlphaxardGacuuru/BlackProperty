import React, { useEffect, useState } from "react"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"
import NoData from "@/components/Core/NoData"

import MoneySVG from "@/svgs/MoneySVG"
import PaymentSVG from "@/svgs/PaymentSVG"
import BalanceSVG from "@/svgs/BalanceSVG"

const StatementList = (props) => {
	const [statements, setStatements] = useState([])

	useEffect(() => {
		props.getPaginated(
			`statements/subscription?
			subscriptionUserId=${props.auth.id}`,
			setStatements
		)
	}, [])

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				{/* Total */}
				<div className="row">
					{/* Due */}
					<div className="col-sm-4">
						<div className="d-flex justify-content-between flex-grow-1 mx-2">
							<HeroHeading
								heading="Due"
								data={
									<span>
										<small>KES</small> {statements.due}
									</span>
								}
							/>
							<HeroIcon>
								<MoneySVG />
							</HeroIcon>
						</div>
					</div>
					{/* Due End */}
					{/* Paid */}
					<div className="col-sm-4">
						<div className="d-flex justify-content-between flex-grow-1 mx-2">
							<HeroHeading
								heading="Paid"
								data={
									<span>
										<small>KES</small> {statements.paid}
									</span>
								}
							/>
							<HeroIcon>
								<PaymentSVG />
							</HeroIcon>
						</div>
					</div>
					{/* Paid End */}
					{/* Balance */}
					<div className="col-sm-4">
						<div className="d-flex justify-content-between flex-grow-1 mx-2">
							<HeroHeading
								heading="Balance"
								data={
									<span>
										<small>KES</small> {statements.balance}
									</span>
								}
							/>
							<HeroIcon>
								<BalanceSVG />
							</HeroIcon>
						</div>
					</div>
					{/* Balance End */}
				</div>
				{/* Total End */}
			</div>
			{/* Data End */}

			<br />

			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Type</th>
							<th>Created On</th>
							<th>Money In</th>
							<th>Money Out</th>
							<th>Balance</th>
						</tr>
					</thead>
					{statements.data?.length > 0 ? (
						<tbody>
							{statements.data?.map((statement, key) => (
								<tr key={key}>
									<td>{props.iterator(key, statements)}</td>
									<td className="text-capitalize">
										{statement.type.split("_").join(" ")}
									</td>
									<td>{statement.createdAt}</td>
									<td className="text-success">
										<small>KES</small> {statement.credit}
									</td>
									<td className="text-success">
										<small>KES</small> {statement.debit}
									</td>
									<td className="text-success">
										<small>KES</small> {statement.balance}
									</td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td
									colSpan="8"
									className="p-0">
									<NoData />
								</td>
							</tr>
						</tbody>
					)}
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={statements}
					getPaginated={props.getPaginated}
					setState={setStatements}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default StatementList
