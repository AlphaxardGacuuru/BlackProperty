import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

import ForwardSVG from "@/svgs/ForwardSVG"

const PropertyTabInfo = () => {
	return (
		<center>
			<div className="d-flex justify-content-center flex-column m-5 p-5">
				<h3 className="text-white mb-4">Property Management</h3>
				<p className="text-white">
					Effortlessly manage every property. From anywhere.
				</p>
				<p
					className="text-white"
					style={{ fontSize: "0.95em", opacity: 0.9 }}>
					One beautifully simple platform that gives you complete visibility
					into all your properties. Because managing multiple properties should
					feel as intuitive as it is powerful.
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
