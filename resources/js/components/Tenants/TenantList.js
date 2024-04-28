import React, { useState } from "react"

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
	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [loading, setLoading] = useState()

	/*
	 * Vacate Tenant
	 */
	const onVacate = (tenantId) => {
		setLoading(true)
		Axios.put(`/api/tenants/${tenantId}`, {
			unit: props.unitId,
			vacate: true,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

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
					{/* Gender */}
					<div className="flex-grow-1 me-2 mb-2">
						<select
							id=""
							type="text"
							name="name"
							placeholder="Search by Gender"
							className="form-control me-2"
							onChange={(e) => setGenderQuery(e.target.value)}>
							<option value="">Search by Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
					{/* Gender End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
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
						<tr>
							<th>#</th>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Gender</th>
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
							.filter((tenant) => {
								if (genderQuery) {
									return tenant.gender == genderQuery
								} else {
									return true
								}
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
									<td>{tenant.createdAt}</td>
									<td>
										<div className="d-flex justify-content-end">
											<React.Fragment>
												<MyLink
													linkTo={`/tenants/${tenant.id}/show`}
													icon={<ViewSVG />}
													text="view"
													className="btn-sm me-1"
												/>

												<MyLink
													linkTo={`/tenants/${tenant.id}/edit`}
													icon={<EditSVG />}
													text="edit"
													className="btn-sm me-1"
												/>

												<Btn
													icon={<EditSVG />}
													text="vacate"
													className="btn-sm"
													onClick={() => onVacate(tenant.id)}
													loading={loading}
												/>

												<div className="mx-1">
													<DeleteModal
														index={key}
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
