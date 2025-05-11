import React from 'react'
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"
import DeductionSVG from "@/svgs/DeductionSVG"
import BalanceSVG from "@/svgs/BalanceSVG"
import Btn from "@/components/Core/Btn"

const DeductionList = (props) => {
  return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				<div className="d-flex justify-content-between">
					<div className="d-flex justify-content-between flex-wrap w-100 align-items-center mx-4">
						{/* Total */}
						<HeroHeading
							heading="Total"
							data={
								<span>
									<small>KES</small> {props.deductions.sum}
								</span>
							}
						/>
						<HeroIcon>
							<DeductionSVG />
						</HeroIcon>
						{/* Total End */}
					</div>
				</div>
			</div>
			{/* Data End */}

			<br />

			{/* Filters */}
			<div className="card shadow-sm px-4 pt-4 pb-3 mb-2">
				<div className="d-flex flex-wrap">
					{/* Tenant */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="text"
							placeholder="Search by Tenant"
							className="form-control"
							onChange={(e) => props.setTenant(e.target.value)}
						/>
					</div>
					{/* Tenant End */}
					{/* Unit */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="text"
							placeholder="Search by Unit"
							className="form-control"
							onChange={(e) => props.setUnit(e.target.value)}
						/>
					</div>
					{/* Unit End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Tenant</th>
							<th>Unit</th>
							<th>Type</th>
							<th>Description</th>
							<th>Amount</th>
							<th className="text-center">Action</th>
						</tr>
						{props.deductions.data?.map((deduction, key) => (
							<tr key={key}>
								<td>{props.iterator(key, props.deductions)}</td>
								<td>{deduction.tenantName}</td>
								<td>{deduction.unitName}</td>
								<td className="text-capitalize">
									{deduction.type
										.split("_")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</td>
								<td>{deduction.description}</td>
								<td className="text-success">
									<small>KES</small> {deduction.amount}
								</td>
								<td>
									<div className="d-flex justify-content-end">
										<MyLink
											linkTo={`/invoices/${deduction.invoiceId}/show`}
											icon={<ViewSVG />}
											text="view invoice"
											className="me-1"
										/>

										<MyLink
											linkTo={`/deductions/${deduction.id}/edit`}
											icon={<EditSVG />}
										/>

										<div className="mx-1">
											<DeleteModal
												index={`deduction${key}`}
												model={deduction}
												modelName="Deduction"
												onDelete={props.onDeleteDeduction}
											/>
										</div>
									</div>
								</td>
							</tr>
						))}
					</thead>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.deductions}
					getPaginated={props.getPaginated}
					setState={props.setDeductions}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default DeductionList