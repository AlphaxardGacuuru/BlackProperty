import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const edit = (props) => {
	var { id } = useParams()

	const [property, setProperty] = useState({})
	const [name, setName] = useState()
	const [loading, setLoading] = useState()

	// Get Properties
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Property",
			path: ["properties", `properties/${id}/show`, "edit"],
		})

		Axios.get(`/api/properties/${id}`).then((res) => {
			setProperty(res.data.data)
			setPropertyId(res.data.data.propertyId.toString())
		})
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/properties/${id}`, {
			name: name,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
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
						defaultValue={property.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							btnText="update"
							loading={loading}
						/>
					</div>

					<center>
						<MyLink
							linkTo="/properties"
							text="back to properties"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
