import React from "react"
import PropTypes from "prop-types"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import PropertySVG from "@/svgs/PropertySVG"
import PlusSVG from "@/svgs/PlusSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import DeleteSVG from "@/svgs/DeleteSVG"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const PropertyHeroArea = (props) => {
	const router = useHistory()

	/*
	 * Delete
	 */
	const onDelete = (propertyId) => {
		Axios.delete(`/api/properties/${propertyId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Delete rows
				props.get(`properties`, props.setProperties)
				// Redirect to Properties
				router.push("/admin/properties")
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<React.Fragment>
			<div className="card shadow-sm p-2 mb-2">
				<div className="d-flex justify-content-between w-100 align-items-center">
					<HeroHeading
						heading="Total Properties"
						data={props.properties.length}
					/>
					<HeroIcon>
						<PropertySVG />
					</HeroIcon>
				</div>
				<hr />
				<div className="d-flex justify-content-end">
					<div className="d-flex">
						<MyLink
							linkTo="/properties/create"
							icon={<PlusSVG />}
							text="add property"
						/>
					</div>
				</div>
			</div>

			<br />

			{/* Loader */}
			{props.properties.length == 0 && (
				<div className={`card mb-2 p-4 text-center shadow-sm`}>
					<h4 className="gradient loading-text property-name"></h4>
					<h6 className="gradient loading-text property-location mt-2"></h6>
				</div>
			)}
			{/* Loader End */}

			{props.properties.map((item, key) => (
				<div
					key={key}
					className={`card p-2 mb-2 shadow-sm ${
						item.id == props.id &&
						"border-top-0 border-end-0 border-bottom-0 border-5 border-secondary"
					}`}>
					<div className="d-flex justify-content-between">
						<div>
							<h4>{item.name}</h4>
							<h6>Location: {item.location}</h6>
							<h6>Service Charge: <small>KES</small> {item.serviceCharge}</h6>
						</div>
						<div className="d-flex flex-column justify-content-end">
							<MyLink
								linkTo={`/properties/${item.id}/show`}
								icon={<ViewSVG />}
								text="view"
								className="btn-sm mb-1"
							/>

							<MyLink
								linkTo={`/properties/${item.id}/edit`}
								icon={<EditSVG />}
								text="edit"
								className="btn-sm mb-1"
							/>

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
												className="modal-title fs-5">
												Delete Property
											</h1>
											<button
												type="button"
												className="btn-close"
												data-bs-dismiss="modal"
												aria-label="Close"></button>
										</div>
										<div className="modal-body text-start text-wrap">
											Are you sure you want to delete {item.name}.
										</div>
										<div className="modal-footer justify-content-between">
											<button
												type="button"
												className="mysonar-btn btn-2"
												data-bs-dismiss="modal">
												Close
											</button>
											<button
												type="button"
												className="btn btn-danger rounded-0"
												data-bs-dismiss="modal"
												onClick={() => onDelete(item.id)}>
												<span className="me-1">{<DeleteSVG />}</span>
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
							{/* Confirm Delete Modal End */}

							{/* Button trigger modal */}
							<Btn
								icon={<DeleteSVG />}
								text="delete"
								dataBsToggle="modal"
								dataBsTarget={`#deleteModal${key}`}
							/>
							{/* Button trigger modal End */}
						</div>
					</div>
				</div>
			))}
		</React.Fragment>
	)
}

PropertyHeroArea.propTypes = {}

export default PropertyHeroArea
