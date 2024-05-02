import React, { useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"
import DeleteSVG from "@/svgs/DeleteSVG"
import InvoiceSVG from "@/svgs/InvoiceSVG"
import PaymentSVG from "@/svgs/PaymentSVG"
import BalanceSVG from "@/svgs/BalanceSVG"

const RentList = (props) => {
	const [nameQuery, setNameQuery] = useState("")

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						{/* Due */}
						<HeroHeading
							heading="Rent Due"
							data={props.rentStatement?.length}
						/>
						<HeroIcon>
							<InvoiceSVG />
						</HeroIcon>
						{/* Due End */}
						{/* Paid */}
						<HeroHeading
							heading="Rent Paid"
							data={props.rentStatement?.length}
						/>
						<HeroIcon>
							<PaymentSVG />
						</HeroIcon>
						{/* Paid End */}
						{/* Balance */}
						<HeroHeading
							heading="Rent Balance"
							data={props.rentStatement?.length}
						/>
						<HeroIcon>
							<BalanceSVG />
						</HeroIcon>
						{/* Balance End */}
					</div>
					{/* Total End */}
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

			<div className="table-responsive mb-5">
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
						{props.rentStatements
							?.filter((rentStatement) => {
								var name = rentStatement.name.toLowerCase()
								var query = nameQuery.toLowerCase()

								return name.match(query)
							})
							.map((rentStatement, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{rentStatement.name}</td>
									<td>{rentStatement.phone}</td>
									<td>{rentStatement.phone}</td>
									<td>{rentStatement.createdAt}</td>
								</tr>
							))}
					</tbody>
				</table>
				{/* Pagination Links */}
				{/* <PaginationLinks
					list={props.rentStatement}
					getPaginated={props.getPaginated}
					setState={props.setRentStatement}
				/> */}
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default RentList
