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
import CreditNoteSVG from "@/svgs/CreditNoteSVG"
import BalanceSVG from "@/svgs/BalanceSVG"
import Btn from "@/components/Core/Btn"

const CreditNoteList = (props) => {
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
	 * Delete CreditNote
	 */
	const onDeleteCreditNote = (creditNoteId) => {
		setLoading(true)
		var creditNoteIds = Array.isArray(creditNoteId)
			? creditNoteId.join(",")
			: creditNoteId

		Axios.delete(`/api/credit-notes/${creditNoteIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				props.setCreditNotes({
					sum: props.creditNotes.sum,
					meta: props.creditNotes.meta,
					links: props.creditNotes.links,
					data: props.creditNotes.data.filter((creditNote) => {
						if (Array.isArray(creditNoteId)) {
							return !creditNoteIds.includes(creditNote.id)
						} else {
							return creditNote.id != creditNoteId
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
									<small>KES</small> {props.creditNotes.sum}
								</span>
							}
						/>
						<HeroIcon>
							<CreditNoteSVG />
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
							<th colSpan="8"></th>
							<th
								colSpan="2"
								className="text-end">
								<div className="d-flex justify-content-end">
									{deleteIds.length > 0 && (
										<Btn
											text={`delete ${deleteIds.length}`}
											className="me-2"
											onClick={() => onDeleteCreditNote(deleteIds)}
											loading={loading}
										/>
									)}

									{location.pathname.match("/admin/credit-notes") && (
										<MyLink
											linkTo={`/credit-notes/create`}
											icon={<PlusSVG />}
											text="create credit note"
										/>
									)}

									{location.pathname.match("/admin/units/") && (
										<MyLink
											linkTo={`/units/${props.unit?.id}/credit-notes/create`}
											icon={<PlusSVG />}
											text="add credit note"
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
										deleteIds.length == props.creditNotes.data?.length &&
										deleteIds.length != 0
									}
									onClick={() =>
										setDeleteIds(
											deleteIds.length == props.creditNotes.data.length
												? []
												: props.creditNotes.data.map(
														(creditNote) => creditNote.id
												  )
										)
									}
								/>
							</th>
							<th>#</th>
							<th>Number</th>
							<th>Tenant</th>
							<th>Unit</th>
							<th>Description</th>
							<th>Amount</th>
							<th>Month</th>
							<th>Year</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					{props.creditNotes.data?.length > 0 ? (
						<tbody>
							{props.creditNotes.data?.map((creditNote, key) => (
								<tr key={key}>
									<td>
										<input
											type="checkbox"
											checked={deleteIds.includes(creditNote.id)}
											onClick={() => handleSetDeleteIds(creditNote.id)}
										/>
									</td>
									<td>{props.iterator(key, props.creditNotes)}</td>
									<td>{creditNote.number}</td>
									<td>{creditNote.tenantName}</td>
									<td>{creditNote.unitName}</td>
									<td>{creditNote.description}</td>
									<td className="text-success">
										<small>KES</small> {creditNote.amount}
									</td>
									<td>{props.months[creditNote.month]}</td>
									<td>{creditNote.year}</td>
									<td>
										{location.pathname.match("/super/") ||
										location.pathname.match("/admin/") ? (
											<div className="d-flex justify-content-center">
												<MyLink
													linkTo={`/credit-notes/${creditNote.id}/show`}
													icon={<ViewSVG />}
													className="mx-1"
												/>

												<MyLink
													linkTo={`/credit-notes/${creditNote.id}/edit`}
													icon={<EditSVG />}
												/>

												<div className="mx-1">
													<DeleteModal
														index={`creditNote${key}`}
														model={creditNote}
														modelName="Credit Note"
														onDelete={onDeleteCreditNote}
													/>
												</div>
											</div>
										) : null}
									</td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td
									colSpan="10"
									className="p-0">
									<NoData />
								</td>
							</tr>
						</tbody>
					)}
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.creditNotes}
					getPaginated={props.getPaginated}
					setState={props.setCreditNotes}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default CreditNoteList
