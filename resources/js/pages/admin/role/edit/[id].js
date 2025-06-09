import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import BackSVG from "@/svgs/BackSVG"

const edit = (props) => {
	const { id } = useParams()

	// Declare states
	const [role, setRole] = useState({})
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [permissions, setPermissions] = useState([])
	const [loading, setLoading] = useState()

	const getRole = () => {
		Axios.get(`api/roles/${id}`)
			.then((res) => {
				setRole(res.data.data)
				setPermissions(res.data.data.permissions)
			})
			.catch((err) => props.getErrors(err))
	}

	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Role", path: ["roles", "edit"] })
		// Fetch Role
		getRole()
	}, [])

	var entities = [
		"properties",
		"units",
		"tenants",
		"water-readings",
		"invoices",
		"payments",
		"credit-notes",
		"deductions",
		"emails",
		"sms",
		"billing",
		"staff",
		"roles",
	]

	var CRUD = ["view", "create", "update", "delete"]

	// Handle Permission checkboxes
	const handleSetPermissions = (permission) => {
		var exists = permissions.includes(permission)

		var newPermissions = exists
			? permissions.filter((item) => item != permission)
			: [...permissions, permission]

		setPermissions(newPermissions)
	}

	// Handle Select All per Row
	const handleSelectAllForRow = (rowIsSet, rowEntity) => {
		const rowPermissions = []

		if (rowIsSet) {
			entities
				.filter((entity) => entity == rowEntity)
				.forEach((entity) => {
					CRUD.forEach((item) => {
						rowPermissions.push(`${item} ${entity}`)
					})
				})

			setPermissions([...permissions, ...rowPermissions])
		} else {
			// Filter out the row permissions from the main permissions
			const filteredPermissions = permissions.filter(
				(permission) => !permission.match(rowEntity)
			)

			setPermissions(filteredPermissions)
		}
	}

	// Handle Master Select All
	const handleMasterSelectAll = (masterIsSet) => {
		const allPermissions = []

		if (masterIsSet) {
			entities.forEach((entity) => {
				CRUD.forEach((item) => {
					allPermissions.push(`${item} ${entity}`)
				})
			})
		}

		setPermissions(allPermissions)
	}

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader for button
		setLoading(true)

		// Send data to UsersController
		Axios.put(`api/roles/${id}`, {
			name: name,
			description: description,
			permissions: permissions,
		})
			.then((res) => {
				// Remove loader for button
				setLoading(false)
				props.setMessages([res.data.message])
				// Fetch Data
				getRole()
			})
			.catch((err) => {
				// Remove loader for button
				setLoading(false)
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Name"
						defaultValue={role.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>

					<input
						type="text"
						name="description"
						placeholder="Description"
						defaultValue={role.description}
						className="form-control mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}
						required={true}
					/>

					{/* Permissions */}
					<div className="form-group">
						<label
							htmlFor=""
							className="ms-1">
							Permissions
						</label>
						<div className="table-responsive hidden-scroll">
							<table className="table">
								<thead>
									<tr>
										<th>Entity</th>
										<th>Read</th>
										<th>Create</th>
										<th>Update</th>
										<th>Delete</th>
										<th>
											<input
												type="checkbox"
												name="masterSelectAll"
												className="me-2"
												checked={entities.every((entity) =>
													CRUD.every((item) =>
														permissions.includes(`${item} ${entity}`)
													)
												)}
												onChange={(e) =>
													handleMasterSelectAll(e.target.checked)
												}
											/>
											<label
												htmlFor="masterSelectAll"
												className="mb-0">
												Select All
											</label>
										</th>
									</tr>
								</thead>
								<tbody>
									{entities.map((entity, key) => (
										<tr key={key}>
											{/* Entity Title */}
											<td className="text-capitalize">
												<b>{entity.replace("_", " ")}</b>
											</td>
											{/* Entity Title End */}
											{CRUD.map((item, key) => (
												<td key={key}>
													<label className="px-3">
														<input
															type="checkbox"
															id=""
															name="entities"
															value={`${item} ${entity}`}
															checked={permissions.includes(
																`${item} ${entity}`
															)}
															onChange={(e) =>
																handleSetPermissions(e.target.value)
															}
														/>
													</label>
												</td>
											))}
											<td>
												<input
													type="checkbox"
													name="selectAllForRow"
													checked={[
														`view ${entity}`,
														`create ${entity}`,
														`update ${entity}`,
														`delete ${entity}`,
													].every((entityPermission) =>
														permissions.includes(entityPermission)
													)}
													onChange={(e) =>
														handleSelectAllForRow(e.target.checked, entity)
													}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Permissions End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update role"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center mb-5">
						<MyLink
							linkTo="/roles"
							icon={<BackSVG />}
							text="back to roles"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
