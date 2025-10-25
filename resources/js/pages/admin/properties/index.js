import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import HeroIcon from "@/components/Core/HeroIcon"
import HeroHeading from "@/components/Core/HeroHeading"
import PaginationLinks from "@/components/Core/PaginationLinks"

import PropertySVG from "@/svgs/PropertySVG"
import PlusSVG from "@/svgs/PlusSVG"
import EditSVG from "@/svgs/EditSVG"
import NoData from "@/components/Core/NoData"

const index = (props) => {
	const location = useLocation()
	
	let superPropertyId = location.pathname.match("/super/") ? "All" : null

	const [properties, setProperties] = useState(
		props.getLocalStorage("propertyList")
	)

	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Properties", path: ["properties"] })
	}, [])

	useEffect(() => {
		props.getPaginated(
			`properties?
			userId=${props.auth.id}&
			assignedPropertyIds=${props.auth.assignedPropertyIds.join(",")},${superPropertyId}&
			name=${nameQuery}`,
			setProperties,
			"propertyList"
		)
	}, [nameQuery])
	/*
	 * Delete Property
	 */
	const onDeleteProperty = (propertyId) => {
		Axios.delete(`/api/properties/${propertyId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				setProperties({
					meta: properties.meta,
					links: properties.links,
					data: properties.data.filter((property) => property.id != propertyId),
				})
				// Fetch Properties
				props.get(`properties?userId=${props.auth.id}`, props.setProperties)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				<div>
					{/* Data */}
					<div className="card shadow-sm mb-2 p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<HeroHeading
									heading="Total Properties"
									data={properties.meta?.total}
								/>
								<HeroIcon>
									<PropertySVG />
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

					{/* Table */}
					<div className="table-responsive mb-5">
						<table className="table table-hover">
							<thead>
								<tr>
									<th colSpan="8"></th>
									<th className="text-end">
										<MyLink
											linkTo={`/properties/create`}
											icon={<PlusSVG />}
											text="add property"
										/>
									</th>
								</tr>
								<tr>
									<th className="align-top">#</th>
									<th className="align-top">Name</th>
									<th className="align-top">Location</th>
									<th className="align-top">Service Charge</th>
									<th className="align-top">Deposit Formula</th>
									{/* <th className="align-top">Water Rate (C)</th> */}
									{/* <th className="align-top">Water Rate (B)</th> */}
									{/* <th className="align-top">Water Rate (T)</th> */}
									<th className="align-top">Units</th>
									<th className="align-top">Invoice Date</th>
									<th className="align-top">Invoice Channel</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							{properties.data?.length > 0 ? (
								<tbody>
									{properties.data?.map((property, key) => (
										<tr key={key}>
											<td>{props.iterator(key, properties)}</td>
											<td>{property.name}</td>
											<td>{property.location}</td>
											<td className="text-success">
												<small>KES</small>{" "}
												{Number(
													property.serviceCharge?.service
												)?.toLocaleString()}
											</td>
											<td>{property.depositFormula}</td>
											{/* <td>{property.waterBillRateCouncil}</td> */}
											{/* <td>{property.waterBillRateBorehole}</td> */}
											{/* <td>{property.waterBillRateTanker}</td> */}
											<td>{property.unitCount}</td>
											<td>{property.invoiceDate}</td>
											<td>
												<small className="me-1">
													{property.email ? "EMAIL" : ""}
												</small>
												<b>|</b>
												<small className="ms-1">
													{property.sms ? "SMS" : ""}
												</small>
											</td>
											<td>
												<div className="d-flex justify-content-center">
													<MyLink
														linkTo={`/properties/${property.id}/edit`}
														icon={<EditSVG />}
														// text="edit"
														className="me-1"
													/>

													<div className="mx-1">
														<DeleteModal
															index={`property${key}`}
															model={property}
															modelName="Property"
															onDelete={onDeleteProperty}
														/>
													</div>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td
											colSpan="12"
											className="p-0">
											<NoData />
										</td>
									</tr>
								</tbody>
							)}
						</table>
						{/* Pagination Links */}
						<PaginationLinks
							list={properties}
							getPaginated={props.getPaginated}
							setState={setProperties}
						/>
						{/* Pagination Links End */}
					</div>
					{/* Table End */}
				</div>
			</div>
		</div>
	)
}

export default index
