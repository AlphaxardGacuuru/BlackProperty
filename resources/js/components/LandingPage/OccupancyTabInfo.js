import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

import ForwardSVG from "@/svgs/ForwardSVG"

const OccupancyTabInfo = () => {
	return (
		<center>
			<div className="d-flex justify-content-center flex-column m-5 p-5">
				<h3 className="text-white mb-4">Occupancy Management</h3>
				<p className="text-white">
					See everything. Miss nothing.
				</p>
				<p className="text-white" style={{ fontSize: '0.95em', opacity: 0.9 }}>
					Instantly understand your property occupancy at a glance. Vacant units become opportunities, not problems.
				</p>
				<Link
					to="/admin/dashboard"
					className="btn sonar-btn white-btn w-25 mx-auto">
					<span className="me-1">start now</span>
					<ForwardSVG />
				</Link>
			</div>
		</center>
	)
}

export default OccupancyTabInfo
