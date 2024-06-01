import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"
import HeroIcon from "@/components/Core/HeroIcon"
import HeroHeading from "@/components/Core/HeroHeading"

import PaginationLinks from "@/components/Core/PaginationLinks"

import UnitSVG from "@/svgs/UnitSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"

const UnitList = (props) => {
	const location = useLocation()

	/*
	 * Delete Unit
	 */
	const onDeleteUnit = (unitId) => {
		Axios.delete(`/api/units/${unitId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setUnits({
					meta: props.units.meta,
					links: props.units.links,
					data: props.units.data.filter((unit) => unit.id != unitId),
				})
				// Update Property
				props.get(`properties/${props.propertyId}`, props.setProperty)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<HeroHeading
							heading="Total Units"
							data={props.totalUnits}
						/>
						<HeroIcon>
							<UnitSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="6"></th>
							<th className="text-end">
								<MyLink
									linkTo={`/units/${props.propertyId}/create`}
									icon={<PlusSVG />}
									text="add unit"
								/>
							</th>
						</tr>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Rent</th>
							<th>Deposit</th>
							<th>Type</th>
							<th>Current Tenant</th>
							<th className="text-center">Action</th>
						</tr>
						{props.units.data?.map((unit, key) => (
							<tr key={key}>
								<td>{props.iterator(key, props.units)}</td>
								<td>{unit.name}</td>
								<td className="text-success">
									<small>KES</small> {unit.rent}
								</td>
								<td className="text-success">
									<small>KES</small> {unit.deposit}
								</td>
								<td className="text-capitalize">{unit.type}</td>
								<td>
									{unit.tenantId ? (
										<span className="bg-success-subtle p-1">
											{unit.tenantName}
										</span>
									) : (
										<span className="bg-warning-subtle p-1">Vacant</span>
									)}
								</td>
								<td>
									<div className="d-flex justify-content-end">
										<div className="d-flex justify-content-end">
											<MyLink
												linkTo={`/units/${unit.id}/show`}
												icon={<ViewSVG />}
												// text="view"
												className="me-1"
											/>
										</div>

										<MyLink
											linkTo={`/units/${unit.id}/edit`}
											icon={<EditSVG />}
											// text="edit"
										/>

										<div className="mx-1">
											<DeleteModal
												index={`unit${key}`}
												model={unit}
												modelName="Unit"
												onDelete={onDeleteUnit}
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
					list={props.units}
					getPaginated={props.getPaginated}
					setState={props.setUnits}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default UnitList
