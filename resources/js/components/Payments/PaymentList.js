import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"
import NoData from "@/components/Core/NoData"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"
import PaymentSVG from "@/svgs/PaymentSVG"
import BalanceSVG from "@/svgs/BalanceSVG"
import Btn from "@/components/Core/Btn"

const PaymentList = (props) => {
	const location = useLocation()

	const [deleteIds, setDeleteIds] = useState([])
	const [loading, setLoading] = useState()

	/*
	 * Handle DeleteId checkboxes
	 */
	const handleSetDeleteIds = (paymentId) => {
		var exists = deleteIds.includes(paymentId)

		var newDeleteIds = exists
			? deleteIds.filter((item) => item != paymentId)
			: [...deleteIds, paymentId]

		setDeleteIds(newDeleteIds)
	}

	/*
	 * Delete Payment
	 */
	const onDeletePayment = (paymentId) => {
		setLoading(true)
		var paymentIds = Array.isArray(paymentId) ? paymentId.join(",") : paymentId

		Axios.delete(`/api/payments/${paymentIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				props.setPayments({
					sum: props.payments.sum,
					meta: props.payments.meta,
					links: props.payments.links,
					data: props.payments.data.filter((payment) => {
						if (Array.isArray(paymentId)) {
							return !paymentIds.includes(payment.id)
						} else {
							return payment.id != paymentId
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
									<small>KES</small> {props.payments.sum}
								</span>
							}
						/>
						<HeroIcon>
							<PaymentSVG />
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

			<div className="card shadow-sm py-2 px-4">
				<div className="d-flex justify-content-end flex-wrap">
					<div className="d-flex flex-grow-1">
						{/* Start Date */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Start At</label>
							{/* Start Month */}
							<select
								className="form-control"
								onChange={(e) =>
									props.setStartMonth(
										e.target.value == "0" ? "" : e.target.value
									)
								}>
								{props.months.map((month, key) => (
									<option
										key={key}
										value={key}>
										{month}
									</option>
								))}
							</select>
						</div>
						{/* Start Month End */}
						{/* Start Year */}
						<div className="flex-grow-1 me-2 mb-2">
							<label
								htmlFor=""
								className="invisible">
								Start At
							</label>
							<select
								className="form-control"
								onChange={(e) =>
									props.setStartYear(
										e.target.value == "0" ? "" : e.target.value
									)
								}>
								<option value="">Select Year</option>
								{props.years.map((year, key) => (
									<option
										key={key}
										value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
						{/* Start Year End */}
					</div>
					{/* Start Date End */}
					{/* End Date */}
					<div className="d-flex flex-grow-1">
						{/* End Month */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">End At</label>
							<select
								className="form-control"
								onChange={(e) =>
									props.setEndMonth(e.target.value == "0" ? "" : e.target.value)
								}>
								{props.months.map((month, key) => (
									<option
										key={key}
										value={key}>
										{month}
									</option>
								))}
							</select>
						</div>
						{/* End Month End */}
						{/* End Year */}
						<div className="flex-grow-1 me-2 mb-2">
							<label
								htmlFor=""
								className="invisible">
								End At
							</label>
							<select
								className="form-control"
								onChange={(e) =>
									props.setEndYear(e.target.value == "0" ? "" : e.target.value)
								}>
								<option value="">Select Year</option>
								{props.years.map((year, key) => (
									<option
										key={key}
										value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
						{/* End Year End */}
					</div>
					{/* End Date End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="9"></th>
							<th
								colSpan="2"
								className="text-end">
								<div className="d-flex justify-content-end">
									{deleteIds.length > 0 && (
										<Btn
											text={`delete ${deleteIds.length}`}
											className="me-2"
											onClick={() => onDeletePayment(deleteIds)}
											loading={loading}
										/>
									)}

									{location.pathname.match("/admin/payments") && (
										<MyLink
											linkTo={`/payments/create`}
											icon={<PlusSVG />}
											text="add payment"
										/>
									)}

									{location.pathname.match("/admin/units/") && (
										<MyLink
											linkTo={`/units/${props.unit?.id}/payments/create`}
											icon={<PlusSVG />}
											text="add payment"
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
										deleteIds.length == props.payments.data?.length &&
										deleteIds.length != 0
									}
									onClick={() =>
										setDeleteIds(
											deleteIds.length == props.payments.data.length
												? []
												: props.payments.data.map((payment) => payment.id)
										)
									}
								/>
							</th>
							<th>#</th>
							<th>Number</th>
							<th>Tenant</th>
							<th>Unit</th>
							<th>Channel</th>
							{/* <th>Transaction Reference</th> */}
							<th>Amount</th>
							<th>Month</th>
							<th>Year</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					{props.payments.data?.length > 0 ? (
						<tbody>
							{props.payments.data?.map((payment, key) => (
								<tr key={key}>
									<td>
										<input
											type="checkbox"
											checked={deleteIds.includes(payment.id)}
											onClick={() => handleSetDeleteIds(payment.id)}
										/>
									</td>
									<td>{props.iterator(key, props.payments)}</td>
									<td>{payment.number}</td>
									<td>{payment.tenantName}</td>
									<td>{payment.unitName}</td>
									<td>{payment.channel}</td>
									{/* <td>{payment.transactionReference}</td> */}
									<td className="text-success">
										<small>KES</small> {payment.amount}
									</td>
									<td>{props.months[payment.month]}</td>
									<td>{payment.year}</td>
									<td>
										<div className="d-flex justify-content-center">
											<MyLink
												linkTo={`/payments/${payment.id}/show`}
												icon={<ViewSVG />}
												className="me-1"
											/>
											{location.pathname.match("/super/") ||
											location.pathname.match("/admin/") ? (
												<React.Fragment>
													<MyLink
														linkTo={`/payments/${payment.id}/edit`}
														icon={<EditSVG />}
													/>

													<div className="mx-1">
														<DeleteModal
															index={`payment${key}`}
															model={payment}
															modelName="Payment"
															onDelete={onDeletePayment}
														/>
													</div>
												</React.Fragment>
											) : null}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td
									colSpan="11"
									className="p-0">
									<NoData />
								</td>
							</tr>
						</tbody>
					)}
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.payments}
					getPaginated={props.getPaginated}
					setState={props.setPayments}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default PaymentList
