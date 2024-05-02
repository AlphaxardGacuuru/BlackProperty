import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"

import TenantList from "@/components/Tenants/TenantList"
import StaffList from "@/components/Staff/StaffList"
import UnitList from "@/components/Units/UnitList"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import PropertySVG from "@/svgs/PropertySVG"
import PlusSVG from "@/svgs/PlusSVG"
import ViewSVG from "@/svgs/ViewSVG"
import EditSVG from "@/svgs/EditSVG"
import DeleteSVG from "@/svgs/DeleteSVG"
import Btn from "@/components/Core/Btn"

const show = (props) => {
	var { id } = useParams()

	const [property, setProperty] = useState({})
	const [units, setUnits] = useState([])
	const [tenants, setTenants] = useState([])
	const [staff, setStaff] = useState([])
	const [roles, setRoles] = useState([])
	const [tab, setTab] = useState("units")
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Property", path: ["properties", "view"] })
		props.get(`properties/${id}`, setProperty)
		props.getPaginated(`units/by-property-id/${id}`, setUnits)
		props.getPaginated(`tenants/by-property-id/${id}`, setTenants)
		props.getPaginated(`staff/by-property-id/${id}`, setStaff)
		props.get(`roles?idAndName=true`, setRoles)
	}, [id])

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
				props.get(`properties`, props.setProperties)
			})
			.catch((err) => {
				// Toggle loader
				setLoading(true)
				props.getErrors(err)
			})
	}

	const active = (activeTab) => {
		return activeTab == tab
			? "bg-secondary text-white shadow-sm"
			: "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-4">
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
							item.id == id &&
							"border-top-0 border-end-0 border-bottom-0 border-5 border-secondary"
						}`}>
						<div className="d-flex justify-content-between">
							<div>
								<h4>{item.name}</h4>
								<h6>{item.location}</h6>
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

								<div className="mx-1">
									{/* Confirm Delete Modal End */}
									<div
										className="modal fade"
										id={`deleteModal${`property${key}`}`}
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
									<button
										type="button"
										className="mysonar-btn btn-2"
										data-bs-toggle="modal"
										data-bs-target={`#deleteModal${key}`}>
										<span className="me-1">{<DeleteSVG />}</span>Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"units"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("units")}>
						Units
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"tenants"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("tenants")}>
						Tenants
					</div>
					<div
						className={`card flex-grow-1 text-center mb-2 py-2 px-4 ${active(
							"staff"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("staff")}>
						Staff
					</div>
				</div>
				{/* Tabs End */}

				{/* Units Tab */}
				<UnitList
					{...props}
					activeTab={activeTab("units")}
					units={units}
					setUnits={setUnits}
					totalUnits={property.unitCount}
					propertyId={id}
					setProperty={setProperty}
				/>
				{/* Units Tab End */}

				{/* Tenants Tab */}
				<TenantList
					{...props}
					activeTab={activeTab("tenants")}
					tenants={tenants}
					setTenants={setTenants}
				/>
				{/* Tenants Tab End */}

				{/* Staff Tab */}
				<StaffList
					{...props}
					staff={staff}
					setStaff={setStaff}
					roles={roles}
					activeTab={activeTab("staff")}
					propertyId={id}
				/>
				{/* Staff Tab End */}
			</div>
		</div>
	)
}

export default show
