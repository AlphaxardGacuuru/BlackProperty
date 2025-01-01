import React, { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import PaymentSVG from "@/svgs/PaymentSVG"
import BalanceSVG from "@/svgs/BalanceSVG"
import Btn from "@/components/Core/Btn"
import EmailSentSVG from "@/svgs/EmailSentSVG"
import SendEmailSVG from "@/svgs/SendEmailSVG"
import SMSSVG from "@/svgs/SMSSVG"
import ChatSVG from "@/svgs/ChatSVG"
import ChatSendSVG from "@/svgs/ChatSendSVG"
import ViewSVG from "@/svgs/ViewSVG"
import CheckSVG from "@/svgs/CheckSVG"
import DashSVG from "@/svgs/DashCircleSVG"
import DashCircleSVG from "@/svgs/DashCircleSVG"
import CheckCircleSVG from "@/svgs/CheckCircleSVG"

const index = (props) => {
	const [smsMessages, setSMSMessages] = useState([])

	const [smsMessageToView, setSmsMessageToView] = useState({})

	const [tenant, setTenant] = useState("")
	const [unit, setUnit] = useState("")
	const [phone, setPhone] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "SMS Messages", path: ["smsMessages"] })
	}, [])

	useEffect(() => {
		// Fetch SMS Messages
		props.getPaginated(
			`sms-messages?propertyId=${props.selectedPropertyId}&
			tenant=${tenant}&
			unit=${unit}&
			phone=${phone}&
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setSMSMessages
		)
	}, [
		props.selectedPropertyId,
		tenant,
		unit,
		phone,
		startMonth,
		endMonth,
		startYear,
		endYear,
	])

	return (
		<div className={props.activeTab}>
			{/* Confirm Invoice Modal End */}
			<div
				className="modal fade"
				id={`smsModal`}
				tabIndex="-1"
				aria-labelledby="smsModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content rounded-0">
						<div className="modal-header">
							<h1
								id="smsModalLabel"
								className="modal-title fs-5">
								SMS
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body text-start text-wrap">
							{smsMessageToView.text}
						</div>
						<div className="modal-footer justify-content-between">
							<button
								type="button"
								className="mysonar-btn btn-2"
								data-bs-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Confirm Invoice Modal End */}

			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				{/* Total */}
				<div className="d-flex justify-content-between flex-wrap w-100 align-items-center mx-2">
					{/* Total */}
					<div className="d-flex justify-content-between flex-grow-1 mx-2">
						<HeroHeading
							heading="Total"
							data={smsMessages.meta?.total}
						/>
						<HeroIcon>
							<SMSSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
					{/* Success */}
					<div className="d-flex justify-content-between flex-grow-1 mx-2">
						<HeroHeading
							heading="Success"
							data={smsMessages.successfull}
						/>
						<HeroIcon>
							<CheckCircleSVG />
						</HeroIcon>
					</div>
					{/* Success End */}
					{/* Failed */}
					<div className="d-flex justify-content-between flex-grow-1 mx-2">
						<HeroHeading
							heading="Failed"
							data={smsMessages.failed}
						/>
						<HeroIcon>
							<DashCircleSVG />
						</HeroIcon>
					</div>
					{/* Failed End */}
				</div>
			</div>
			{/* Total End */}
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
							onChange={(e) => setTenant(e.target.value)}
						/>
					</div>
					{/* Tenant End */}
					{/* Unit */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="text"
							placeholder="Search by Unit"
							className="form-control"
							onChange={(e) => setUnit(e.target.value)}
						/>
					</div>
					{/* Unit End */}
					{/* Phone */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="text"
							placeholder="Search by Phone"
							className="form-control"
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					{/* Phone End */}
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
							<th>Tenant</th>
							<th>Unit</th>
							{/* <th>Response Message</th> */}
							<th>Number</th>
							<th>Status</th>
							{/* <th>Status Code</th> */}
							{/* <th>Cost</th> */}
							<th>Delivery Status</th>
							<th>Network</th>
							{/* <th>Network Code</th> */}
							<th>Failure Reason</th>
							<th>Retry Count</th>
							<th>Message</th>
							<th>Sent On</th>
							<th>Action</th>
						</tr>
						{smsMessages.data?.map((smsMessage, key) => (
							<tr key={key}>
								<td>{smsMessage.userName}</td>
								<td>{smsMessage.unitName}</td>
								{/* <td>{smsMessage.responseMessage}</td> */}
								<td>{smsMessage.number}</td>
								<td>{smsMessage.status}</td>
								{/* <td>{smsMessage.statusCode}</td> */}
								{/* <td>{smsMessage.cost}</td> */}
								<td>{smsMessage.deliveryStatus}</td>
								<td>{smsMessage.network}</td>
								{/* <td>{smsMessage.networkCode}</td> */}
								<td>{smsMessage.failureReason}</td>
								<td>{smsMessage.retryCount}</td>
								<td>{smsMessage.message}</td>
								<td>{smsMessage.createdAt}</td>
								<td>
									{/* Button trigger modal */}
									<Btn
										icon={<ViewSVG />}
										className={`me-1`}
										dataBsToggle="modal"
										dataBsTarget={`#smsModal`}
										onClick={() => setSmsMessageToView(smsMessage)}
									/>
									{/* Button trigger modal End */}
								</td>
							</tr>
						))}
					</thead>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={smsMessages}
					getPaginated={props.getPaginated}
					setState={setSMSMessages}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default index
