import React from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const Btn = ({
	btnStyle,
	className,
	icon,
	text,
	onClick,
	loading,
}) => {
	const location = useLocation()

	return (
		<button
			style={btnStyle}
			className={`${
				location.pathname.match("/admin/")
					? "btn-primary"
					: location.pathname.match("/instructor/")
					? "btn-danger"
					: "btn-success"
			} btn rounded-0 text-capitalize ${className}`}
			onClick={onClick}
			disabled={loading}>
			<span className="me-1">{icon}</span>
			{text}
			{loading && (
				<div
					className="text-white spinner-border spinner-border-sm border-2 my-auto mx-2"
					style={{ color: "inherit" }}></div>
			)}
		</button>
	)
}

Btn.defaultProps = {
	loading: false,
	disabled: false,
}
export default Btn
