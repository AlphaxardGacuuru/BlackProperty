import React, { useState, useRef, useEffect } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"
import NoData from "@/components/Core/NoData"

import ViewSVG from "@/svgs/ViewSVG"
import PlusSVG from "@/svgs/PlusSVG"
import AnnouncementSVG from "@/svgs/AnnouncementSVG"
import BalanceSVG from "@/svgs/BalanceSVG"
import ChatSendSVG from "@/svgs/ChatSendSVG"
import MoneySVG from "@/svgs/MoneySVG"
import CoinSVG from "@/svgs/CoinSVG"

const index = (props) => {
	const location = useLocation()

	let superPropertyId = location.pathname.match("/super/") ? "All" : null

	const [announcements, setAnnouncements] = useState([])
	const [deleteIds, setDeleteIds] = useState([])
	const [loading, setLoading] = useState()

	// Modal state for tenants list
	const [showTenantsModal, setShowTenantsModal] = useState(false)
	const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)

	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Announcements", path: ["announcements"] })
	}, [])

	// Function to open tenants modal
	const handleViewTenants = (announcement) => {
		setSelectedAnnouncement(announcement)
		setShowTenantsModal(true)
	}

	// Function to close tenants modal
	const handleCloseTenantsModal = () => {
		setShowTenantsModal(false)
		setSelectedAnnouncement(null)
	}

	useEffect(() => {
		// Fetch Announcements
		props.getPaginated(
			`announcements?propertyId=${props.selectedPropertyId},${superPropertyId}&
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setAnnouncements
		)
	}, [])

	/*
	 * Delete Announcement
	 */
	const onDeleteAnnouncement = (announcementId) => {
		setLoading(true)
		var announcementIds = Array.isArray(announcementId)
			? announcementId.join(",")
			: announcementId

		Axios.delete(`/api/announcements/${announcementIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				setAnnouncements({
					sum: announcements.sum,
					paid: announcements.paid,
					balance: announcements.balance,
					meta: announcements.meta,
					links: announcements.links,
					data: announcements.data.filter((announcement) => {
						if (Array.isArray(announcementId)) {
							return !announcementIds.includes(announcement.id)
						} else {
							return announcement.id != announcementId
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
		<div className="row">
			<div className="col-sm-12">
				{/* Tenants Modal */}
				{showTenantsModal && (
					<div
						className="modal fade show"
						style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
						tabIndex="-1"
						role="dialog">
						<div
							className="modal-dialog modal-lg"
							role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Announcement Details</h5>
									<button
										type="button"
										className="btn-close"
										onClick={handleCloseTenantsModal}
										aria-label="Close"></button>
								</div>
								<div className="modal-body">
									{selectedAnnouncement && (
										<>
											<div className="mb-2">
												<strong>Message:</strong>
												<div className="text-dark">
													{selectedAnnouncement.message}
												</div>
											</div>
											<div>
												<strong>Channels:</strong>
												<span className="text-capitalize ms-2 mb-2">
													{selectedAnnouncement.channels.join(", ")}
												</span>
											</div>
											<div>
												<div className="mt-2">
													{selectedAnnouncement.tenants.length > 0 ? (
														<table className="table table-hover">
															<thead>
																<tr>
																	<th>Tenant List</th>
																</tr>
															</thead>
															<tbody>
																{selectedAnnouncement.tenants.map(
																	(tenant, index) => (
																		<tr>
																			<td
																				key={index}
																				className="">
																				{tenant}
																			</td>
																		</tr>
																	)
																)}
																<tr>
																	<th>Total: {selectedAnnouncement.tenants.length}</th>
																</tr>
															</tbody>
														</table>
													) : (
														<p className="text-muted">
															No tenants found for this announcement.
														</p>
													)}
												</div>
											</div>
										</>
									)}
								</div>
								<div className="modal-footer">
									<Btn
										type="button"
										text="close"
										onClick={handleCloseTenantsModal}
									/>
								</div>
							</div>
						</div>
					</div>
				)}
				{/* Tenants Modal End */}

				{/* Data */}
				<div className="card shadow-sm mb-2 p-2">
					{/* Total */}
					<div className="d-flex justify-content-between flex-grow-1 mx-2">
						<HeroHeading
							heading="Total"
							data={announcements.meta?.total || 0}
						/>
						<HeroIcon>
							<AnnouncementSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
				{/* Data End */}

				<br />

				<div className="card shadow-sm py-2 px-4">
					<div className="d-flex justify-content-end flex-wrap">
						<div className="d-flex flex-grow-1">
							{/* Start Date */}
							<div className="flex-grow-1 me-2 mb-2">
								<label htmlFor="">Start At</label>
								{/* Start Month */}
								<select
									className="form-control"
									onChange={(e) => setStartMonth(e.target.value)}>
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
									onChange={(e) => setStartYear(e.target.value)}>
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
									onChange={(e) => setEndMonth(e.target.value)}>
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
									onChange={(e) => setStartYear(e.target.value)}>
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
								<th colSpan="4"></th>
								<th
									colSpan="2"
									className="text-end">
									<div className="d-flex justify-content-end">
										{location.pathname.match("/admin/announcements") && (
											<MyLink
												linkTo={`/announcements/create`}
												icon={<PlusSVG />}
												text="create announcement"
											/>
										)}
									</div>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Message</th>
								<th>Channels</th>
								<th>Tenants</th>
								<th>Sent On</th>
								<th>Actions</th>
							</tr>
						</thead>
						{announcements.data?.length > 0 ? (
							<tbody>
								{announcements.data?.map((announcement, key) => (
									<tr key={key}>
										<td>{props.iterator(key, announcements)}</td>
										<td className="text-nowrap">{announcement.message}</td>
										<td className="text-capitalize">
											{announcement.channels.join(", ")}
										</td>
										<td>
											<div className="d-flex align-items-center">
												<div className="me-2">
													{announcement.tenants
														.slice(0, 3)
														.map((tenantName) => tenantName)
														.join(", ")}
													...
												</div>
											</div>
										</td>
										<td>{announcement.createdAt}</td>
										<td>
											<Btn
												className="btn-sm"
												onClick={() => handleViewTenants(announcement)}
												icon={<ViewSVG />}
												text={`view ${announcement.tenants.length} ${
													announcement.tenants.length > 1 ? "tenants" : "tenant"
												}`}
											/>
										</td>
									</tr>
								))}
							</tbody>
						) : (
							<tbody>
								<tr>
									<td
										colSpan="6"
										className="p-0">
										<NoData />
									</td>
								</tr>
							</tbody>
						)}
					</table>
					{/* Pagination Links */}
					<PaginationLinks
						list={announcements}
						getPaginated={props.getPaginated}
						setState={setAnnouncements}
					/>
					{/* Pagination Links End */}
				</div>
				{/* Table End */}
			</div>
		</div>
	)
}

export default index
