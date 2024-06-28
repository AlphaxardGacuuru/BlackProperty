import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

import ForwardSVG from "@/svgs/ForwardSVG"

const PropertyTabInfo = () => {
	return (
		<center>
			<div className="d-flex justify-content-center flex-column m-5 p-5">
				<h3 className="text-white mb-4">Billing</h3>
				<p className="text-white">
					Automated Invoicing and Receipts for rent, water and service charge
					via email. Automated reminders for late payments. Create Credit notes
					for damages incured.
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

export default PropertyTabInfo
