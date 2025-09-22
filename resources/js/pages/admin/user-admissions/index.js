import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import HeroIcon from "@/components/Core/HeroIcon"
import HeroHeading from "@/components/Core/HeroHeading"
import PaginationLinks from "@/components/Core/PaginationLinks"

import UserAdmissionSVG from "@/svgs/UserAdmissionSVG"
import PlusSVG from "@/svgs/PlusSVG"
import EditSVG from "@/svgs/EditSVG"
import ViewSVG from "@/svgs/ViewSVG"
import NoData from "@/components/Core/NoData"
import PersonSVG from "@/svgs/PersonSVG"
import Img from "@/components/Core/Img"

const index = (props) => {
	const [userAdmissions, setUserAdmissions] = useState(
		props.getLocalStorage("userAdmissions")
	)

	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "User Admissions", path: ["user-admissions"] })
	}, [])

	useEffect(() => {
		props.getPaginated(
			`user-admissions?name=${nameQuery}`,
			setUserAdmissions,
			"userAdmissions"
		)
	}, [nameQuery])
	/*
	 * Delete UserAdmission
	 */
	const onDeleteUserAdmission = (userAdmissionId) => {
		Axios.delete(`/api/user-admissions/${userAdmissionId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				setUserAdmissions({
					meta: userAdmissions.meta,
					links: userAdmissions.links,
					data: userAdmissions.data.filter(
						(userAdmission) => userAdmission.id != userAdmissionId
					),
				})
				// Fetch User Admissions
				props.getPaginated(`user-admissions`, setUserAdmissions)
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
									heading="Total User Admissions"
									data={userAdmissions.meta?.total}
								/>
								<HeroIcon>
									<UserAdmissionSVG />
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
									<th colSpan="9"></th>
									<th className="text-end">
										<MyLink
											linkTo={`/user-admissions/create`}
											icon={<PlusSVG />}
											text="request user admission"
										/>
									</th>
								</tr>
								<tr>
									<th className="align-top">#</th>
									<th className="align-top">Name</th>
									<th className="align-top">National ID</th>
									<th className="align-top">Property</th>
									<th className="align-top">Unit</th>
									<th className="align-top">Tenant</th>
									<th className="align-top">Status</th>
									<th className="align-top">Requested By</th>
									<th className="align-top">Requested At</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							{userAdmissions.data?.length > 0 ? (
								<tbody>
									{userAdmissions.data?.map((userAdmission, key) => (
										<tr key={key}>
											<td>{props.iterator(key, userAdmissions)}</td>
											<td>
												<span className="me-1">{userAdmission.firstName}</span>
												<span className="me-1">{userAdmission.middleName}</span>
												<span className="me-1">{userAdmission.lastName}</span>
											</td>
											<td>{userAdmission.nationalID}</td>
											<td>{userAdmission.propertyName}</td>
											<td>{userAdmission.unitName}</td>
											<td>{userAdmission.tenantName}</td>
											<td>
												<span
													className={`
														${
															userAdmission.status == "declined"
																? "bg-danger-subtle"
																: userAdmission.status == "pending"
																? "bg-warning-subtle"
																: userAdmission.status == "approved"
																? "bg-success-subtle"
																: "bg-dark-subtle"
														}
													text-capitalize py-1 px-3`}>
													{userAdmission.status}
												</span>
											</td>
											<td>{userAdmission.createdByName}</td>
											<td>{userAdmission.createdAt}</td>
											<td>
												<div className="d-flex justify-content-center">
													{/* Confirm Vacate Modal End */}
													<div
														className="modal fade"
														id={`viewModal${userAdmission.id}`}
														tabIndex="-1"
														aria-labelledby="deleteModalLabel"
														aria-hidden="true">
														<div className="modal-dialog modal-lg">
															<div className="modal-content rounded">
																<div className="modal-body">
																	{/* User Detail Card Start */}
																	<div
																		className="card border-0"
																		style={
																			{
																				// backgroundImage:
																				// 	'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><pattern id="guilloche" width="15" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><path d="M 0 0 L 15 15 M 15 0 L 0 15" stroke="%23e0e0e0" stroke-width="0.5" /></pattern><rect width="100%" height="100%" fill="url(%23guilloche)" /></svg>\')'
																			}
																		}>
																		<div className="card-body">
																			{/* Heading Start */}
																			<div className="d-flex justify-content-between align-items-center text-uppercase text-success text-center mb-4">
																				<div className="flex-grow-1">
																					<h6 className="fw-bold text-success">
																						jamhuri ya kenya
																					</h6>
																					<h6 className="text-success">
																						republic of kenya
																					</h6>
																				</div>
																				<div className="flex-grow-1">
																					<Img
																						src="/img/coat-of-arms.svg"
																						style={{
																							width: "4em",
																							height: "4em",
																						}}
																					/>
																				</div>
																				<div className="flex-grow-1">
																					<h6 className="fw-bold text-success">
																						kitambulisho cha taifa
																					</h6>
																					<h6 className="text-success">
																						national identity card
																					</h6>
																				</div>
																			</div>
																			{/* Heading End */}
																			<div className="d-flex justify-content-start align-items-end">
																				<div className="bg-success-subtle text-secondary fs-1 me-4 py-2 px-3 rounded-circle shadow">
																					<Img
																						src="storage/avatars/male-avatar.png"
																						className="rounded-circle"
																						style={{
																							width: "6em",
																							height: "6em",
																						}}
																					/>
																				</div>
																				<div className="flex-grow-1 text-uppercase text-success">
																					<small>surname</small>
																					<h6>{userAdmission.lastName}</h6>
																					<small>given name</small>
																					<h6>{userAdmission.firstName}</h6>
																					<div className="d-flex justify-content-between">
																						<div>
																							<small>sex</small>
																							<h6>{userAdmission.gender}</h6>
																						</div>
																						<div>
																							<small>nationality</small>
																							<h6>
																								{userAdmission.citizenship}
																							</h6>
																						</div>
																						<div>
																							<small>date of birth</small>
																							<h6>
																								{userAdmission.dateOfBirth}
																							</h6>
																						</div>
																					</div>
																					<small>place of birth</small>
																					<h6>{userAdmission.placeOfBirth}</h6>
																					<small>id number</small>
																					<h6>{userAdmission.nationalID}</h6>
																					<small>date of expiry</small>
																					<h6>{userAdmission.idExpiryDate}</h6>
																					<small>place of issue</small>
																					<h6>{userAdmission.placeOfIssue}</h6>
																				</div>
																			</div>
																		</div>
																	</div>
																	{/* User Detail Card End */}
																</div>
															</div>
														</div>
													</div>
													{/* Confirm Vacate Modal End */}

													{/* Button trigger modal */}
													<button
														type="button"
														className="btn mysonar-btn mb-2 me-2"
														data-bs-toggle="modal"
														data-bs-target={`#viewModal${userAdmission.id}`}>
														<ViewSVG />
													</button>
													{/* Button trigger modal End */}

													<MyLink
														linkTo={`/user-admissions/${userAdmission.id}/edit`}
														icon={<EditSVG />}
														// text="edit"
														className="me-1"
													/>

													<div className="mx-1">
														<DeleteModal
															index={`userAdmission${key}`}
															model={userAdmission}
															modelName="User Admission"
															onDelete={onDeleteUserAdmission}
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
							list={userAdmissions}
							getPaginated={props.getPaginated}
							setState={setUserAdmissions}
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
