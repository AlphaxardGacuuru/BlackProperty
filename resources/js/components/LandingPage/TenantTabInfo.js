import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

import ForwardSVG from "@/svgs/ForwardSVG"

const TenantTabInfo = () => {
	return (
		<center>
			<div className="d-flex justify-content-center flex-column m-5 p-5">
				<h3 className="text-white mb-4">Tenant Acquisition</h3>
				<p className="text-white">
					Vacancy meets opportunity. Instantly.
				</p>
				<p className="text-white" style={{ fontSize: '0.95em', opacity: 0.9 }}>
					The moment a space opens, the right tenant finds it. Viewings happen seamlessly. Your properties never stay empty long.
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

export default TenantTabInfo
