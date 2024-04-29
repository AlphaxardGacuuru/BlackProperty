import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import DeleteModal from "@/components/Core/DeleteModal"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import PersonSVG from "@/svgs/PersonSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import PlusSVG from "@/svgs/PlusSVG"

const TenantList = (props) => {
	const location = useLocation()
	const [nameQuery, setNameQuery] = useState("")

	/*
	 * Delete Tenant
	 */
	const onDeleteTenant = (tenantId) => {
		Axios.delete(`/api/tenants/${tenantId}`)
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
							heading="Total Tenants"
							data={props.tenants.data?.length}
						/>
						<HeroIcon>
							<PersonSVG />
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
				</div>
			</div>
			{/* Filters End */}

			<br />

			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						{location.pathname.match("/units/") && (
							<tr>
								<th colSpan="7"></th>
								<th className="text-end">
									<MyLink
										linkTo={`/tenants/${props.unitId}/create`}
										icon={<PlusSVG />}
										text="add tenant"
									/>
								</th>
							</tr>
						)}
						<tr>
							<th>#</th>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Gender</th>
							<th>Status</th>
							<th>Date Joined</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{props.tenants.data
							?.filter((tenant) => {
								var name = tenant.name.toLowerCase()
								var query = nameQuery.toLowerCase()

								return name.match(query)
							})
							.map((tenant, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>
										<Img
											src={tenant.avatar}
											className="rounded-circle"
											style={{ minWidth: "3em", height: "3em" }}
											alt="Avatar"
										/>
									</td>
									<td>{tenant.name}</td>
									<td>{tenant.email}</td>
									<td>{tenant.phone}</td>
									<td className="text-capitalize">{tenant.gender}</td>
									<td>
										<span
											className={`${
												tenant.status == "vacated"
													? "bg-warning-subtle"
													: "bg-success-subtle"
											} text-capitalize p-2`}>
											{tenant.status}
										</span>
									</td>
									<td>{tenant.createdAt}</td>
									<td>
										<div className="d-flex justify-content-end">
											<React.Fragment>
												<MyLink
													linkTo={`/tenants/${tenant.id}/show`}
													icon={<ViewSVG />}
													className="btn-sm me-1"
												/>

												<MyLink
													linkTo={`/tenants/${tenant.id}/edit`}
													icon={<EditSVG />}
													className="btn-sm"
												/>

												<div className="mx-1">
													<DeleteModal
														index={`tenant${key}`}
														model={tenant}
														modelName="Tenant"
														onDelete={onDeleteTenant}
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
					list={props.tenants}
					getPaginated={props.getPaginated}
					setState={props.setTenants}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default TenantList
