import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import PersonSVG from "@/svgs/PersonSVG"
import PropertySVG from "@/svgs/PropertySVG"
import HeroIcon from "@/components/Core/HeroIcon"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import DeleteSVG from "@/svgs/DeleteSVG"
import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	// Get Properties
	const [properties, setProperties] = useState([])
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Properties", path: ["properties"] })
		props.get("properties", setProperties)
	}, [])

	/*
	 * Delete
	 */
	const onDelete = (propertyId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/properties/${propertyId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				setProperties(
					properties.filter((property) => property.id != propertyId)
				)
			})
			.catch((err) => {
				// Toggle loader
				setLoading(true)
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Data */}
				<div className="card shadow-sm p-2">
					<div className="d-flex justify-content-between">
						{/* Total */}
						<div className="d-flex justify-content-between w-100 align-items-center mx-4">
							<div>
								<h4>Total Properties</h4>
								<span className="fs-4">{properties.length}</span>
							</div>
							<HeroIcon>
								<PropertySVG />
							</HeroIcon>
						</div>
						{/* Total End */}
					</div>
				</div>
				{/* Data End */}

				<br />

				<div className="table-responsive">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="3"></th>
								<th className="text-end">
									<MyLink
										linkTo="/properties/create"
										icon={<PlusSVG />}
										text="add property"
									/>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Location</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{properties.map((property, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{property.name}</td>
									<td>{property.location}</td>
									<td className="text-end">
										<div className="d-flex">
											<MyLink
												linkTo={`/properties/${property.id}/show`}
												icon={<ViewSVG />}
												text="view"
												className="btn-sm me-1"
											/>

											<MyLink
												linkTo={`/properties/${property.id}/edit`}
												icon={<EditSVG />}
												text="edit"
												className="btn-sm"
											/>

											<div className="mx-1">
												{/* Confirm Delete Modal End */}
												<div
													className="modal fade"
													id={`deleteModal${key}`}
													tabIndex="-1"
													aria-labelledby="deleteModalLabel"
													aria-hidden="true">
													<div className="modal-dialog">
														<div className="modal-content">
															<div className="modal-header">
																<h1
																	id="deleteModalLabel"
																	className="modal-title fs-5 text-danger">
																	Delete Property
																</h1>
																<button
																	type="button"
																	className="btn-close"
																	data-bs-dismiss="modal"
																	aria-label="Close"></button>
															</div>
															<div className="modal-body text-start text-wrap">
																Are you sure you want to delete {property.name}.
															</div>
															<div className="modal-footer justify-content-between">
																<button
																	type="button"
																	className="btn btn-light rounded-0"
																	data-bs-dismiss="modal">
																	Close
																</button>
																<button
																	type="button"
																	className="btn btn-danger rounded-0"
																	data-bs-dismiss="modal"
																	onClick={() => onDelete(property.id)}>
																	Delete
																</button>
															</div>
														</div>
													</div>
												</div>
												{/* Confirm Delete Modal End */}

												{/* Button trigger modal */}
												<button
													type="button"
													className="btn btn-sm btn-outline-danger rounded-0"
													data-bs-toggle="modal"
													data-bs-target={`#deleteModal${key}`}>
													<span>
														<DeleteSVG />
													</span>{" "}
													Delete
												</button>
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default index
