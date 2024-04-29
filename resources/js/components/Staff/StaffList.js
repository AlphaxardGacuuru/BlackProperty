import React, { useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import StaffSVG from "@/svgs/StaffSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"

const StaffList = (props) => {
	const [nameQuery, setNameQuery] = useState("")
	const [roleQuery, setRoleQuery] = useState("")

	/*
	 * Delete Staff
	 */
	const onDeleteStaff = (staffId) => {
		Axios.delete(`/api/staff/${staffId}`)
			.then((res) => {
				props.setMessages([res.data.message])
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<HeroHeading
							heading="Total Staff"
							data={props.staff.data?.length}
						/>
						<HeroIcon>
							<StaffSVG />
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
							onChange={(e) => setNameQuery(e.target.value)}
						/>
					</div>
					{/* Name End */}
					{/* Role */}
					<div className="flex-grow-1 me-2 mb-2">
						<select
							id=""
							type="text"
							name="name"
							placeholder="Search by Role"
							className="form-control me-2"
							onChange={(e) => setRoleQuery(e.target.value)}>
							<option value="">All</option>
							{props.roles.map((role, key) => (
								<option
									key={key}
									value={role.name}>
									{role.name}
								</option>
							))}
						</select>
					</div>
					{/* Role End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th colSpan="6"></th>
							<th className="text-end">
								<MyLink
									linkTo={`/staff/${props.propertyId}/create`}
									icon={<PlusSVG />}
									text="add unit"
								/>
							</th>
						</tr>
						<tr>
							<th>#</th>
							<th></th>
							<th>Name</th>
							<th>Phone</th>
							<th>Role</th>
							<th>Date Joined</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{props.staff.data
							?.filter((staff) => {
								var name = staff.name.toLowerCase()
								var query = nameQuery.toLowerCase()

								return name.match(query)
							})
							.filter((staff) => {
								if (roleQuery) {
									return staff.roleName == roleQuery
								} else {
									return true
								}
							})
							.map((staff, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>
										<Img
											src={staff.avatar}
											className="rounded-circle"
											width="25px"
											height="25px"
											alt="Avatar"
										/>
									</td>
									<td>{staff.name}</td>
									<td>{staff.phone}</td>
									<td>
										{staff.roleNames?.map((role, key) => (
											<span key={key}>| {role}</span>
										))}
									</td>
									<td>{staff.createdAt}</td>
									<td>
										<div className="d-flex justify-content-end">
											<React.Fragment>
												<MyLink
													linkTo={`/staff/${staff.id}/show`}
													icon={<ViewSVG />}
													text="view"
													className="btn-sm me-1"
												/>

												<MyLink
													linkTo={`/staff/${staff.id}/edit`}
													icon={<EditSVG />}
													text="edit"
													className="btn-sm"
												/>

												<div className="mx-1">
													<DeleteModal
														index={key}
														model={staff}
														modelName="Staff"
														onDelete={onDeleteStaff}
													/>
												</div>
											</React.Fragment>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.staff}
					getPaginated={props.getPaginated}
					setState={props.setStaff}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default StaffList
