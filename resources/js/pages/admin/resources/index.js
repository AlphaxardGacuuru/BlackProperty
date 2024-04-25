import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import PersonSVG from "@/svgs/PersonSVG"
import ResourceSVG from "@/svgs/ResourceSVG"

const index = (props) => {
	// Get Resources
	const [resources, setResources] = useState([])
	const [loading, setLoading] = useState()
	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Resources", path: ["resources"] })
		props.get("resources", setResources)
	}, [])

	/*
	 * View Resource
	 */
	var view = (link) => {
		window.open(link, "_blank")
	}

	/*
	 * Delete
	 */
	const onDelete = (resourceId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/resources/${resourceId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				setResources(resources.filter((resource) => resource.id != resourceId))
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
								<span className="fs-4">{resources.length}</span>
								<h4>Total Resources</h4>
							</div>
							<div className="fs-1 py-3 px-4 bg-danger-subtle text-danger rounded-circle">
								<ResourceSVG />
							</div>
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
								<th>#</th>
								<th>Name</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{resources.map((resource, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{resource.name}</td>
									<td className="text-end">
										<div className="d-flex">
											<Btn
												btnText="view"
												btnClass="btn-outline-danger btn-sm me-2"
												onClick={() => view(resource.link)}
											/>
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
