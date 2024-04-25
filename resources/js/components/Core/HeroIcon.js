import React from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const HeroIcon = ({ children }) => {
	const location = useLocation()

	return (
		<div
			className={`${
				location.pathname.match("/admin/")
					? "bg-primary-subtle text-primary"
					: location.pathname.match("/instructor/")
					? " bg-danger-subtle text-danger"
					: " bg-success-subtle text-success"
			} fs-1 py-3 px-4 rounded-circle`}>
			{children}
		</div>
	)
}

export default HeroIcon
