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
	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<HeroHeading
							heading="Total Units"
							data={props.units.meta?.total}
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
							onChange={(e) => props.setNameQuery(e.target.value)}
						/>
					</div>
					{/* Name End */}
					{/* Type */}
					<div className="flex-grow-1 me-2 mb-2">
						<select
							type="text"
							placeholder="Search by Type"
							className="form-control"
							onChange={(e) => props.setTypeQuery(e.target.value)}>
							{[{ id: "", name: "Select Type" }]
								.concat(props.apartmentTypes)
								.map((type, key) => (
									<option
										key={key}
										value={type.id}>
										{type.name}
									</option>
								))}
						</select>
					</div>
					{/* Type End */}
					{/* Status */}
					<div className="flex-grow-1 me-2 mb-2">
						<select
							type="text"
							placeholder="Search by Type"
							className="form-control"
							onChange={(e) => props.setStatusQuery(e.target.value)}>
							{[
								{ id: "", name: "Select Status" },
								{ id: "vacant", name: "Vacant" },
								{ id: "occupied", name: "Occupied" },
							].map((status, key) => (
								<option
									key={key}
									value={status.id}>
									{status.name}
								</option>
							))}
						</select>
					</div>
					{/* Status End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="7"></th>
							<th className="text-end">
								<MyLink
									linkTo={`/units/create`}
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
							<th>Size</th>
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
								<td className="text-capitalize">
									{unit.bedrooms ?? `${unit.size?.value} ${unit.size?.unit}`}
								</td>
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
									<div className="d-flex justify-content-center">
										<MyLink
											linkTo={`/units/${unit.id}/show`}
											icon={<ViewSVG />}
											// text="view"
											className="me-1"
										/>

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
												onDelete={props.onDeleteUnit}
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
