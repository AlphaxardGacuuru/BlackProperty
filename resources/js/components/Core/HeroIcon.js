import React from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const HeroIcon = ({ children }) => {
	const location = useLocation()

	return (
		<div
			className={`${
				location.pathname.match("/admin/")
					? "bg-primary-subtle text-primary"
					: location.pathname.match("/tenant/")
					? " bg-success-subtle text-success"
					: " bg-secondary-subtle text-secondary"
			} fs-1 py-3 px-4 rounded-circle shadow`}>
			{children}
		</div>
	)
}

export default HeroIcon
