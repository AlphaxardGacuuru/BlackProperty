import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import StaffSVG from "@/svgs/StaffSVG"
import StaffList from "@/components/Staff/StaffList"

const index = (props) => {
	// Get Staff
	const [staff, setStaff] = useState([])
	const [roles, setRoles] = useState([])
	const [loading, setLoading] = useState()
	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Staff", path: ["staff"] })
		props.getPaginated("staff", setStaff)
		props.get("roles?idAndName=true", setRoles)
	}, [])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Staff Tab */}
				<StaffList
					{...props}
					staff={staff}
					setStaff={setStaff}
					roles={roles}
				/>
				{/* Staff Tab End */}
			</div>
		</div>
	)
}

export default index
