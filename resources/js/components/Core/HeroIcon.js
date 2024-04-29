import React from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const HeroIcon = ({ children }) => {
	const location = useLocation()

	return (
		<div
			className={`${
				location.pathname.match("/admin/")
					? "bg-secondary-subtle text-secondary"
					: location.pathname.match("/instructor/")
					? " bg-danger-subtle text-danger"
					: " bg-success-subtle text-success"
			} fs-1 py-3 px-4 rounded-circle shadow`}>
			{children}
		</div>
	)
}

export default HeroIcon
