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
import WaterReadingSVG from "@/svgs/WaterReadingSVG"
import MoneySVG from "@/svgs/MoneySVG"
import Btn from "@/components/Core/Btn"

const WaterReadingList = (props) => {
	const location = useLocation()

	const [deleteIds, setDeleteIds] = useState([])
	const [loading, setLoading] = useState()

	/*
	 * Handle DeleteId checkboxes
	 */
	const handleSetDeleteIds = (waterReadingId) => {
		var exists = deleteIds.includes(waterReadingId)

		var newDeleteIds = exists
			? deleteIds.filter((item) => item != waterReadingId)
			: [...deleteIds, waterReadingId]

		setDeleteIds(newDeleteIds)
	}

	/*
	 * Delete WaterReading
	 */
	const onDeleteWaterReading = (waterReadingId) => {
		setLoading(true)
		var waterReadingIds = Array.isArray(waterReadingId)
			? waterReadingId.join(",")
			: waterReadingId

		Axios.delete(`/api/water-readings/${waterReadingIds}`)
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Remove row
				props.setWaterReadings({
					meta: props.waterReadings.meta,
					links: props.waterReadings.links,
					data: props.waterReadings.data.filter((waterReading) => {
						if (Array.isArray(waterReadingId)) {
							return !waterReadingIds.includes(waterReading.id)
						} else {
							return waterReading.id != waterReadingId
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
					{/* Total */}
					<div className="d-flex justify-content-between flex-wrap w-100 align-items-center mx-4">
						{/* Bill */}
						<HeroHeading
							heading="Bill"
							data={`KES ${props.waterReadings.totalBill}`}
						/>
						<HeroIcon>
							<MoneySVG />
						</HeroIcon>
						{/* Bill End */}
						{/* Usage */}
						<HeroHeading
							heading="Usage"
							data={`${props.waterReadings.totalUsage}L`}
						/>
						<HeroIcon>
							<WaterReadingSVG />
						</HeroIcon>
						{/* Usage End */}
					</div>
				</div>
				{/* Total End */}
			</div>
			{/* Data End */}

			<br />

			{/* Filters */}
			<div className="card shadow-sm py-2 px-4">
				<div className="d-flex justify-content-end flex-wrap">
					{/* Tenant */}
					<div className="flex-grow-1 me-2 mb-2">
						<label htmlFor="">Tenant</label>
						<input
							type="text"
							placeholder="Search by Tenant"
							className="form-control"
							onChange={(e) => props.setTenant(e.target.value)}
						/>
					</div>
					{/* Tenant End */}
					{/* Unit */}
					{location.pathname.match("water-readings") && (
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Unit</label>
							<input
								type="text"
								placeholder="Search by Unit"
								className="form-control"
								onChange={(e) => props.setUnit(e.target.value)}
							/>
						</div>
					)}
					{/* Unit End */}
					<div className="d-flex flex-grow-1">
						{/* Start Date */}
						<div className="flex-grow-1 me-2 mb-2">
							<label htmlFor="">Start At</label>
							{/* Start Month */}
							<select
								className="form-control"
								onChange={(e) => props.setStartMonth(e.target.value)}>
								{props.months.map((month, key) => (
									<option
										key={key}
										value={key}
										selected={key == props.previousMonth}>
										{month}
									</option>
								))}
							</select>
						</div>
						{/* Start Month End */}
						{/* Start Year */}
						<div className="me-2 mb-2">
							<label
								htmlFor=""
								className="invisible">
								Start At
							</label>
							<select
								className="form-control"
								onChange={(e) => props.setStartYear(e.target.value)}>
								<option value="">Select Year</option>
								{props.years.map((year, key) => (
									<option
										key={key}
										value={year}
										selected={key == props.currentYear}>
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
								onChange={(e) => props.setEndMonth(e.target.value)}>
								{props.months.map((month, key) => (
									<option
										key={key}
										value={key}
										selected={key == props.previousMonth}>
										{month}
									</option>
								))}
							</select>
						</div>
						{/* End Month End */}
						{/* End Year */}
						<div className="me-2 mb-2">
							<label
								htmlFor=""
								className="invisible">
								End At
							</label>
							<select
								className="form-control"
								onChange={(e) => props.setEndYear(e.target.value)}>
								<option value="">Select Year</option>
								{props.years.map((year, key) => (
									<option
										key={key}
										value={year}
										selected={key == props.currentYear}>
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
							<th className="text-end">
								<div className="d-flex justify-content-end">
									{deleteIds.length > 0 && (
										<Btn
											text={`delete ${deleteIds.length}`}
											className="me-2"
											onClick={() => onDeleteWaterReading(deleteIds)}
											loading={loading}
										/>
									)}

									<MyLink
										linkTo={`/water-readings/create`}
										icon={<PlusSVG />}
										text="add water readings"
									/>
								</div>
							</th>
						</tr>
						<tr>
							<th>
								<input
									type="checkbox"
									checked={
										deleteIds.length == props.waterReadings.data?.length &&
										deleteIds.length != 0
									}
									onClick={() =>
										setDeleteIds(
											deleteIds.length == props.waterReadings.data.length
												? []
												: props.waterReadings.data.map(
														(waterReading) => waterReading.id
												  )
										)
									}
								/>
							</th>
							<th>Tenant</th>
							<th>Unit</th>
							<th>Reading</th>
							<th>Usage</th>
							<th>Bill</th>
							<th>Month</th>
							<th>Year</th>
							<th className="text-center">Action</th>
						</tr>
						{props.waterReadings.data?.map((waterReading, key) => (
							<tr key={key}>
								<td>
									<input
										type="checkbox"
										checked={deleteIds.includes(waterReading.id)}
										onClick={() => handleSetDeleteIds(waterReading.id)}
									/>
								</td>
								<td>{waterReading.tenantName}</td>
								<td>{waterReading.unitName}</td>
								<td>{waterReading.reading}</td>
								<td>{waterReading.usage}</td>
								<td className="text-success">
									<small className="me-1">KES</small>
									{waterReading.bill}
								</td>
								<td className="text-capitalize">
									{props.months[waterReading.month]}
								</td>
								<td>{waterReading.year}</td>
								<td>
									<div className="d-flex justify-content-end">
										<MyLink
											linkTo={`/water-readings/${waterReading.id}/edit`}
											icon={<EditSVG />}
										/>

										<div className="mx-1">
											<DeleteModal
												index={`waterReading${key}`}
												model={waterReading}
												modelName="Water Reading"
												onDelete={onDeleteWaterReading}
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
					list={props.waterReadings}
					getPaginated={props.getPaginated}
					setState={props.setWaterReadings}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default WaterReadingList
