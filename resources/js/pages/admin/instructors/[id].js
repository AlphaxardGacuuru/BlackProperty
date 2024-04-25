import React, { useEffect, useState } from "react"
import {
	useLocation,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Img from "@/components/Core/Img"

import CourseList from "@/components/Courses/CourseList"
import UnitList from "@/components/Units/UnitList"
import FeeStatementList from "@/components/FeeStatement/FeeStatementList"

const show = (props) => {
	const { id } = useParams()
	const location = useLocation()

	const [tab, setTab] = useState("courses")
	const [user, setUser] = useState({})
	const [courses, setCourses] = useState([])
	const [units, setUnits] = useState([])
	const [fees, setFees] = useState({})

	const pagePath = location.pathname.match("/admin/staff")
		? "staff"
		: location.pathname.match("/instructor")
		? "instructor"
		: "student"

	const capitalize = (str) => {
		const [first, ...rest] = str
		return first.toUpperCase() + rest.join("")
	}

	useEffect(() => {
		// Set page
		props.setPage({
			name: capitalize(pagePath),
			path: [`${pagePath}s`, pagePath],
		})
		props.get(`${pagePath}s/${id}`, setUser, null, false)
		props.get(`courses/by-user-id/${id}`, setCourses, null, false)
		props.get(`units/by-user-id/${id}`, setUnits, null, false)
		props.get(`fee-statements/${id}`, setFees, null, false)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card shadow mb-2 p-4 text-center">
					<div className="m-3">
						<Img
							src={user.avatar ?? "/storage/avatars/male-avatar.png"}
							className="rounded-circle"
							width="100px"
							height="100px"
							alt="Avatar"
						/>
					</div>
					<h4>{user.name}</h4>
					<h6>{user.email}</h6>
					<h6>{user.phone}</h6>
					<h6 className="text-capitalize">{user.gender}</h6>
					<h6 className="text-capitalize">{user.accountType}</h6>
					<h6>{user.facultyName}</h6>
					<h6>{user.departmentName}</h6>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"courses"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("courses")}>
						Courses
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"units"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("units")}>
						Units
					</div>
					{location.pathname.match("/student") && (
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
								"fee-statements"
							)}`}
							style={{ cursor: "pointer" }}
							onClick={() => setTab("fee-statements")}>
							Fee Statements
						</div>
					)}
				</div>
				{/* Tabs End */}

				{/* Courses Tab */}
				<CourseList
					{...props}
					activeTab={activeTab("courses")}
					courses={courses}
				/>
				{/* Courses Tab End */}

				{/* Units Tab */}
				<UnitList
					{...props}
					activeTab={activeTab("units")}
					units={units}
					userId={id}
				/>
				{/* Units Tab End */}

				{/* Fee Statements Tab */}
				{location.pathname.match("/student") && (
					<FeeStatementList
						{...props}
						activeTab={activeTab("fee-statements")}
						fees={fees}
					/>
				)}
				{/* Fee Statements Tab End */}
			</div>
		</div>
	)
}

export default show
