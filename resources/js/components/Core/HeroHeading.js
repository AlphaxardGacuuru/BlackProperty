import React from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const HeroHeading = ({ heading, data }) => {
	const location = useLocation()

	return (
		<div
			className={`my-auto`}>
			<h4
				className={`${
					location.pathname.match("/admin/")
						? "text-primary text-primary"
						: location.pathname.match("/tenant/")
						? "text-success text-success"
						: "text-secondary text-secondary"
				} fw-normal`}>
				{heading}
			</h4>
			<span className="fs-4">{data}</span>
		</div>
	)
}

export default HeroHeading
