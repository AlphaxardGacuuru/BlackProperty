import React from "react"
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min"

const MyLink = ({ text, linkTo, className }) => {
	const location = useLocation()

	return (
		<Link
			to={`${
				location.pathname.match("/admin/")
					? "/admin"
					: location.pathname.match("/instructor/")
					? "/instructor"
					: "/student"
			}${linkTo}`}
			className={`${
				location.pathname.match("/admin/")
					? "btn-outline-primary"
					: location.pathname.match("/instructor/")
					? "btn-outline-danger"
					: "btn-outline-success"
			} btn rounded-pill text-capitalize ${className}`}>
			{text}
		</Link>
	)
}

MyLink.defaultProps = {
	linkTo: "/",
}

export default MyLink
