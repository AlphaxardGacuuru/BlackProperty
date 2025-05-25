import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import HeroIcon from "@/components/Core/HeroIcon"
import HeroHeading from "@/components/Core/HeroHeading"
import PaginationLinks from "@/components/Core/PaginationLinks"

import PropertySVG from "@/svgs/PropertySVG"
import PlusSVG from "@/svgs/PlusSVG"
import EditSVG from "@/svgs/EditSVG"

const index = (props) => {
	const [properties, setProperties] = useState([])

	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Properties", path: ["properties"] })
	}, [])

	useEffect(() => {
		props.getPaginated(
			`properties?userId=${props.auth.id}&name=${nameQuery}`,
			setProperties
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
									<th colSpan="11"></th>
									<th className="text-end">
										<MyLink
											linkTo={`/properties/create`}
											icon={<PlusSVG />}
											text="add property"
										/>
									</th>
								</tr>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Location</th>
									<th>Service Charge</th>
									<th>Deposit Formula</th>
									<th
										colSpan={3}
										className="text-center">
										<div>Water Bill Rate</div>
									</th>
									<th>Units</th>
									<th>Invoice Date</th>
									<th>Invoice Channel</th>
									<th className="text-center">Action</th>
								</tr>
								{properties.data?.map((property, key) => (
									<tr key={key}>
										<td>{props.iterator(key, properties)}</td>
										<td>{property.name}</td>
										<td>{property.location}</td>
										<td className="text-success">
											<small>KES</small> {property.serviceCharge}
										</td>
										<td>{property.depositFormula}</td>
										<td>{property.waterBillRateCouncil}</td>
										<td>{property.waterBillRateBorehole}</td>
										<td>{property.waterBillRateTanker}</td>
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
							</thead>
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
