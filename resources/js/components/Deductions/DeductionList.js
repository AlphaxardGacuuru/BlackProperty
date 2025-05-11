import React, { useState } from "react"
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
	const location = useLocation()

	const [deleteIds, setDeleteIds] = useState([])
	const [loading, setLoading] = useState()

	/*
	 * Handle DeleteId checkboxes
	 */
	const handleSetDeleteIds = (invoiceId) => {
		var exists = deleteIds.includes(invoiceId)

		var newDeleteIds = exists
			? deleteIds.filter((item) => item != invoiceId)
			: [...deleteIds, invoiceId]

		setDeleteIds(newDeleteIds)
	}

	/*
	 * Delete Deduction
	 */
	const onDeleteDeduction = (deductionId) => {
		setLoading(true)
		var deductionIds = Array.isArray(deductionId)
			? deductionId.join(",")
			: deductionId

		Axios.delete(`/api/deductions/${deductionIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				props.setDeductions({
					sum: props.deductions.sum,
					meta: props.deductions.meta,
					links: props.deductions.links,
					data: props.deductions.data.filter((deduction) => {
						if (Array.isArray(deductionId)) {
							return !deductionIds.includes(deduction.id)
						} else {
							return deduction.id != deductionId
						}
					}),
				})
				// Clear DeleteIds
				setDeleteIds([])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
				// Clear DeleteIds
				setDeleteIds([])
			})
	}

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
			{props.deductions.data?.length > 0 ? (
				<div className="table-responsive mb-5">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="6"></th>
								<th
									colSpan="2"
									className="text-end">
									<div className="d-flex justify-content-end">
										{deleteIds.length > 0 && (
											<Btn
												text={`delete ${deleteIds.length}`}
												className="me-2"
												onClick={() => onDeleteDeduction(deleteIds)}
												loading={loading}
											/>
										)}

										{location.pathname.match("/admin/units/") && (
											<MyLink
												linkTo={`/deductions/create`}
												icon={<PlusSVG />}
												text="add deduction"
											/>
										)}
									</div>
								</th>
							</tr>
							<tr>
								<th>
									<input
										type="checkbox"
										checked={
											deleteIds.length == props.deductions.data?.length &&
											deleteIds.length != 0
										}
										onClick={() =>
											setDeleteIds(
												deleteIds.length == props.deductions.data.length
													? []
													: props.deductions.data.map(
															(deduction) => deduction.id
													  )
											)
										}
									/>
								</th>
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
									<td>
										<input
											type="checkbox"
											checked={deleteIds.includes(deduction.id)}
											onClick={() => handleSetDeleteIds(deduction.id)}
										/>
									</td>
									<td>{props.iterator(key, props.deductions)}</td>
									<td>{deduction.tenantName}</td>
									<td>{deduction.unitName}</td>
									<td className="text-capitalize">
										{deduction.type
											.split("_")
											.map(
												(word) => word.charAt(0).toUpperCase() + word.slice(1)
											)
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
													onDelete={onDeleteDeduction}
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
			) : (
				<div className="bg-white text-center py-5">
					<img
						src="/img/no-data-found.jpg"
						alt="No entries found"
						style={{ width: "30%", height: "auto" }}
					/>
				</div>
			)}
			{/* Table End */}
		</div>
	)
}

export default DeductionList
